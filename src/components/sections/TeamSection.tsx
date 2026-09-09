import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { teamMembers } from '@/data/team'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/SectionHeading'

/**
 * 3 人のカード。写真を紙に貼り、名前と肩書き、一言を明朝で添える。
 */
export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-24 py-24 md:py-32 lg:py-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 md:gap-16 md:px-8">
        <SectionHeading label="Team" title="チームメンバー" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="group/member gap-0 overflow-hidden rounded-3xl p-3 shadow-warm"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/member:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <CardContent className="flex flex-col gap-3 px-3 pt-5 pb-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="palt text-2xl font-bold tracking-tight">
                    {member.name}
                  </CardTitle>
                  <Badge variant="outline" className="h-6 px-2.5 font-display font-semibold">
                    {member.positionEn}
                  </Badge>
                </div>
                <p className="font-mincho text-base leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="-ml-3 mt-1 h-11 w-fit rounded-full px-3"
                >
                  <Link href={`/team/${member.id}`}>
                    詳しく見る
                    <ArrowUpRight data-icon="inline-end" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
