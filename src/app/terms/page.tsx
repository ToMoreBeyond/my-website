'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              戻る
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              トップページ
            </Link>
          </div>

          <h1 className="heading-1 text-gray-900 mb-8">
            利用規約
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 space-y-8">
            <section>
              <p className="text-gray-700 leading-relaxed mb-6">
                この利用規約（以下「本規約」といいます）は、ToMoreBeyond株式会社（以下「当社」といいます）が提供するサービス（以下「本サービス」といいます）の利用条件を定めるものです。本サービスをご利用される方（以下「利用者」といいます）は、本規約に同意したものとみなされます。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第1条（適用）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>本規約は、本サービスの提供条件及び本サービスの利用に関する当社と利用者との間の権利義務関係を定めることを目的とし、利用者と当社との間の本サービスの利用に関わる一切の関係に適用されます。</li>
                <li>当社が本サービス上で掲載する本サービス利用に関するルール等は、本規約の一部を構成するものとします。</li>
                <li>本規約の内容と前項のルール等との内容が異なる場合は、別段の定めがない限り、前項のルール等が優先して適用されるものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第2条（定義）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>「本サービス」とは、当社が提供するすべてのサービスを意味します。</li>
                <li>「利用者」とは、本規約に同意の上、本サービスを利用するすべての方を意味します。</li>
                <li>「知的財産権」とは、著作権、特許権、実用新案権、商標権、意匠権その他の知的財産権（それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます）を意味します。</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第3条（本規約への同意）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>利用者は、本規約の定めに従って本サービスを利用しなければなりません。利用者は、本規約に有効かつ取り消し不能な同意をしないかぎり本サービスを利用できません。</li>
                <li>利用者が未成年者である場合は、親権者等の法定代理人の同意を得た上で本サービスを利用してください。</li>
                <li>利用者が本サービスを実際に利用することによって、本規約に有効かつ取り消し不能な同意をしたものとみなされます。</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第4条（禁止事項）
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                利用者は、本サービスの利用にあたり、以下の各号のいずれかに該当する行為をしてはなりません。
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>法令に違反する行為または犯罪行為に関連する行為</li>
                <li>当社、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為</li>
                <li>公序良俗に反する行為</li>
                <li>当社、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為</li>
                <li>本サービスを通じ、以下に該当し、または該当すると当社が判断する情報を送信する行為</li>
                <ul className="list-disc list-inside space-y-1 ml-8 mt-2">
                  <li>過度に暴力的または残虐な表現を含む情報</li>
                  <li>コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報</li>
                  <li>当社、本サービスの他の利用者またはその他の第三者の名誉または信用を毀損する表現を含む情報</li>
                  <li>過度にわいせつな表現を含む情報</li>
                  <li>差別を助長する表現を含む情報</li>
                  <li>自殺、自傷行為を助長する表現を含む情報</li>
                  <li>薬物の不適切な利用を助長する表現を含む情報</li>
                  <li>反社会的な表現を含む情報</li>
                  <li>チェーンメール等の第三者への情報の拡散を求める情報</li>
                  <li>他人に不快感を与える表現を含む情報</li>
                </ul>
                <li>本サービスのネットワークまたはシステム等に過度な負荷をかける行為</li>
                <li>当社が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為</li>
                <li>本サービスの運営を妨害するおそれのある行為</li>
                <li>当社のネットワークまたはシステム等への不正アクセス</li>
                <li>第三者に成りすます行為</li>
                <li>本サービスの他の利用者のIDまたはパスワードを利用する行為</li>
                <li>当社が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
                <li>本サービスの他の利用者の情報の収集</li>
                <li>当社、本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為</li>
                <li>反社会的勢力等への利益供与</li>
                <li>前各号の行為を直接または間接に惹起し、または容易にする行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第5条（本サービスの停止等）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>当社は、以下のいずれかに該当する場合には、利用者に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。
                  <ul className="list-disc list-inside space-y-1 ml-8 mt-2">
                    <li>本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合</li>
                    <li>コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合</li>
                    <li>地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合</li>
                    <li>その他、当社が停止または中断を必要と判断した場合</li>
                  </ul>
                </li>
                <li>当社は、本条に基づき当社が行った措置に基づき利用者に生じた損害について一切の責任を負いません。</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第6条（権利帰属）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>本サービスに関する知的財産権は、すべて当社または当社にライセンスを許諾している者に帰属します。</li>
                <li>本規約に基づく本サービスの利用許諾は、本サービスに関する当社または当社にライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第7条（保証の否認及び免責）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>当社は、本サービスが利用者の特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、利用者による本サービスの利用が利用者に適用のある法令または業界団体の内部規則等に適合すること、継続的に利用できること、及び不具合が生じないことについて、明示または黙示を問わず何ら保証するものではありません。</li>
                <li>当社は、本サービスに関して利用者が被った損害につき、過去12ヶ月間に利用者が当社に支払った対価の金額を超えて賠償する責任を負わないものとし、また、付随的損害、間接損害、特別損害、将来の損害及び逸失利益にかかる損害については、賠償する責任を負わないものとします。</li>
                <li>本サービスまたは当社ウェブサイトに関連して利用者と他の利用者または第三者との間において生じた取引、連絡、紛争等については、利用者が自己の責任によって解決するものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第8条（秘密保持）
              </h2>
              <p className="text-gray-700 leading-relaxed">
                利用者は、本サービスに関連して当社が利用者に対して秘密に取扱うことを求めて開示した非公知の情報について、当社の事前の書面による承諾がある場合を除き、秘密に取扱うものとします。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第9条（利用規約の変更）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>当社は、当社が必要と認めた場合は、本規約を変更できるものとします。</li>
                <li>当社は、本規約を変更した場合には、利用者に当該変更内容を通知するものとし、当該変更内容の通知後、利用者が本サービスを利用した場合または当社の定める期間内に利用停止の手続をとらなかった場合には、利用者は、本規約の変更に同意したものとみなします。</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第10条（連絡・通知）
              </h2>
              <p className="text-gray-700 leading-relaxed">
                本サービスに関する問い合わせその他利用者から当社に対する連絡または通知、及び本規約の変更に関する通知その他当社から利用者に対する連絡または通知は、当社の定める方法で行うものとします。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第11条（サービス利用契約上の地位の譲渡等）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>利用者は、当社の書面による事前の承諾なく、本規約上の地位または本規約に基づく権利もしくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。</li>
                <li>当社は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い本規約上の地位、本規約に基づく権利及び義務並びに利用者の情報を当該事業譲渡の譲受人に譲渡することができるものとし、利用者は、かかる譲渡につき本項において予め同意したものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第12条（分離可能性）
              </h2>
              <p className="text-gray-700 leading-relaxed">
                本規約のいずれかの条項またはその一部が、消費者契約法その他の法令等により無効または執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効または執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。
              </p>
            </section>

            <section>
              <h2 className="heading-3 text-gray-900 mb-4">
                第13条（準拠法及び管轄裁判所）
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>本規約及び本サービスに関する準拠法は日本法とします。</li>
                <li>本規約または本サービスに起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
              </ol>
            </section>

            <section className="pt-6 border-t border-gray-200">
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
    </div>
  );
}
