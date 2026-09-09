'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Share2, ArrowRight } from 'lucide-react';
import { teamMembers, TeamMember } from '@/data/team';
import { DetailHero } from '@/components/layout/DetailHero';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/common/SectionHeading';
import { StatusDot } from '@/components/common/StatusDot';

interface TeamDetailClientProps {
  member: TeamMember;
}

export function TeamDetailClient({ member }: TeamDetailClientProps) {
  return (
    <div className="bg-background">
      {/* Hero */}
      <DetailHero
        title={member.name}
        subtitle={member.nameEn}
        tagline={`${member.position}（${member.positionEn}）`}
        description={member.bio}
        imageSrc={member.image}
        imageAlt={member.name}
        imagePosition="left"
        imageStyle="photo"
        eager
        actions={
          <>
            {member.social?.github && (
              <Button asChild size="lg" className="h-10 rounded-full">
                <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                  <Github data-icon="inline-start" />
                  GitHub
                </a>
              </Button>
            )}
            {member.social?.twitter && (
              <Button asChild size="lg" className="h-10 rounded-full">
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter data-icon="inline-start" />
                  Twitter
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-full"
              onClick={() =>
                navigator.share?.({ title: `${member.name} - ToMoreBeyond`, url: window.location.href })
              }
            >
              <Share2 data-icon="inline-start" />
              シェア
            </Button>
          </>
        }
      />

      {/* Expertise Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:px-8">
          <SectionHeading title="専門分野" description={`${member.name}の専門知識と技術領域`} />

          <div className="flex flex-wrap gap-2.5">
            {member.expertise.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="h-9 rounded-full px-4 text-sm font-medium"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:px-8">
          <SectionHeading title="実績・経験" description="これまでの主な実績と経験" />

          <Card className="gap-0 rounded-3xl p-0 shadow-warm">
            <CardContent className="px-6 py-3 md:px-8">
              <ul className="flex flex-col">
                {member.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex items-start gap-4 border-b border-border py-4 last:border-b-0"
                  >
                    <StatusDot tone="solid" className="mt-2.5" />
                    <p className="leading-relaxed text-foreground">{achievement}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Team Members */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:px-8">
          <SectionHeading title="他のチームメンバー" description="ToMoreBeyondのチームメンバー" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {teamMembers
              .filter((m) => m.id !== member.id)
              .map((otherMember) => (
                <Card
                  key={otherMember.id}
                  className="group/other gap-0 overflow-hidden rounded-3xl p-3 shadow-warm transition-shadow hover:shadow-lift focus-within:ring-2 focus-within:ring-ring"
                >
                  <Link href={`/team/${otherMember.id}`} className="block rounded-2xl outline-none">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                      <Image
                        src={otherMember.image}
                        alt={otherMember.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover/other:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex flex-col gap-2 px-3 pt-5 pb-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="palt text-xl font-bold text-foreground">
                          {otherMember.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{otherMember.position}</p>
                      </div>
                      <p className="line-clamp-2 font-mincho text-sm leading-relaxed text-muted-foreground">
                        {otherMember.bio}
                      </p>
                      <span className="mt-2 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-foreground">
                        詳細を見る
                        <ArrowRight className="size-4 transition-transform group-hover/other:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
