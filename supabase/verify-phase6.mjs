/**
 * Pulse41 Phase 6 — Interactive Client Tools & Enterprise Self-Service Verification Script
 * Validates:
 * 1. Pricing Calculator quote submission to /api/quote
 * 2. Multipart resume upload and candidate job application submission to /api/careers/apply
 * 3. Supabase Storage resume retrieval
 * 4. Admin authentication and /api/admin/applications endpoints (GET, PATCH, DELETE)
 * 5. Candidate status progression across hiring pipeline (new -> shortlisted -> interviewed)
 * 6. Admin leads aggregation (/api/admin/leads) and CSV export (/api/admin/leads/export?type=applications)
 * 7. Admin dashboard page rendering (/admin)
 */

import { Buffer } from 'node:buffer'

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

async function runPhase6Audit() {
  console.log('\n======================================================')
  console.log('  Pulse41 Phase 6: Automated Verification Audit')
  console.log(`  Target Base URL: ${BASE_URL}`)
  console.log('======================================================\n')

  let testApplicationId = null
  let uploadedResumeUrl = null

  // -------------------------------------------------------------------------
  // TEST 1: Pricing & ROI Calculator Quote Submission
  // -------------------------------------------------------------------------
  console.log('[Test Suite 1: Interactive Scope & ROI Pricing Calculator]')
  try {
    const quotePayload = {
      name: 'Dr. Elena Rostova',
      email: `elena.rostova.${Date.now()}@enterprise-ai-labs.ch`,
      company: 'Enterprise AI Labs Zurich',
      tier: 'Custom Interactive Scope (Phase 6 Calculator)',
      budget: '$28,500/mo',
      project_scope: 'Dedicated Team: 2 Architects, 4 Staff Engineers, 2 QA/SDET, 6-Month Horizon, 24/7 SLA',
      message: '[Phase 6 ROI Calculator Quote]: Engagement: Dedicated Team | Practice: Generative AI & LLMs | Horizon: 6 months | SLA: 24/7 Production Support | Est. US/EU Onshore Savings: ~65%',
    }

    const res = await fetch(`${BASE_URL}/api/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quotePayload),
    })

    const json = await res.json()
    if (res.ok && json.success) {
      logPass('Pricing Calculator quote submitted successfully to /api/quote')
    } else {
      logFail('Pricing Calculator quote submission failed', JSON.stringify(json))
    }
  } catch (err) {
    logFail('Pricing Calculator quote exception', err.message)
  }

  // -------------------------------------------------------------------------
  // TEST 2: Career Application Portal & Resume Upload Engine
  // -------------------------------------------------------------------------
  console.log('\n[Test Suite 2: Career Application Portal & Resume Upload Engine]')
  try {
    // Generate valid mock PDF file
    const mockPdfContent = '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000060 00000 n\n0000000115 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF'
    const pdfBuffer = Buffer.from(mockPdfContent, 'utf-8')
    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' })

    const formData = new FormData()
    formData.append('role_title', 'Staff AI Systems Architect')
    formData.append('role_id', 'staff-ai-architect')
    formData.append('candidate_name', 'Alexander Vance')
    formData.append('candidate_email', `alex.vance.${Date.now()}@mit-alumni.org`)
    formData.append('candidate_phone', '+1 (415) 890-2341')
    formData.append('linkedin_url', 'https://linkedin.com/in/alex-vance-ai')
    formData.append('portfolio_url', 'https://github.com/avance-ai')
    formData.append(
      'cover_letter',
      'Extensive background in high-throughput distributed LLM inference clusters and zero-trust edge infrastructure.'
    )
    formData.append('resume', pdfBlob, 'Alexander_Vance_Resume.pdf')

    const applyRes = await fetch(`${BASE_URL}/api/careers/apply`, {
      method: 'POST',
      body: formData,
    })

    const applyJson = await applyRes.json()
    if (applyRes.ok && applyJson.success && applyJson.applicationId) {
      testApplicationId = applyJson.applicationId
      uploadedResumeUrl = applyJson.resumeUrl
      logPass(`Candidate application submitted (ID: ${testApplicationId})`)
      logPass(`Resume uploaded to Supabase Storage: ${uploadedResumeUrl}`)
    } else {
      logFail('Candidate application submission failed', JSON.stringify(applyJson))
    }
  } catch (err) {
    logFail('Candidate application exception', err.message)
  }

  // -------------------------------------------------------------------------
  // TEST 3: Supabase Storage Resume Accessibility
  // -------------------------------------------------------------------------
  console.log('\n[Test Suite 3: Supabase Storage Resume File Retrieval]')
  if (uploadedResumeUrl) {
    try {
      const resumeRes = await fetch(uploadedResumeUrl)
      if (resumeRes.ok) {
        const contentType = resumeRes.headers.get('content-type') || ''
        logPass(`Resume publicly downloadable over HTTP (Status: ${resumeRes.status}, Type: ${contentType})`)
      } else {
        logFail(`Resume download failed over HTTP`, `Status: ${resumeRes.status}`)
      }
    } catch (err) {
      logFail('Resume download exception', err.message)
    }
  } else {
    logFail('Skipping resume download test (no resume URL)')
  }

  // -------------------------------------------------------------------------
  // TEST 4: Admin Authentication
  // -------------------------------------------------------------------------
  console.log('\n[Test Suite 4: Executive Admin Authentication]')
  try {
    const loginRes = await fetchWithJar(`${BASE_URL}/api/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@pulse41.com',
        password: 'Pulse41Admin2026!',
      }),
    })

    const loginJson = await loginRes.json()
    if (loginRes.ok && loginJson.success) {
      logPass(`Admin authentication successful as ${loginJson.user?.email}`)
    } else {
      logFail('Admin login failed', JSON.stringify(loginJson))
    }
  } catch (err) {
    logFail('Admin login exception', err.message)
  }

  // -------------------------------------------------------------------------
  // TEST 5: Admin Applications API (/api/admin/applications)
  // -------------------------------------------------------------------------
  console.log('\n[Test Suite 5: Admin Candidate Applications Pipeline]')
  try {
    const getRes = await fetchWithJar(`${BASE_URL}/api/admin/applications`)
    const getJson = await getRes.json()

    if (getRes.ok && getJson.success && Array.isArray(getJson.data)) {
      logPass(`Fetched ${getJson.data.length} total candidate applications from database`)

      const found = getJson.data.find((a) => a.id === testApplicationId)
      if (found) {
        logPass(`Found newly submitted candidate: ${found.name || found.candidate_name} (${found.job_title || found.role_title})`)
        if (found.status === 'new') {
          logPass(`Application initial status is correctly 'new'`)
        } else {
          logFail(`Expected initial status 'new', got '${found.status}'`)
        }
      } else {
        logFail(`Newly submitted application ID ${testApplicationId} not found in listing`)
      }
    } else {
      logFail('Failed to retrieve applications listing', JSON.stringify(getJson))
    }
  } catch (err) {
    logFail('Admin applications GET exception', err.message)
  }

  // -------------------------------------------------------------------------
  // TEST 6: Candidate Hiring Status Transitions
  // -------------------------------------------------------------------------
  console.log('\n[Test Suite 6: Candidate Status State Machine]')
  if (testApplicationId) {
    try {
      // 1. Progress to 'shortlisted'
      const patch1 = await fetchWithJar(`${BASE_URL}/api/admin/applications/${testApplicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'shortlisted' }),
      })
      const patch1Json = await patch1.json()
      if (patch1.ok && patch1Json.data?.status === 'shortlisted') {
        logPass("Candidate status progressed to 'shortlisted'")
      } else {
        logFail("Status update to 'shortlisted' failed", JSON.stringify(patch1Json))
      }

      // 2. Progress to 'interviewed'
      const patch2 = await fetchWithJar(`${BASE_URL}/api/admin/applications/${testApplicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'interviewed' }),
      })
      const patch2Json = await patch2.json()
      if (patch2.ok && patch2Json.data?.status === 'interviewed') {
        logPass("Candidate status progressed to 'interviewed'")
      } else {
        logFail("Status update to 'interviewed' failed", JSON.stringify(patch2Json))
      }

      // 3. Test invalid status rejection
      const patchInvalid = await fetchWithJar(`${BASE_URL}/api/admin/applications/${testApplicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'invalid_status_xyz' }),
      })
      if (patchInvalid.status === 400) {
        logPass('Invalid status rejected with HTTP 400')
      } else {
        logFail(`Expected 400 on invalid status, got ${patchInvalid.status}`)
      }
    } catch (err) {
      logFail('Candidate status transition exception', err.message)
    }
  }

  // -------------------------------------------------------------------------
  // TEST 7: Admin Leads Unified Aggregation & Export
  // -------------------------------------------------------------------------
  console.log('\n[Test Suite 7: Admin Leads Aggregation & Export]')
  try {
    const leadsRes = await fetchWithJar(`${BASE_URL}/api/admin/leads`)
    const leadsJson = await leadsRes.json()

    if (leadsRes.ok && leadsJson.success) {
      if (Array.isArray(leadsJson.data?.applications)) {
        logPass(`Leads API returned unified applications array (${leadsJson.data.applications.length} candidates)`)
      } else {
        logFail('Leads API missing data.applications array')
      }
      if (typeof leadsJson.counts?.totalApplications === 'number') {
        logPass(`Leads API includes counts.totalApplications (${leadsJson.counts.totalApplications})`)
      } else {
        logFail('Leads API missing counts.totalApplications')
      }
    } else {
      logFail('Failed to fetch admin leads aggregation', JSON.stringify(leadsJson))
    }

    // Export CSV for applications
    const exportRes = await fetchWithJar(`${BASE_URL}/api/admin/leads/export?type=applications`)
    if (exportRes.ok) {
      const csvText = await exportRes.text()
      if (csvText.includes('Alexander Vance') && csvText.includes('Staff AI Systems Architect')) {
        logPass('CSV export for applications successfully generated with candidate dossier')
      } else {
        logFail('CSV export missing candidate information', csvText.substring(0, 200))
      }
    } else {
      logFail(`CSV export failed with status ${exportRes.status}`)
    }
  } catch (err) {
    logFail('Admin leads aggregation/export exception', err.message)
  }

  // -------------------------------------------------------------------------
  // TEST 8: Admin Dashboard Render Check
  // -------------------------------------------------------------------------
  console.log('\n[Test Suite 8: Admin Dashboard UI Render Verification]')
  try {
    const dashRes = await fetchWithJar(`${BASE_URL}/admin`)
    if (dashRes.ok) {
      const html = await dashRes.text()
      if (html.includes('Executive Command Center') && html.includes('Pipeline Leads')) {
        logPass('Admin Dashboard rendered with Executive Command Center metrics')
      } else {
        logFail('Admin Dashboard rendered but missing expected keywords')
      }
    } else {
      logFail(`Admin Dashboard failed to load (Status: ${dashRes.status})`)
    }
  } catch (err) {
    logFail('Admin Dashboard render exception', err.message)
  }

  // -------------------------------------------------------------------------
  // TEST 9: Candidate Record Clean-up
  // -------------------------------------------------------------------------
  console.log('\n[Test Suite 9: Candidate Record Cleanup via DELETE]')
  if (testApplicationId) {
    try {
      const delRes = await fetchWithJar(`${BASE_URL}/api/admin/applications/${testApplicationId}`, {
        method: 'DELETE',
      })
      const delJson = await delRes.json()
      if (delRes.ok && delJson.success) {
        logPass(`Test candidate application ${testApplicationId} deleted successfully`)
      } else {
        logFail('Failed to delete test candidate record', JSON.stringify(delJson))
      }
    } catch (err) {
      logFail('Candidate deletion exception', err.message)
    }
  }

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log('\n======================================================')
  console.log(`  Phase 6 Verification Summary:`)
  console.log(`  Passed: ${passCount}`)
  console.log(`  Failed: ${failCount}`)
  console.log('======================================================\n')

  if (failCount > 0) {
    process.exit(1)
  }
}

runPhase6Audit()
