import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('key', { ascending: true })

    if (error) throw error

    // Transform array of { key, value } into an object map { [key]: value }
    const settingsMap: Record<string, any> = {}
    data?.forEach((row) => {
      settingsMap[row.key] = row.value
    })

    return NextResponse.json({ settings: settingsMap, raw: data || [] })
  } catch (err: any) {
    console.error('Settings fetch error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { key, value } = body

    if (!key || typeof value === 'undefined') {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('site_settings')
      .upsert(
        {
          key,
          value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      )
      .select()
      .single()

    if (error) throw error

    // Audit log
    await supabase.from('admin_activity_logs').insert({
      admin_email: 'admin@pulse41.com',
      action: 'SETTINGS_UPDATE',
      entity_type: 'system',
      entity_id: key,
      details: {
        key,
        updatedValue: value,
      },
    })

    return NextResponse.json({ success: true, setting: data })
  } catch (err: any) {
    console.error('Settings update error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
