import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const standaloneDir = path.join(rootDir, '.next', 'standalone')
const publicSrc = path.join(rootDir, 'public')
const publicDest = path.join(standaloneDir, 'public')
const staticSrc = path.join(rootDir, '.next', 'static')
const staticDest = path.join(standaloneDir, '.next', 'static')

if (!fs.existsSync(standaloneDir)) {
  console.error('Error: .next/standalone does not exist. Run "next build" first with output: "standalone" enabled.')
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

console.log('Copying static assets into .next/standalone...')
copyDirRecursive(publicSrc, publicDest)
copyDirRecursive(staticSrc, staticDest)
console.log('Standalone deployment bundle ready in .next/standalone!')

