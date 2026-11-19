import { execSync } from 'node:child_process'
import fs from 'node:fs'

try {
  console.log('Active BUILD_ID:', fs.readFileSync('.next/BUILD_ID', 'utf8').trim())
} catch (e) {}

console.log('1. Clearing Next.js runtime route/build caches...')
try {
  execSync('rm -rf .next/server/route-cache .next/cache')
  console.log('✓ Cleared .next/server/route-cache and .next/cache.')
} catch (e) {
  console.log('Cache clear warning:', e.message)
}

try {
  const htaccessPath = '../pulse41.com/.htaccess'
  if (fs.existsSync(htaccessPath)) {
    let ht = fs.readFileSync(htaccessPath, 'utf8')
    if (!ht.includes('CacheLookup off')) {
      ht = ht.trimEnd() + '\n\n<IfModule LiteSpeed>\nCacheLookup off\n</IfModule>\n'
      fs.writeFileSync(htaccessPath, ht)
      console.log('✓ Added LiteSpeed CacheLookup off to ../pulse41.com/.htaccess')
    }
  }
} catch (e) {
  console.log('.htaccess check warning:', e.message)
}

console.log('2. Stopping running Node/Next workers...')
try {
  const ps = execSync('ps -eo pid,ppid,args').toString()
  for (const line of ps.split('\n')) {
    const match = line.trim().match(/^(\d+)\s+(\d+)\s+(.+)$/)
    if (match) {
      const pid = Number(match[1])
      const ppid = Number(match[2])
      const cmd = match[3]
      if (
        pid !== process.pid &&
        pid !== process.ppid &&
        (cmd.includes('next-server') || cmd.includes('server.js') || cmd.includes('lsnode'))
      ) {
        console.log('Stopping worker PID:', pid, cmd)
        try {
          process.kill(pid, 'SIGKILL')
        } catch (e) {
          console.log('Kill warning:', e.message)
        }
      }
    }
  }
} catch (e) {
  console.log('Process check skipped:', e.message)
}

console.log('3. Setting 755 permissions and syncing static assets...')
try {
  execSync('chmod -R 755 .next public')
  execSync('rm -rf public/_next/static && mkdir -p public/_next && cp -r .next/static public/_next/')
  execSync('chmod -R 755 public/_next')
  console.log('✓ Synced public/_next/static')

  if (fs.existsSync('../pulse41.com')) {
    execSync('rm -rf ../pulse41.com/_next/static && mkdir -p ../pulse41.com/_next && cp -r .next/static ../pulse41.com/_next/')
    execSync('chmod -R 755 ../pulse41.com/_next')
    console.log('✓ Synced pulse41.com/_next/static')
  }

  execSync('mkdir -p tmp && touch tmp/restart.txt')
  console.log('✓ Triggered app restart (tmp/restart.txt).')
} catch (e) {
  console.log('Sync error:', e.message)
}

console.log('ALL DONE!')
