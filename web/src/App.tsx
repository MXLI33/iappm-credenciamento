import { Routes, Route } from 'react-router-dom'
import { HomePage } from '@/pages/public/HomePage'
import { PsychologistsPage } from '@/pages/public/PsychologistsPage'
import { PsychologistProfilePage } from '@/pages/public/PsychologistProfilePage'
import { HowItWorksPage } from '@/pages/public/HowItWorksPage'
import { ApplyPage } from '@/pages/public/ApplyPage'
import { LoginPage } from '@/pages/public/LoginPage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'
import { ApplicationsPage } from '@/pages/admin/ApplicationsPage'
import { ApplicationDetailPage } from '@/pages/admin/ApplicationDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/psicologos" element={<PsychologistsPage />} />
      <Route path="/psicologos/:slug" element={<PsychologistProfilePage />} />
      <Route path="/como-funciona" element={<HowItWorksPage />} />
      <Route path="/credenciar" element={<ApplyPage />} />
      <Route path="/entrar" element={<LoginPage />} />
      <Route path="/admin/credenciamento" element={<ApplicationsPage />} />
      <Route path="/admin/credenciamento/:id" element={<ApplicationDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
