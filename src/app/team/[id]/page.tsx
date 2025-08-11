'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  BuildingOfficeIcon,
  AcademicCapIcon,
  TrophyIcon,
  LinkIcon,
  UserIcon,
  ShareIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { teamMembers, TeamMember } from '@/data/team';
import { clsx } from 'clsx';

interface PageProps {
  params: {
    id: string;
  };
}

export default function TeamMemberDetail({ params }: PageProps) {
  const router = useRouter();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  
  const [member, setMember] = useState<TeamMember | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const foundMember = teamMembers.find(m => m.id === params.id);
    setMember(foundMember || null);
  }, [params.id]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">メンバーが見つかりません</h1>
          <p className="text-gray-400 mb-8">指定されたチームメンバーは存在しません。</p>
          <Link 
            href="/#team"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            チーム一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/#team"
              className="flex items-center space-x-3 text-white hover:text-primary-400 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">チーム一覧に戻る</span>
            </Link>
            
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">ToMoreBeyond</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Member Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800 max-w-md mx-auto">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500/20 rounded-full backdrop-blur-sm"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary-500/20 rounded-full backdrop-blur-sm"
                animate={{
                  rotate: -360,
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              {/* Name & Position */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-6"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {member.name}
                </h1>
                <p className="text-xl text-gray-400 mb-2">{member.nameEn}</p>
                
                <div className="flex items-center space-x-2 text-primary-400">
                  <BuildingOfficeIcon className="w-5 h-5" />
                  <span className="font-semibold">{member.position}</span>
                  <span className="text-gray-500">({member.positionEn})</span>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {member.bio}
              </motion.p>

              {/* Social Links */}
              <motion.div 
                className="flex space-x-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {member.social.github && (
                  <motion.a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    GitHub
                  </motion.a>
                )}
                
                {member.social.twitter && (
                  <motion.a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Twitter
                  </motion.a>
                )}
                
                <motion.button
                  className="flex items-center px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigator.share?.({ title: `${member.name} - ToMoreBeyond`, url: window.location.href })}
                >
                  <ShareIcon className="w-4 h-4 mr-2" />
                  シェア
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <AcademicCapIcon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-6">専門分野</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 text-center hover:border-primary-500/50 transition-all duration-300"
              >
                <SparklesIcon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <span className="text-white font-semibold">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <TrophyIcon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-6">実績・経験</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                  className="flex items-start space-x-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-primary-400 rounded-full mt-3 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-300 text-lg leading-relaxed">{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Team Members */}
      <section className="py-20 bg-gray-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <UserIcon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-6">他のチームメンバー</h2>
            <p className="text-xl text-gray-300">
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
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/team/${otherMember.id}`)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={otherMember.image}
                      alt={otherMember.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{otherMember.name}</h3>
                    <p className="text-primary-400 font-medium mb-3">{otherMember.position}</p>
                    <p className="text-gray-300 text-sm line-clamp-3">{otherMember.bio}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-secondary-900/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              私たちと一緒に働きませんか？
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              ToMoreBeyondでは、共に革新的なプロダクトを作り上げる仲間を募集しています
            </p>
            <motion.button
              onClick={() => router.push('/#contact')}
              className="inline-flex items-center px-12 py-4 bg-primary-600 text-white rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              採用について問い合わせる
              <ArrowLeftIcon className="ml-2 w-5 h-5 rotate-180" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container-custom text-center">
          <p className="text-gray-400 mb-4">
            &copy; 2024 ToMoreBeyond Inc. All rights reserved.
          </p>
          <Link 
            href="/"
            className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
          >
            トップページに戻る
          </Link>
        </div>
      </footer>
    </div>
  );
}