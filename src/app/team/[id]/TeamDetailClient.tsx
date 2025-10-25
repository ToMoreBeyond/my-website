'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  AcademicCapIcon,
  TrophyIcon,
  LinkIcon,
  UserIcon,
  ShareIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { teamMembers, TeamMember } from '@/data/team';
import { DetailHero } from '@/components/layout/DetailHero';

interface TeamDetailClientProps {
  member: TeamMember;
}

export function TeamDetailClient({ member }: TeamDetailClientProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

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
              <motion.a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-olive-600 dark:bg-olive-700 text-white rounded-lg hover:bg-olive-700 dark:hover:bg-olive-600 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                GitHub
              </motion.a>
            )}
            {member.social?.twitter && (
              <motion.a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-olive-600 dark:bg-olive-700 text-white rounded-lg hover:bg-olive-700 dark:hover:bg-olive-600 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Twitter
              </motion.a>
            )}
            <motion.button
              className="flex items-center px-4 py-2 border border-neutral-300 dark:border-gray-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:border-neutral-400 dark:hover:border-gray-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigator.share?.({ title: `${member.name} - ToMoreBeyond`, url: window.location.href })}
            >
              <ShareIcon className="w-4 h-4 mr-2" />
              シェア
            </motion.button>
          </>
        }
      />

      {/* Expertise Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <AcademicCapIcon className="w-12 h-12 text-olive-700 dark:text-olive-400 mx-auto mb-4" />
            <h2 className="text-4xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-6">専門分野</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              {member.name}の専門知識と技術領域
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {member.expertise.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-neutral-200 dark:border-gray-700 rounded-xl p-6 text-center hover:border-olive-600/40 dark:hover:border-olive-500/40 transition-all duration-300"
              >
                <SparklesIcon className="w-8 h-8 text-olive-700 dark:text-olive-400 mx-auto mb-3" />
                <span className="text-neutral-900 dark:text-neutral-100 font-semibold">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TrophyIcon className="w-12 h-12 text-olive-700 dark:text-olive-400 mx-auto mb-4" />
            <h2 className="text-4xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-6">実績・経験</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              これまでの主な実績と経験をご紹介します
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {member.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-start space-x-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-neutral-200 dark:border-gray-700 rounded-xl p-6 hover:border-olive-600/40 dark:hover:border-olive-500/40 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-olive-600 dark:bg-olive-400 rounded-full mt-3 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Team Members */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <UserIcon className="w-12 h-12 text-olive-700 dark:text-olive-400 mx-auto mb-4" />
            <h2 className="text-4xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-6">他のチームメンバー</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              ToMoreBeyondの優秀なチームメンバーをご紹介します
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {teamMembers
              .filter(m => m.id !== member.id)
              .map((otherMember, index) => (
                <motion.div
                  key={otherMember.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-neutral-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-olive-600/40 dark:hover:border-olive-500/40 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/team/${otherMember.id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={otherMember.image}
                      alt={otherMember.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">{otherMember.name}</h3>
                    <p className="text-olive-700 dark:text-olive-400 font-medium mb-3">{otherMember.position}</p>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-3">{otherMember.bio}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA moved to DetailLayout */}
    </div>
  );
}
