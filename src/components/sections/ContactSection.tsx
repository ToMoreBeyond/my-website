import { Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SectionHeading } from '@/components/common/SectionHeading'

const contactInfo = [
  { Icon: Mail, label: 'Email', value: 'contact@tomorebeyond.co' },
  { Icon: MapPin, label: 'Location', value: 'Tokyo, Japan' },
  { Icon: Clock, label: 'Response', value: '24時間以内' },
]

/** 先頭の数字だけデジタル時計の書体にする（24時間以内 → 24 が光る） */
function ValueWithDigits({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return <>{value}</>
  return (
    <>
      <span className="font-seg text-base text-brand-soft">{match[1]}</span>
      {match[2]}
    </>
  )
}

/**
 * 暗い区画。インクの地に問い合わせ先とフォームを置く。
 */
export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-10 rounded-[2.5rem] bg-primary p-6 text-primary-foreground sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-16">
          {/* Info */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <SectionHeading label="Contact" title="お問い合わせ" inverted />

            <ul className="flex flex-col gap-5">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                    <item.Icon className="size-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-xs font-medium text-primary-foreground/60">
                      {item.label}
                    </span>
                    <span className="text-sm font-medium">
                      <ValueWithDigits value={item.value} />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <Card className="gap-0 rounded-3xl p-5 shadow-warm sm:p-8 lg:col-span-7">
            <CardContent className="px-0">
              <form name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">お名前</FieldLabel>
                    <Input id="name" name="name" required placeholder="山田太郎" className="h-11 rounded-xl" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="yamada@example.com"
                      className="h-11 rounded-xl"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="message">お問い合わせ内容</FieldLabel>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="お問い合わせ内容をご記入ください"
                      className="min-h-32 rounded-xl"
                    />
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      size="lg"
                      className="mt-2 h-12 w-full rounded-full text-base sm:w-auto sm:px-10"
                    >
                      送信する
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
