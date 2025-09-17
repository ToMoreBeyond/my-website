import { Header } from '@/components/layout/Header';

export default function Home() {
  return (
    <>
      <Header />
      
      {/* Hero Section - シンプル版 */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950">
        <div className="container text-center text-white">
          <h1 className="text-6xl font-bold mb-6">ToMoreBeyond</h1>
          <p className="text-2xl mb-8 text-gray-300">技術と情熱で、より遠くへ</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            革新的なモバイルアプリケーションの開発を通じて、社会に新たな価値を創造し、
            人々の可能性を最大限に引き出すテクノロジーソリューションを提供します。
          </p>
        </div>
      </section>

      {/* About Section - シンプル版 */}
      <section id="company" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">私たちについて</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ToMoreBeyondは、テクノロジーの力で人々の生活をより豊かにすることを使命とする東京発のテクノロジー企業です。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">ミッション</h3>
              <p className="text-gray-600">技術と情熱で、より遠くへ。革新的なソリューションを提供します。</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">ビジョン</h3>
              <p className="text-gray-600">人々の可能性を最大限に引き出すテクノロジーを創造します。</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">価値観</h3>
              <p className="text-gray-600">革新性、情熱、挑戦、品質を大切にしています。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - シンプル版 */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">プロダクト</h2>
            <p className="text-lg text-gray-600">最先端技術と人間中心設計を融合した、次世代のモバイルアプリケーション</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">忠嵩 (TADATAKA)</h3>
              <p className="text-gray-600 mb-4">歴史と現代を繋ぐ、革新的な地図アプリケーション</p>
              <span className="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">開発中</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">TOI-RUN</h3>
              <p className="text-gray-600 mb-4">ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム</p>
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">ベータ版</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Meet in the middle</h3>
              <p className="text-gray-600 mb-4">人と人を繋ぐ、新しい出会いのプラットフォーム</p>
              <span className="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">開発中</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - シンプル版 */}
      <section id="team" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">チーム</h2>
            <p className="text-lg text-gray-600">ToMoreBeyondの優秀なチームメンバー</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">山田</h3>
              <p className="text-gray-600">CEO / Chief Executive Officer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">正留</h3>
              <p className="text-gray-600">CTO / Chief Technology Officer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">安藤</h3>
              <p className="text-gray-600">CDO / Chief Design Officer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - シンプル版 */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">お問い合わせ</h2>
            <p className="text-lg text-gray-300">ご質問・ご相談はお気軽にお問い合わせください</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6" name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label className="block text-sm font-medium mb-2">お名前</label>
                <input type="text" name="name" required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">メールアドレス</label>
                <input type="email" name="email" required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">メッセージ</label>
                <textarea name="message" rows={5} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                  送信する
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ToMoreBeyond</h3>
              <p className="text-gray-400">技術と情熱で、より遠くへ。</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">プロダクト</h4>
              <ul className="space-y-2 text-gray-400">
                <li>忠嵩 (TADATAKA)</li>
                <li>TOI-RUN</li>
                <li>Meet in the middle</li>
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
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ToMoreBeyond Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
