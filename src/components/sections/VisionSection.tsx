'use client';

import { motion } from 'framer-motion'
import { visionCopy } from '@/data/vision'

export function VisionSection() {
  // simple slug generator for anchor ids
  const slug = (s: string) =>
    s
      .replace(/[\s　]+/g, '-')
      .replace(/[\(\)（）・/]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase()

  const englishMap: Record<string, string> = {
    'なぜ今、私たちか': 'WHY NOW',
    'だから「会社」にした': 'WHY COMPANY',
    '提供価値（誰に何が起きるか）': 'VALUE',
  }

  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 mb-4 leading-tight"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ToMoreBeyond Vision
        </motion.h2>
        <motion.p
          className="text-neutral-700 dark:text-neutral-200 text-lg md:text-xl mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {visionCopy.tagline}
        </motion.p>

        {/* Two-column editorial layout with sticky index */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sticky index */}
          <aside className="md:col-span-1 md:sticky md:top-24 self-start">
            <nav className="space-y-2 text-sm text-neutral-600">
              {visionCopy.sections.map((sec) => (
                <a key={sec.title} href={`#${slug(sec.title)}`} className="block hover:text-neutral-900 transition-colors">
                  <span className="mr-2 opacity-40">—</span>
                  {sec.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="md:col-span-3 space-y-16">
            <section className="space-y-4">
              <p className="text-neutral-800 dark:text-neutral-200 text-lg leading-relaxed">{visionCopy.intro}</p>
            </section>
            {visionCopy.sections.map((sec, i) => (
              <motion.section
                id={slug(sec.title)}
                key={sec.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.03 * i }}
                className={`scroll-mt-28 relative ${i % 2 === 1 ? 'bg-white/70 backdrop-blur-sm border border-neutral-200/60 rounded-2xl p-6 md:p-8' : ''}`}
              >
                <div className="pointer-events-none select-none absolute -top-6 -left-2 md:-left-4 text-[64px] md:text-[96px] font-black leading-none text-neutral-900/5">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <div className="text-xs tracking-widest uppercase text-neutral-500 mb-2">
                  {englishMap[sec.title] || 'SECTION'}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-4">{sec.title}</h3>
                {sec.body && (
                  <div className="space-y-4 text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    {sec.body.map((p, idx) => (
                      <p key={idx}>
                        {sec.emphasis && p.includes(sec.emphasis) ? (
                          <>
                            {p.split(sec.emphasis)[0]}
                            <mark className="bg-yellow-100 text-neutral-900 px-1 rounded">{sec.emphasis}</mark>
                            {p.split(sec.emphasis)[1]}
                          </>
                        ) : (
                          p
                        )}
                      </p>
                    ))}
                  </div>
                )}
                {sec.bullets && (
                  <ul className="mt-4 space-y-3">
                    {sec.bullets.map((b) => (
                      <li key={b.label} className="text-neutral-800 dark:text-neutral-200">
                        <span className="font-semibold">・{b.label}：</span>
                        <span>{b.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Divider() {
  return (
    <div className="my-10 flex items-center justify-center" aria-hidden>
      <div className="text-2xl md:text-3xl text-neutral-400">⸻</div>
    </div>
  )
}
