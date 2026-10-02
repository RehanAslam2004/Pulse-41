import { useState, useEffect } from 'react'
import { type Page } from './components/tokens'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { AISolutions } from './pages/AISolutions'
import { Industries } from './pages/Industries'
import { Solutions } from './pages/Solutions'
import { CaseStudies } from './pages/CaseStudies'
import { Insights } from './pages/Insights'
import { Pricing } from './pages/Pricing'
import { Careers } from './pages/Careers'
import { Contact } from './pages/Contact'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])

  const props = { navigate }

  const renderPage = () => {
    switch (page) {
      case 'home':         return <Home {...props} />
      case 'about':        return <About {...props} />
      case 'services':     return <Services {...props} />
      case 'ai-solutions': return <AISolutions {...props} />
      case 'industries':   return <Industries {...props} />
      case 'solutions':    return <Solutions {...props} />
      case 'case-studies': return <CaseStudies {...props} />
      case 'insights':     return <Insights {...props} />
      case 'pricing':      return <Pricing {...props} />
      case 'careers':      return <Careers {...props} />
      case 'contact':      return <Contact {...props} />
      default:             return <Home {...props} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar current={page} navigate={navigate} />
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
