'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  EnvelopeIcon, 
  LinkIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { teamMembers } from '@/data/team';

export function TeamSection() {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  return (
    <>
      <section id="team" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-850 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 60%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-2 text-gray-900 dark:text-white mb-6">
              経験豊富な
              <span className="text-gradient"> チーム</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              多様な専門分野のエキスパートが集結し、革新的なソリューションを創造しています。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
                onClick={() => router.push(`/team/${member.id}`)}
              >
                <div className="card text-center overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Member Image */}
                  <div className="relative">
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    {/* Position Badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-1 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                          {member.positionEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="heading-4 text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {member.position}
                    </p>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {member.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.expertise.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                          +{member.expertise.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="flex justify-center space-x-2">
                      {member.social.github && (
                        <motion.a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LinkIcon className="w-5 h-5" />
                        </motion.a>
                      )}
                      {member.social.twitter && (
                        <motion.a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LinkIcon className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              私たちと一緒に働きませんか？
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}
              className="btn-secondary px-8 py-3 text-lg font-semibold"
            >
              採用情報を見る
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Member Detail Modal */}
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500" />
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 text-white hover:text-white/80 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              {/* Profile Image */}
              <div className="absolute -bottom-12 left-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="pt-16 p-4 sm:p-8">
              <div className="mb-6">
                <h3 className="heading-3 text-gray-900 dark:text-white mb-2">
                  {selectedMember.name}
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <BuildingOfficeIcon className="w-5 h-5 text-primary-600" />
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    {selectedMember.position}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({selectedMember.positionEn})
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {selectedMember.bio}
              </p>

              {/* Expertise */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <AcademicCapIcon className="w-5 h-5 text-primary-600 mr-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    専門分野
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedMember.expertise.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <TrophyIcon className="w-5 h-5 text-primary-600 mr-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    実績・経験
                  </h4>
                </div>
                <ul className="space-y-2">
                  {selectedMember.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {selectedMember.social.github && (
                  <motion.a
                    href={selectedMember.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    GitHub
                  </motion.a>
                )}
                {selectedMember.social.twitter && (
                  <motion.a
                    href={selectedMember.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Twitter
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}