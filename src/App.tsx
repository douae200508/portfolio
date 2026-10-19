import { Route, Routes } from 'react-router-dom'

import { BackgroundMesh } from '@/components/background-mesh'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { HomePage } from '@/pages/home'
import { LegalPage } from '@/pages/legal'
import { NotFoundPage } from '@/pages/not-found'
import { ProjectDetailPage } from '@/pages/project-detail'

function App() {
  return (
    <TooltipProvider>
      <BackgroundMesh />
      {/* Accessibilité (§5) : premier élément focusable de la page, invisible
          tant qu'il n'a pas le focus clavier (Tab), pour sauter la nav. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Aller au contenu principal
      </a>

      <Navbar />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projets/:slug" element={<ProjectDetailPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <Toaster />
    </TooltipProvider>
  )
}

export default App
