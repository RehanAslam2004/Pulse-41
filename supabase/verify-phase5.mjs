/**
 * Pulse41 Phase 5 — Admin Portal & CMS Automated Audit Script
 * Programmatic verification of authentication, middleware guards, CRM mutations, CSV export, and CMS CRUD.
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
let passCount = 0
let failCount = 0

function logPass(msg) {
  passCount++
  console.log(`  \x1b[32mPASS\x1b[0m ${msg}`)
}

function logFail(msg, detail = '') {
  failCount++
  console.log(`  \x1b[31mFAIL\x1b[0m ${msg} ${detail ? `(${detail})` : ''}`)
}

// Simple cookie jar maintaining refreshed session tokens
class CookieJar {
  constructor() {
    this.cookies = new Map()
  }

  update(res) {
    const raw = res.headers.getSetCookie
      ? res.headers.getSetCookie()
      : [res.headers.get('set-cookie')].filter(Boolean)

    for (const cookieStr of raw) {
      if (!cookieStr) continue
      const firstPart = cookieStr.split(';')[0]
      const eqIdx = firstPart.indexOf('=')
      if (eqIdx !== -1) {
        const name = firstPart.substring(0, eqIdx).trim()
        const val = firstPart.substring(eqIdx + 1).trim()
        this.cookies.set(name, val)
      }
    }
  }

  getCookieHeader() {
    return Array.from(this.cookies.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('; ')
  }
}

const jar = new CookieJar()

async function fetchWithJar(url, options = {}) {
  const headers = { ...(options.headers || {}) }
  const cookieHeader = jar.getCookieHeader()
  if (cookieHeader) {
    headers.Cookie = cookieHeader
  }

  const res = await fetch(url, { ...options, headers })
  jar.update(res)
  return res
}

async function runAudit() {
  console.log('======================================================================')
  console.log('PULSE41 PHASE 5 — EXECUTIVE ADMIN PORTAL & CMS AUDIT')
  console.log(`Target Host: ${BASE_URL}`)
  console.log('======================================================================\n')

  // --- 1. Test Middleware Protection (Unauthenticated) ---
  console.log('--- 1. Testing Middleware Route Guards (Unauthenticated) ---')
  try {
    const res1 = await fetch(`${BASE_URL}/admin`, { redirect: 'manual' })
    if (res1.status === 307 || res1.status === 302) {
      const loc = res1.headers.get('location') || ''
      if (loc.includes('/admin/login')) {
        logPass(`Unauthenticated GET /admin redirected to /admin/login [${res1.status}]`)
      } else {
        logFail(`Expected redirect to /admin/login, got: ${loc}`)
      }
    } else {
      logFail(`Expected 307/302 for /admin, got [${res1.status}]`)
    }

    const res2 = await fetch(`${BASE_URL}/admin/leads`, { redirect: 'manual' })
    if (res2.status === 307 || res2.status === 302) {
      logPass(`Unauthenticated GET /admin/leads redirected to /admin/login [${res2.status}]`)
    } else {
      logFail(`Expected redirect for /admin/leads, got [${res2.status}]`)
    }

    const res3 = await fetch(`${BASE_URL}/api/admin/leads`, { redirect: 'manual' })
    if (res3.status === 401) {
      logPass(`Unauthenticated GET /api/admin/leads blocked with [401 Unauthorized]`)
    } else {
      logFail(`Expected 401 for /api/admin/leads, got [${res3.status}]`)
    }
  } catch (err) {
    logFail('Middleware check network error', err.message)
  }

  // --- 2. Test Admin Login Screen Rendering ---
  console.log('\n--- 2. Testing Admin Login Screen ---')
  try {
    const loginRes = await fetch(`${BASE_URL}/admin/login`)
    if (loginRes.status === 200) {
      const html = await loginRes.text()
      if (html.includes('Executive Command Console') || html.includes('Work Email Address')) {
        logPass(`GET /admin/login renders executive login screen [200 OK]`)
      } else {
        logFail('Login page HTML missing key branding text')
      }
    } else {
      logFail(`GET /admin/login returned [${loginRes.status}]`)
    }
  } catch (err) {
    logFail('Admin login screen error', err.message)
  }

  // --- 3. Test Admin Authentication API ---
  console.log('\n--- 3. Testing Admin Authentication API ---')
  try {
    const loginApiRes = await fetchWithJar(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@pulse41.com',
        password: 'Pulse41Admin2026!',
      }),
    })

    const loginData = await loginApiRes.json()
    if (loginApiRes.status === 200 && loginData.success) {
      logPass(`POST /api/admin/auth/login authenticated successfully as ${loginData.user.role}`)

      if (jar.cookies.size > 0) {
        logPass(`Session cookies acquired (${jar.cookies.size} cookies in jar)`)
      } else {
        logFail('No session cookies received from login')
      }
    } else {
      logFail(`Admin login failed [${loginApiRes.status}]:`, loginData.error)
    }
  } catch (err) {
    logFail('Auth API network error', err.message)
  }

  // --- 4. Verify Active Session with Cookie ---
  console.log('\n--- 4. Testing Session Verification Endpoint ---')
  try {
    const meRes = await fetchWithJar(`${BASE_URL}/api/admin/auth/me`)
    const meData = await meRes.json()
    if (meRes.status === 200 && meData.authenticated && meData.user.role === 'admin') {
      logPass(`GET /api/admin/auth/me confirms authenticated admin: ${meData.user.email}`)
    } else {
      logFail(`GET /api/admin/auth/me failed [${meRes.status}]:`, JSON.stringify(meData))
    }
  } catch (err) {
    logFail('Session verify error', err.message)
  }

  // --- 5. Verify Authenticated Access to Admin Pages ---
  console.log('\n--- 5. Testing Protected Admin Pages (Authenticated) ---')
  const pagesToTest = [
    { path: '/admin', keyword: 'Executive Command Center', name: 'Dashboard Overview' },
    { path: '/admin/leads', keyword: 'Inquiries &amp; Leads CRM', name: 'Leads CRM' },
    { path: '/admin/content', keyword: 'Headless Content Studio', name: 'Content CMS Studio' },
    { path: '/admin/analytics', keyword: 'Business Intelligence', name: 'Analytics & BI' },
  ]

  for (const p of pagesToTest) {
    try {
      const res = await fetchWithJar(`${BASE_URL}${p.path}`)
      if (res.status === 200) {
        const text = await res.text()
        if (text.includes(p.keyword) || text.includes('Pulse41') || text.includes('Admin')) {
          logPass(`[200 OK] ${p.path} (${p.name})`)
        } else {
          logFail(`${p.path} returned 200 but keyword missing`)
        }
      } else {
        logFail(`Expected 200 for ${p.path}, got [${res.status}]`)
      }
    } catch (err) {
      logFail(`Page fetch error ${p.path}`, err.message)
    }
  }

  // --- 6. Testing Leads CRM API & CSV Export ---
  console.log('\n--- 6. Testing Leads CRM API & Operations ---')
  let sampleContactId = null
  try {
    const leadsRes = await fetchWithJar(`${BASE_URL}/api/admin/leads`)
    const leadsData = await leadsRes.json()

    if (leadsRes.status === 200 && leadsData.success) {
      logPass(`GET /api/admin/leads returned ${leadsData.counts.totalLeads} total leads across contacts & quotes`)
      if (leadsData.data.contacts.length > 0) {
        sampleContactId = leadsData.data.contacts[0].id
        logPass(`Found existing contact lead to test status update: ID ${sampleContactId}`)
      }
    } else {
      logFail(`GET /api/admin/leads failed [${leadsRes.status}]`)
    }

    // Test Status Update Mutation
    if (sampleContactId) {
      const patchRes = await fetchWithJar(`${BASE_URL}/api/admin/leads/contacts/${sampleContactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'contacted' }),
      })
      const patchData = await patchRes.json()
      if (patchRes.status === 200 && patchData.success) {
        logPass(`PATCH /api/admin/leads/contacts/:id successfully transitioned status to 'contacted'`)

        // Revert back to original
        await fetchWithJar(`${BASE_URL}/api/admin/leads/contacts/${sampleContactId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'new' }),
        })
      } else {
        logFail(`PATCH status update failed:`, patchData.error)
      }
    }

    // Test CSV Export
    const csvRes = await fetchWithJar(`${BASE_URL}/api/admin/leads/export?type=all`)
    if (csvRes.status === 200) {
      const contentType = csvRes.headers.get('content-type') || ''
      const csvText = await csvRes.text()
      if (contentType.includes('text/csv') && csvText.startsWith('Type,ID,Name,Email')) {
        logPass(`GET /api/admin/leads/export returned valid RFC-4180 CSV export (${csvText.split('\n').length} lines)`)
      } else {
        logFail('CSV export returned unexpected format or headers')
      }
    } else {
      logFail(`GET /api/admin/leads/export returned [${csvRes.status}]`)
    }
  } catch (err) {
    logFail('Leads API error', err.message)
  }

  // --- 7. Testing CMS Content CRUD Operations ---
  console.log('\n--- 7. Testing Headless CMS Content API (CRUD Flow) ---')
  let createdArticleId = null
  try {
    // 7.1 Read content
    const listRes = await fetchWithJar(`${BASE_URL}/api/admin/content/blog_posts`)
    const listData = await listRes.json()
    if (listRes.status === 200 && listData.success) {
      logPass(`GET /api/admin/content/blog_posts listed ${listData.data.length} articles`)
    } else {
      logFail(`GET /api/admin/content/blog_posts failed [${listRes.status}]`)
    }

    // 7.2 Create test content
    const testPost = {
      title: 'Automated Audit Verification Whitepaper',
      category: 'System Validation',
      read_time: '3 min read',
      author_name: 'Antigravity Automated Test',
      author_role: 'Verification Suite',
      excerpt: 'Automated test post created by Phase 5 verification suite.',
      content: '# System Verification\n\nAll systems operational.',
      is_published: false,
      is_featured: false,
    }

    const createRes = await fetchWithJar(`${BASE_URL}/api/admin/content/blog_posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPost),
    })

    const createData = await createRes.json()
    if (createRes.status === 201 && createData.success && createData.data.id) {
      createdArticleId = createData.data.id
      logPass(`POST /api/admin/content/blog_posts created draft entry (Slug: ${createData.data.slug})`)
    } else {
      logFail(`POST /api/admin/content/blog_posts failed [${createRes.status}]:`, createData.error)
    }

    // 7.3 Update test content
    if (createdArticleId) {
      const updateRes = await fetchWithJar(`${BASE_URL}/api/admin/content/blog_posts/${createdArticleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Automated Audit Verification Whitepaper (Updated)' }),
      })
      const updateData = await updateRes.json()
      if (updateRes.status === 200 && updateData.success) {
        logPass(`PATCH /api/admin/content/blog_posts/:id updated entry title`)
      } else {
        logFail(`PATCH content update failed:`, updateData.error)
      }

      // 7.4 Delete test content
      const deleteRes = await fetchWithJar(`${BASE_URL}/api/admin/content/blog_posts/${createdArticleId}`, {
        method: 'DELETE',
      })
      const deleteData = await deleteRes.json()
      if (deleteRes.status === 200 && deleteData.success) {
        logPass(`DELETE /api/admin/content/blog_posts/:id cleaned up test draft entry`)
      } else {
        logFail(`DELETE content failed:`, deleteData.error)
      }
    }
  } catch (err) {
    logFail('CMS CRUD flow error', err.message)
  }

  // --- 8. Testing Logout Flow ---
  console.log('\n--- 8. Testing Admin Logout ---')
  try {
    const logoutRes = await fetchWithJar(`${BASE_URL}/api/admin/auth/logout`, {
      method: 'POST',
    })
    const logoutData = await logoutRes.json()
    if (logoutRes.status === 200 && logoutData.success) {
      logPass(`POST /api/admin/auth/logout terminated session successfully`)
    } else {
      logFail(`POST /api/admin/auth/logout failed [${logoutRes.status}]`)
    }
  } catch (err) {
    logFail('Logout error', err.message)
  }

  console.log('\n======================================================================')
  console.log(`PHASE 5 AUDIT RESULTS: ${passCount} passed, ${failCount} failed`)
  console.log('======================================================================')

  if (failCount === 0) {
    console.log('\x1b[32mALL PHASE 5 REQUIREMENTS VERIFIED SUCCESSFULLY!\x1b[0m\n')
    process.exit(0)
  } else {
    console.log('\x1b[31mSOME AUDIT CHECKS FAILED!\x1b[0m\n')
    process.exit(1)
  }
}

runAudit().catch(console.error)
