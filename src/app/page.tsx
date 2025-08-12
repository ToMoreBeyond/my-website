import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ScrollAnimationProvider } from '@/components/common/ScrollAnimationProvider';
import { ParticleSystem } from '@/components/common/ParticleSystem';
import { GlobalMouseTracker } from '@/components/common/GlobalMouseTracker';
import { SectionTransition } from '@/components/common/SectionTransition';

export default function Home() {
  return (
    <ScrollAnimationProvider>
      <GlobalMouseTracker />
      <ParticleSystem particleCount={40} className="z-[1]" />
      
      <Header />
      <main>
        <SectionTransition sectionId="hero" transitionType="fade">
          <HeroSection />
        </SectionTransition>
        
        <SectionTransition sectionId="company" transitionType="slide" direction="up">
          <AboutSection />
        </SectionTransition>
        
        <SectionTransition sectionId="products" transitionType="split">
          <ProductsSection />
        </SectionTransition>
        
        <SectionTransition sectionId="team" transitionType="spiral">
          <TeamSection />
        </SectionTransition>
        
        <SectionTransition sectionId="contact" transitionType="wave">
          <ContactSection />
        </SectionTransition>
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
        {/* Subtle background effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-transparent to-secondary-500/20" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ToMoreBeyond</h3>
              <p className="text-gray-400 leading-relaxed">
                技術と情熱で、より遠くへ。
                <br />
                革新的なモバイルアプリケーションで
                人々の日常を豊かに変革します。
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">プロダクト</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#products" className="hover:text-white transition-colors">忠嵩 (TADATAKA)</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">TOI-RUN</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Meet in the middle</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">リンク</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#company" className="hover:text-white transition-colors">会社概要</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">チーム</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ToMoreBeyond Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </ScrollAnimationProvider>
  );
}
