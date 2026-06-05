'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter, Share2, ArrowRight } from 'lucide-react';
import { teamMembers, TeamMember } from '@/data/team';
import { DetailHero } from '@/components/layout/DetailHero';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TeamDetailClientProps {
  member: TeamMember;
}

export function TeamDetailClient({ member }: TeamDetailClientProps) {
  const expertiseRef = useRef(null);
  const achievementsRef = useRef(null);
  const teamRef = useRef(null);
  const expertiseInView = useInView(expertiseRef, { once: true, margin: '-100px' });
  const achievementsInView = useInView(achievementsRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

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
        eager
        actions={
          <>
            {member.social?.github && (
              <Button asChild size="lg">
                <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                  <Github data-icon="inline-start" />
                  GitHub
                </a>
              </Button>
            )}
            {member.social?.twitter && (
              <Button asChild size="lg">
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter data-icon="inline-start" />
                  Twitter
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
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
      <section ref={expertiseRef} className="bg-muted/30 py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={expertiseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              専門分野
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {member.name}の専門知識と技術領域
            </p>
          </motion.div>

          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {member.expertise.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={expertiseInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={achievementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              実績・経験
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">これまでの主な実績と経験</p>
          </motion.div>

          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {member.achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 24 }}
                animate={achievementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="flex items-start gap-4 p-2 md:p-4">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-muted-foreground" />
                    <p className="leading-relaxed text-foreground">{achievement}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Team Members */}
      <section ref={teamRef} className="bg-muted/30 py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              他のチームメンバー
            </h2>
            <p className="text-muted-foreground">ToMoreBeyondのチームメンバー</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {teamMembers
              .filter((m) => m.id !== member.id)
              .map((otherMember, index) => (
                <motion.div
                  key={otherMember.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group h-full overflow-hidden p-0 transition-shadow duration-200 hover:shadow-lg">
                    <Link href={`/team/${otherMember.id}`} className="block">
                      <div className="relative h-64 overflow-hidden bg-muted">
                        <Image
                          src={otherMember.image}
                          alt={otherMember.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="mb-1 text-xl font-semibold text-foreground">
                          {otherMember.name}
                        </h3>
                        <p className="mb-3 text-muted-foreground">{otherMember.position}</p>
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                          {otherMember.bio}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-foreground">
                          詳細を見る
                          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
