// out/ を配信中のローカルサーバーに対して、全ページを 3 幅で撮る確認用スクリプト。
// 使い方: (cd out && python3 -m http.server 8787 --bind 127.0.0.1) を別に立ててから
//         node scripts/screenshots.mjs
// 出力: screenshots/<page>-<width>.png（画面分）と <page>-<width>-full.png（ページ全体）
// あわせて横はみ出しと小さすぎるタップ領域を報告する。
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const base = process.env.BASE_URL ?? 'http://127.0.0.1:8787'
const outDir = 'screenshots'
mkdirSync(outDir, { recursive: true })

const pages = [
  ['index', '/'],
  ['products-himap', '/products/himap/'],
  ['products-keypet', '/products/keypet/'],
  ['products-toirun', '/products/toirun/'],
  ['team-yamada', '/team/yamada/'],
  ['team-masadome', '/team/masadome/'],
  ['team-ando', '/team/ando/'],
  ['privacy', '/privacy/'],
  ['privacy-himap', '/privacy/himap/'],
  ['terms', '/terms/'],
  ['not-found', '/404.html'],
]

const viewports = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
]

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const problems = []

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, locale: 'ja-JP' })
  const page = await ctx.newPage()
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: 'load' })
    // 起動画面と Hero の演出が終わるまで待つ
    await page.waitForTimeout(4000)
    // 画面分を先に撮る（初期表示の確認）
    await page.screenshot({ path: `${outDir}/${name}-${vp.width}.png` })
    // 遅延読み込みの画像と whileInView の演出を出すため、一度下まで送ってから戻す
    await page.evaluate(async () => {
      const step = Math.max(300, Math.floor(window.innerHeight * 0.8))
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 400))
    })
    await page.waitForTimeout(800)

    const report = await page.evaluate(() => {
      const doc = document.documentElement
      const overflow = doc.scrollWidth - window.innerWidth
      const small = []
      for (const el of document.querySelectorAll('a, button, input, textarea, [role=button]')) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        const cs = getComputedStyle(el)
        if (cs.visibility === 'hidden' || cs.display === 'none') continue
        if (r.height < 40 || r.width < 40) {
          small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}" ${Math.round(r.width)}x${Math.round(r.height)}`)
        }
      }
      return { overflow, small }
    })

    if (report.overflow > 0) problems.push(`${name}@${vp.width}: 横はみ出し ${report.overflow}px`)
    if (vp.width === 375 && report.small.length) {
      problems.push(`${name}@${vp.width}: 小さいタップ領域 ${report.small.length} 件: ${report.small.slice(0, 8).join(' | ')}`)
    }

    await page.screenshot({ path: `${outDir}/${name}-${vp.width}-full.png`, fullPage: true })
    console.log(`ok ${name} @${vp.width} (overflow=${report.overflow}px, small=${report.small.length})`)

    // スマホのメニュー（Sheet）を開いた状態も 1 枚だけ撮る
    if (name === 'index' && vp.width === 375) {
      await page.getByRole('button', { name: 'メニューを開く' }).click()
      await page.waitForTimeout(600)
      await page.screenshot({ path: `${outDir}/${name}-${vp.width}-menu.png` })
      await page.keyboard.press('Escape')
      await page.waitForTimeout(300)
    }
  }
  await ctx.close()
}

await browser.close()

console.log('\n=== 問題の一覧 ===')
if (problems.length === 0) console.log('なし')
for (const p of problems) console.log('- ' + p)
