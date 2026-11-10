import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const rootDir = process.cwd()
const standaloneDir = path.join(rootDir, '.next', 'standalone')
const publicSrc = path.join(rootDir, 'public')
const publicDest = path.join(standaloneDir, 'public')
const staticSrc = path.join(rootDir, '.next', 'static')
const staticDest = path.join(standaloneDir, '.next', 'static')
const envSrc = path.join(rootDir, '.env.local')
const envDest = path.join(standaloneDir, '.env.production')

if (!fs.existsSync(standaloneDir)) {
  console.error('Error: .next/standalone does not exist. Please run "next build" first.')
  process.exit(1)
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

console.log('[1/4] Copying public and static assets...')
copyDirRecursive(publicSrc, publicDest)
copyDirRecursive(staticSrc, staticDest)
const publicNextStaticDest = path.join(standaloneDir, 'public', '_next', 'static')
copyDirRecursive(staticSrc, publicNextStaticDest)

const fixStaticSrc = path.join(rootDir, 'fix-static.mjs')
if (fs.existsSync(fixStaticSrc)) {
  fs.copyFileSync(fixStaticSrc, path.join(standaloneDir, 'fix-static.mjs'))
}

// Ensure standalone package.json has the production start and setup-static scripts
const standalonePkgPath = path.join(standaloneDir, 'package.json')
if (fs.existsSync(standalonePkgPath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(standalonePkgPath, 'utf8'))
    pkg.scripts = {
      start: 'node fix-static.mjs && node --disable-wasm-trap-handler --max-old-space-size=512 server.js',
      'setup-static': 'node fix-static.mjs',
    }
    fs.writeFileSync(standalonePkgPath, JSON.stringify(pkg, null, 2))
  } catch (e) {}
}

console.log('[2/4] Preparing production environment variables...')
if (fs.existsSync(envSrc)) {
  let envContent = fs.readFileSync(envSrc, 'utf8')
  if (!envContent.includes('NEXT_PUBLIC_SITE_URL')) {
    envContent += '\nNEXT_PUBLIC_SITE_URL=https://pulse41.com\n'
  }
  if (!envContent.includes('NODE_ENV')) {
    envContent += 'NODE_ENV=production\n'
  }
  fs.writeFileSync(envDest, envContent)
  // Also write as .env in standalone so Next picks it up under all circumstances
  fs.writeFileSync(path.join(standaloneDir, '.env'), envContent)
}

console.log('[3/4] Patching server.js for cPanel Phusion Passenger compatibility...')
const serverJsPath = path.join(standaloneDir, 'server.js')
if (fs.existsSync(serverJsPath)) {
  let serverCode = fs.readFileSync(serverJsPath, 'utf8')

  // Support both numeric ports and Unix domain sockets passed by Passenger
  if (serverCode.includes('parseInt(process.env.PORT, 10) || 3000')) {
    serverCode = serverCode.replace(
      'parseInt(process.env.PORT, 10) || 3000',
      "(process.env.PORT && !/^\\d+$/.test(process.env.PORT) ? process.env.PORT : (parseInt(process.env.PORT, 10) || 3000))"
    )
  }

  // Allow server.listen to listen without forcing hostname parameter when under Passenger
  if (serverCode.includes('server.listen(currentPort, hostname,')) {
    serverCode = serverCode.replace(
      'server.listen(currentPort, hostname,',
      'server.listen(currentPort,'
    )
  }

  fs.writeFileSync(serverJsPath, serverCode)
}

console.log('[4/4] Creating zip bundle (pulse41-deploy.zip)...')
const zipPath = path.join(rootDir, 'pulse41-deploy.zip')
try {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath)
  }
  execSync(
    `powershell -Command "Compress-Archive -Path '${standaloneDir}\\*' -DestinationPath '${zipPath}' -Force"`,
    { stdio: 'inherit' }
  )
  console.log(`\n SUCCESS! Deployment bundle created at: ${zipPath}`)
} catch (e) {
  console.log('\nTip: You can manually zip the contents of .next/standalone/ to upload to cPanel.')
}
