'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HimapPrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="mx-auto max-w-3xl px-5 pt-32 pb-24 md:px-8 lg:pt-36 lg:pb-32">
        {/* Navigation Buttons */}
        <div className="mb-12 flex items-center gap-2">
          <Button variant="outline" size="lg" className="h-10 rounded-full" onClick={() => router.back()}>
            <ArrowLeft data-icon="inline-start" />
            戻る
          </Button>
          <Button asChild variant="ghost" size="lg" className="h-10 rounded-full">
            <Link href="/">
              <Home data-icon="inline-start" />
              トップ
            </Link>
          </Button>
        </div>

        <header className="mb-10 flex flex-col gap-3">
          <p className="font-display text-sm font-semibold text-muted-foreground">Himap / ヒマップ</p>
          <h1 className="palt text-4xl leading-[1.15] font-bold tracking-[-0.03em] text-foreground md:text-5xl">
            プライバシーポリシー
          </h1>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            本プライバシーポリシーは、ToMoreBeyond（以下「当方」といいます）が提供するiOSアプリ「ヒマップ（Himap）」（以下「本アプリ」といいます）における個人情報および利用データの取り扱いについて定めるものです。本アプリをご利用いただく前に必ずお読みください。
          </p>
        </header>

        <div className="flex flex-col gap-10">
          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              1. 取得する情報
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              本アプリは以下の情報を取得します。
            </p>

            <h3 className="mt-4 mb-2 text-base font-bold text-foreground">
              1-1. 位置情報（緯度・経度）
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              現在地周辺の目的地を提案・ナビゲーションするため、デバイスの位置情報を使用します。位置情報は「アプリ使用中のみ」取得され、バックグラウンドでの取得は行いません。位置情報の取得には iOS の標準的な許可ダイアログが表示され、ユーザーが許可した場合のみ取得します。位置情報は端末上で利用された後、外部サーバーには保存されません。
            </p>

            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">
              1-2. アプリ利用データ
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              ゲームの進行状況（すごろくの進捗・ポイント・バッジ）、ブックマーク、設定、訪問履歴などの利用データは、デバイス内（UserDefaults）にのみ保存されます。アカウント登録は不要で、外部サーバーへのアップロードは行いません。
            </p>

            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">
              1-3. フィードバック内容（任意）
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              アプリ内のフィードバック機能から送信した満足度評価・要望・バグ報告のテキストは、開発者へ届けるために送信されます。送信は任意であり、送信しない場合でもアプリの機能は通常通り利用できます。
            </p>
          </section>

          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              2. 情報の利用目的
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              取得した情報は以下の目的でのみ利用します。
            </p>
            <ul className="legal-list list-disc text-muted-foreground">
              <li>現在地周辺の店舗・目的地の検索と提案</li>
              <li>目的地までのルート表示・到着判定</li>
              <li>アプリ機能の提供（すごろく、ブックマーク、ポイント・バッジ管理等）</li>
              <li>アプリの改善とバグ修正</li>
              <li>不具合・お問い合わせへの対応</li>
            </ul>
          </section>

          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              3. 第三者への提供・外部サービス
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              本アプリは、機能提供のために以下の外部サービスを利用しています。
            </p>

            <h3 className="mt-4 mb-2 text-base font-bold text-foreground">
              3-1. Google Places API（目的地検索）
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              近くのスポットを検索する際、現在地の緯度・経度・検索範囲・カテゴリ種別が Google LLC のサーバーに送信されます。検索結果（店舗名・住所・営業時間等）はキャッシュ目的でデバイス内に最大1時間保持されます。送信される情報に氏名・連絡先などの個人を直接特定する情報は含まれません。
            </p>

            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">
              3-2. Google マップ（ナビ起動時のみ）
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              本アプリ内ナビから外部ナビへ切り替えた場合、目的地の座標がインストール済みの Google マップアプリへ受け渡されます。
            </p>

            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">
              3-3. Google フォーム（フィードバック送信時のみ）
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              フィードバック機能から送信された内容は、Google フォームに送信されます。送信は任意です。
            </p>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              Google が提供するサービスにおける情報の取り扱いについては、Google のプライバシーポリシーをご参照ください。
              <br />
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-brand underline-offset-4 transition-colors hover:text-muted-foreground"
              >
                https://policies.google.com/privacy
              </a>
            </p>

            <p className="mt-2 leading-relaxed text-muted-foreground">
              上記を除き、当方は法令に基づく場合などを除いて、ユーザーの個人情報を第三者に提供することはありません。
            </p>
          </section>

          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              4. データの保存と削除
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              本アプリのデータはすべてデバイス内（UserDefaults）に保存され、外部サーバーへのアップロードは行いません。本アプリを iOS の標準手順で削除（アンインストール）すると、本アプリが保存しているすべてのデータが消去されます。
            </p>
          </section>

          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              5. トラッキングについて
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              本アプリは、Apple の App Tracking Transparency（ATT）の対象となるトラッキング（他社アプリ・他社サイトとの紐付けを伴う追跡）を行いません。広告 SDK の組み込みも行っていません。
            </p>
          </section>

          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              6. お子様のプライバシー
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              本アプリは13歳未満のお子様を対象としておらず、意図的にお子様の個人情報を収集することはありません。お子様が本アプリを使用していることが判明した場合、保護者の方は本サイトのお問い合わせフォームよりご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              7. ユーザーの権利
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              ユーザーは、iOS の設定アプリから本アプリの位置情報の許可を変更・取り消すことができます。また、本アプリを削除することで、本アプリがデバイス内に保持するすべてのデータを消去できます。
            </p>
          </section>

          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              8. プライバシーポリシーの変更
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              本ポリシーは、法令の変更や本アプリの仕様変更等に伴い、予告なく変更される場合があります。重要な変更があった場合は、本ページおよびアプリ内で通知します。変更後の内容は、本ページに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="palt mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl">
              9. お問い合わせ窓口
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              本ポリシーに関するご質問・ご要望は、以下の窓口までご連絡ください。
            </p>
            <Card className="rounded-2xl shadow-warm">
              <CardContent className="flex flex-col gap-1">
                <p className="font-medium text-foreground">
                  ToMoreBeyond
                </p>
                <p className="text-sm text-muted-foreground">
                  所在地：Tokyo, Japan
                </p>
                <p className="text-sm text-muted-foreground">
                  お問い合わせ：本サイトのお問い合わせフォームよりご連絡ください
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-1 pt-8">
            <Separator className="mb-7" />
            <p className="text-sm text-muted-foreground">
              制定日：2026年5月10日
            </p>
            <p className="text-sm text-muted-foreground">
              最終改定日：2026年5月10日
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
