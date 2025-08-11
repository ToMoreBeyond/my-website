import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection3D';
import { TeamSection } from '@/components/sections/TeamSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <TeamSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
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
    </>
  );
}
