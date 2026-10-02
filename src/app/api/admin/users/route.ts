import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ users: data || [] })
  } catch (err: any) {
    console.error('Admin users fetch error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { email, name, role = 'Content Manager' } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and full name are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email: email.trim().toLowerCase(),
        name: name.trim(),
        role,
        status: 'active',
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'An admin user with this email already exists' },
          { status: 409 }
        )
      }
      throw error
    }

    // Audit log
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'CREATE',
      entity_type: 'admin_user',
      entity_id: data.id,
      details: {
        email: data.email,
        name: data.name,
        role: data.role,
      },
    })

    return NextResponse.json({ success: true, user: data })
  } catch (err: any) {
    console.error('Admin user creation error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { id, role, status } = body

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const updates: any = {}
    if (role) updates.role = role
    if (status) updates.status = status

    const { data, error } = await supabase
      .from('admin_users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Audit log
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'UPDATE',
      entity_type: 'admin_user',
      entity_id: id,
      details: updates,
    })

    return NextResponse.json({ success: true, user: data })
  } catch (err: any) {
    console.error('Admin user update error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Protect primary admin from deletion
    const { data: targetUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', id)
      .single()

    if (targetUser?.email === 'admin@pulse41.com') {
      return NextResponse.json(
        { error: 'Cannot delete the primary root administrator account' },
        { status: 403 }
      )
    }

    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Audit log
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'DELETE',
      entity_type: 'admin_user',
      entity_id: id,
      details: {
        deleted_email: targetUser?.email,
      },
    })

    return NextResponse.json({ success: true, deletedId: id })
  } catch (err: any) {
    console.error('Admin user delete error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
