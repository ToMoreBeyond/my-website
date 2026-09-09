import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { teamMembers } from '@/data/team'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/common/SectionHeading'

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-16 border-t border-border py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 md:px-8">
        <SectionHeading label="Team" title="チームメンバー" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="group/member gap-0 p-0 hover:glow-ring focus-within:glow-ring"
            >
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-[4/5]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover/member:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="palt text-2xl font-bold tracking-tight">
                    {member.name}
                  </CardTitle>
                  <Badge variant="outline" className="h-6 px-2.5 font-display tracking-wide">
                    {member.positionEn}
                  </Badge>
                </div>
                <CardDescription className="text-sm leading-relaxed">{member.bio}</CardDescription>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="-ml-3 mt-1 h-10 w-fit px-3 text-foreground"
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
