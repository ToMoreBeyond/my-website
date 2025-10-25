'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
      <div className="container py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              戻る
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              トップページ
            </Link>
          </div>

          <h1 className="heading-1 text-gray-900 dark:text-white mb-8">
            プライバシーポリシー
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-12 space-y-8">
            <section>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed mb-6">
                ToMoreBeyond株式会社（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と認識し、以下の方針に基づいて個人情報を適切に取り扱います。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                1. 個人情報の定義
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
                本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含む）、もしくは個人識別符号が含まれる情報を意味するものとします。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                2. 個人情報の収集方法
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed mb-4">
                当社は、以下の方法により個人情報を収集することがあります。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-100 ml-4">
                <li>お問い合わせフォームからの送信</li>
                <li>メールでのお問い合わせ</li>
                <li>サービスのご利用</li>
                <li>採用応募</li>
                <li>各種イベントへの参加申込</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                3. 個人情報の利用目的
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed mb-4">
                当社は、取得した個人情報を以下の目的で利用いたします。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-100 ml-4">
                <li>お問い合わせへの対応</li>
                <li>サービスの提供・運営</li>
                <li>サービスに関する情報のご案内</li>
                <li>採用選考</li>
                <li>マーケティング活動</li>
                <li>統計データの作成</li>
                <li>その他、上記利用目的に付随する目的</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                4. 個人情報の第三者提供
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
                当社は、以下の場合を除き、ご本人の同意を得ることなく第三者に個人情報を提供することはありません。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-100 ml-4 mt-4">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが困難である場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、ご本人の同意を得ることが困難である場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ご本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                5. 個人情報の管理
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
                当社は、個人情報の正確性を保ち、これを安全に管理します。個人情報への不正アクセス、紛失、破壊、改ざん、漏洩などを防止するため、必要かつ適切な安全管理措置を講じます。また、個人情報を取り扱う従業員や委託先に対して、必要かつ適切な監督を行います。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                6. 個人情報の開示・訂正・削除
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
                ご本人から個人情報の開示、訂正、削除等を求められた場合には、本人確認を行った上で、速やかに対応いたします。ただし、法令により開示等が制限される場合はこの限りではありません。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                7. Cookie（クッキー）について
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
                当社のウェブサイトでは、利便性の向上やアクセス解析のためにCookieを使用することがあります。Cookieの使用を望まない場合は、ブラウザの設定でCookieを無効にすることができますが、一部のサービスが利用できなくなる可能性があります。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                8. アクセス解析ツールについて
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
                当社のウェブサイトでは、サービスの向上のためにGoogle Analyticsなどのアクセス解析ツールを使用することがあります。これらのツールは、Cookieを使用して訪問者のデータを収集しますが、個人を特定する情報は含まれません。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                9. プライバシーポリシーの変更
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed">
                当社は、法令の変更や事業内容の変更等に伴い、本プライバシーポリシーを予告なく変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 dark:text-white mb-4">
                10. お問い合わせ窓口
              </h2>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed mb-4">
                個人情報の取り扱いに関するお問い合わせは、以下の窓口までご連絡ください。
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-800 dark:text-gray-100 font-semibold mb-2">
                  ToMoreBeyond株式会社
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  個人情報保護管理者：代表取締役 山田純大
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  所在地：東京都渋谷区
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  お問い合わせ：本サイトのお問い合わせフォームよりご連絡ください
                </p>
              </div>
            </section>

            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                制定日：2025年1月1日
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                最終改定日：2025年1月1日
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
