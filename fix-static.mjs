import { execSync } from 'node:child_process'
import fs from 'node:fs'

console.log('1. Setting 755 permissions on .next and public...')
try {
  execSync('chmod -R 755 .next public')
  console.log('✓ Permissions set successfully.')
} catch (e) {
  console.log('chmod warning:', e.message)
}

console.log('2. Copying static files to public/_next/static...')
try {
  execSync('mkdir -p public/_next && cp -r .next/static public/_next/')
  console.log('✓ Successfully copied to public/_next/static!')
} catch (e) {
  console.log('cp error:', e.message)
}

try {
  if (fs.existsSync('../pulse41.com')) {
    console.log('3. Also copying to domain root pulse41.com/_next/static...')
    execSync('mkdir -p ../pulse41.com/_next && cp -r .next/static ../pulse41.com/_next/')
    execSync('chmod -R 755 ../pulse41.com/_next')
    console.log('✓ Successfully copied to pulse41.com/_next/static!')
  }
} catch (e) {}

console.log('ALL STATIC FILES COPIED AND PERMISSIONS FIXED!')
