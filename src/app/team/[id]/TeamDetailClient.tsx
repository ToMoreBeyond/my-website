'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LinkIcon, ShareIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { teamMembers, TeamMember } from '@/data/team';
import { DetailHero } from '@/components/layout/DetailHero';

interface TeamDetailClientProps {
  member: TeamMember;
}

export function TeamDetailClient({ member }: TeamDetailClientProps) {
  const router = useRouter();
  const expertiseRef = useRef(null);
  const achievementsRef = useRef(null);
  const teamRef = useRef(null);
  const expertiseInView = useInView(expertiseRef, { once: true, margin: '-100px' });
  const achievementsInView = useInView(achievementsRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-white">
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
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                GitHub
              </a>
            )}
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Twitter
              </a>
            )}
            <button
              className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
              onClick={() => navigator.share?.({ title: `${member.name} - ToMoreBeyond`, url: window.location.href })}
            >
              <ShareIcon className="w-4 h-4 mr-2" />
              シェア
            </button>
          </>
        }
      />

      {/* Expertise Section */}
      <section ref={expertiseRef} className="py-24 lg:py-32 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={expertiseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">専門分野</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {member.name}の専門知識と技術領域
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {member.expertise.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 24 }}
                animate={expertiseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 hover:shadow-lg transition-all duration-200"
              >
                <span className="text-gray-900 font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achievementsRef} className="py-24 lg:py-32 bg-white">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={achievementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">実績・経験</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              これまでの主な実績と経験
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {member.achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 24 }}
                animate={achievementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex items-start gap-4 bg-gray-50 rounded-xl p-6"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Team Members */}
      <section ref={teamRef} className="py-24 lg:py-32 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">他のチームメンバー</h2>
            <p className="text-gray-600">
              ToMoreBeyondのチームメンバー
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {teamMembers
              .filter(m => m.id !== member.id)
              .map((otherMember, index) => (
                <motion.article
                  key={otherMember.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/team/${otherMember.id}`)}
                >
                  <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                    <div className="relative h-64 bg-gray-100 overflow-hidden">
                      <Image
                        src={otherMember.image}
                        alt={otherMember.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{otherMember.name}</h3>
                      <p className="text-gray-600 mb-3">{otherMember.position}</p>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{otherMember.bio}</p>
                      <div className="flex items-center text-gray-900 font-medium group-hover:text-gray-600 transition-colors">
                        <span className="text-sm">詳細を見る</span>
                        <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
