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

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden border-t border-border py-20 md:py-28"
    >
      <div
        aria-hidden
        className="bloom top-0 left-1/2 size-[560px] -translate-x-1/2 -translate-y-2/3 opacity-60"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        {/* Info */}
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading label="Contact" title="お問い合わせ" />

          <ul className="flex flex-col gap-4">
            {contactInfo.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <div className="glass flex size-11 shrink-0 items-center justify-center rounded-xl text-primary">
                  <item.Icon className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <Card className="gap-0 p-0 lg:col-span-7">
          <CardContent className="p-6 md:p-8">
            <form name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">お名前</FieldLabel>
                  <Input id="name" name="name" required placeholder="山田太郎" className="h-11" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="yamada@example.com"
                    className="h-11"
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
                    className="min-h-32"
                  />
                </Field>
                <Field>
                  <Button
                    type="submit"
                    size="lg"
                    className="mt-2 h-12 w-full text-base hover:glow-ring sm:w-auto sm:px-10"
                  >
                    送信する
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
