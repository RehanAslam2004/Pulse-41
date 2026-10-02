/**
 * Pulse41 Phase 4 — Dynamic Detail Pages & UX Automated Audit Script
 * Tests all 28 dynamic pages, metadata, breadcrumbs, quick-nav, and 404 handling.
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const SERVICES = [
  'ai-automation',
  'software-engineering',
  'cloud-devops',
  'cybersecurity',
  'data-analytics',
  'digital-marketing',
  'managed-delivery',
  'consulting-assurance',
]

const SOLUTIONS = [
  'pulse-desk-ai',
  'pulse-contact',
  'pulse-doc-ai',
  'pulse-core',
  'pulse-cert',
  'pulse-work',
  'pulse-store',
  'pulse-nexus',
  'pulse-learn',
  'pulse-vault',
]

const CASE_STUDIES = [
  'digital-commerce-inventory-engine',
  'automated-risk-intelligence-dashboard',
  'enterprise-learning-assessment-platform',
  'secure-patient-services-portal-app',
]

const INSIGHTS = [
  'applied-ai-modern-enterprises-poc-to-production',
  'why-digital-transformation-projects-stumble',
  'engineering-digital-growth-engines',
  'building-technology-scales-across-borders',
  'generative-ai-corporate-operations-handbook',
  'global-digital-readiness-engineering-benchmark-2026',
]

async function testRoute(path, expectedStatus = 200, checks = []) {
  const url = `${BASE_URL}${path}`
  try {
    const res = await fetch(url)
    const text = await res.text()

    if (res.status !== expectedStatus) {
      console.error(`  FAIL [${res.status}] ${path} (expected ${expectedStatus})`)
      return false
    }

    for (const check of checks) {
      if (!text.includes(check)) {
        console.error(`  FAIL ${path}: Missing expected text snippet: "${check}"`)
        return false
      }
    }

    console.log(`  PASS [${res.status}] ${path}`)
    return true
  } catch (err) {
    console.error(`  ERROR ${path}:`, err.message)
    return false
  }
}

async function run() {
  console.log('='.repeat(70))
  console.log('PULSE41 PHASE 4 — DYNAMIC DETAIL PAGES AUDIT')
  console.log(`Target Host: ${BASE_URL}`)
  console.log('='.repeat(70))

  let passed = 0
  let total = 0

  // 1. Services Audit (8 pages)
  console.log('\n--- 1. Testing Services Dynamic Detail Routes (8) ---')
  for (const slug of SERVICES) {
    total++
    const ok = await testRoute(`/services/${slug}`, 200, ['Breadcrumb', 'Practice Blueprint', 'TECH. THINK. THRIVE.'])
    if (ok) passed++
  }

  // 2. Solutions Audit (10 pages)
  console.log('\n--- 2. Testing Solutions Dynamic Detail Routes (10) ---')
  for (const slug of SOLUTIONS) {
    total++
    const ok = await testRoute(`/solutions/${slug}`, 200, ['Breadcrumb', 'Platform Architecture', 'Configurable'])
    if (ok) passed++
  }

  // 3. Case Studies Audit (4 pages)
  console.log('\n--- 3. Testing Case Studies Dynamic Detail Routes (4) ---')
  for (const slug of CASE_STUDIES) {
    total++
    const ok = await testRoute(`/case-studies/${slug}`, 200, ['Breadcrumb', 'Delivery Blueprint', 'Measurable'])
    if (ok) passed++
  }

  // 4. Insights Audit (6 pages)
  console.log('\n--- 4. Testing Insights Dynamic Detail Routes (6) ---')
  for (const slug of INSIGHTS) {
    total++
    const ok = await testRoute(`/insights/${slug}`, 200, ['Breadcrumb', 'Executive Briefing', 'Research Contents'])
    if (ok) passed++
  }

  // 5. Negative 404 tests
  console.log('\n--- 5. Testing 404 Route Fallbacks ---')
  total++
  const ok404A = await testRoute('/services/non-existent-practice-slug-xyz', 404)
  if (ok404A) passed++

  total++
  const ok404B = await testRoute('/solutions/non-existent-solution-platform-xyz', 404)
  if (ok404B) passed++

  // 6. Navigation Direct Links Check (Listing Pages)
  console.log('\n--- 6. Testing Direct Links on Listing & Main Pages ---')
  total++
  const okServicesListing = await testRoute('/services', 200, ['/services/ai-automation', 'View Practice Blueprint'])
  if (okServicesListing) passed++

  total++
  const okSolutionsListing = await testRoute('/solutions', 200, ['/solutions/pulse-desk-ai', 'View Platform Specs'])
  if (okSolutionsListing) passed++

  total++
  const okCasesListing = await testRoute('/case-studies', 200, ['/case-studies/digital-commerce-inventory-engine'])
  if (okCasesListing) passed++

  total++
  const okInsightsListing = await testRoute('/insights', 200, ['/insights/applied-ai-modern-enterprises-poc-to-production'])
  if (okInsightsListing) passed++

  total++
  const okHomeLinks = await testRoute('/', 200, ['/case-studies/digital-commerce-inventory-engine', '/insights/'])
  if (okHomeLinks) passed++

  console.log('\n' + '='.repeat(70))
  console.log(`AUDIT RESULTS: ${passed}/${total} checks passed (${Math.round((passed / total) * 100)}%)`)
  console.log('='.repeat(70))

  if (passed === total) {
    console.log('ALL PHASE 4 CRITERIA VERIFIED SUCCESSFULLY!')
    process.exit(0)
  } else {
    console.error(`FAILED: ${total - passed} checks did not pass.`)
    process.exit(1)
  }
}

run()
