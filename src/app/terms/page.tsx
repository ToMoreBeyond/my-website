'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-4xl mx-auto px-6 md:px-8 py-24 lg:py-32">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 mb-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            戻る
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <HomeIcon className="w-4 h-4" />
            トップ
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
          利用規約
        </h1>

        <div className="space-y-10">
          <section>
            <p className="text-gray-600 leading-relaxed">
              この利用規約（以下「本規約」といいます）は、ToMoreBeyond株式会社（以下「当社」といいます）が提供するサービス（以下「本サービス」といいます）の利用条件を定めるものです。本サービスをご利用される方（以下「利用者」といいます）は、本規約に同意したものとみなされます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第1条（適用）
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>本規約は、本サービスの提供条件及び本サービスの利用に関する当社と利用者との間の権利義務関係を定めることを目的とし、利用者と当社との間の本サービスの利用に関わる一切の関係に適用されます。</li>
              <li>当社が本サービス上で掲載する本サービス利用に関するルール等は、本規約の一部を構成するものとします。</li>
              <li>本規約の内容と前項のルール等との内容が異なる場合は、別段の定めがない限り、前項のルール等が優先して適用されるものとします。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第2条（定義）
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>「本サービス」とは、当社が提供するすべてのサービスを意味します。</li>
              <li>「利用者」とは、本規約に同意の上、本サービスを利用するすべての方を意味します。</li>
              <li>「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権（それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます）を意味します。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第3条（本規約への同意）
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>利用者は、本規約の定めに従って本サービスを利用しなければなりません。利用者は、本規約に有効かつ取り消し不能な同意をしないかぎり本サービスを利用できません。</li>
              <li>利用者が未成年者である場合は、親権者等の法定代理人の同意を得た上で本サービスを利用してください。</li>
              <li>利用者が本サービスを実際に利用することによって、本規約に有効かつ取り消し不能な同意をしたものとみなされます。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第4条（禁止事項）
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              利用者は、本サービスの利用にあたり、以下の各号のいずれかに該当する行為をしてはなりません。
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>法令に違反する行為または犯罪行為に関連する行為</li>
              <li>当社、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為</li>
              <li>公序良俗に反する行為</li>
              <li>当社、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為</li>
              <li>本サービスのネットワークまたはシステム等に過度な負荷をかける行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>当社のネットワークまたはシステム等への不正アクセス</li>
              <li>第三者に成りすます行為</li>
              <li>当社が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
              <li>反社会的勢力等への利益供与</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第5条（本サービスの停止等）
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>当社は、以下のいずれかに該当する場合には、利用者に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。</li>
              <li>本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合</li>
              <li>コンピューター、通信回線等の障害により本サービスの運営ができなくなった場合</li>
              <li>地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合</li>
              <li>その他、当社が停止または中断を必要と判断した場合</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第6条（権利帰属）
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>本サービスに関する知的財産権は、すべて当社または当社にライセンスを許諾している者に帰属します。</li>
              <li>本規約に基づく本サービスの利用許諾は、本サービスに関する当社または当社にライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第7条（保証の否認及び免責）
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>当社は、本サービスが利用者の特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、利用者による本サービスの利用が利用者に適用のある法令または業界団体の内部規則等に適合すること、継続的に利用できること、及び不具合が生じないことについて、明示または黙示を問わず何ら保証するものではありません。</li>
              <li>当社は、本サービスに関して利用者が被った損害につき、過去12ヶ月間に利用者が当社に支払った対価の金額を超えて賠償する責任を負わないものとします。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第8条（利用規約の変更）
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>当社は、当社が必要と認めた場合は、本規約を変更できるものとします。</li>
              <li>当社は、本規約を変更した場合には、利用者に当該変更内容を通知するものとし、当該変更内容の通知後、利用者が本サービスを利用した場合には、利用者は、本規約の変更に同意したものとみなします。</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              第9条（準拠法及び管轄裁判所）
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              <li>本規約及び本サービスに関する準拠法は日本法とします。</li>
              <li>本規約または本サービスに起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
            </ol>
          </section>

          <section className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              制定日：2025年1月1日
            </p>
            <p className="text-sm text-gray-500">
              最終改定日：2025年1月1日
            </p>
            <p className="text-sm text-gray-500 mt-4">
              ToMoreBeyond株式会社
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
