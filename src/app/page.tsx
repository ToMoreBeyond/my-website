import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content" className="min-h-screen bg-background">
        <HeroSection />
        <ProductsSection />
        <TeamSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
