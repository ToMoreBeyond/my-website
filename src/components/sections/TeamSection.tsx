'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { teamMembers } from '@/data/team';

export function TeamSection() {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="py-24 lg:py-32 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            チーム
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            多様な視点で面白さを育てる
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => router.push(`/team/${member.id}`)}
            >
              <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                {/* Member Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name & Position */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {member.position}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {member.positionEn}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.expertise.length > 3 && (
                      <span className="px-2.5 py-1 text-xs text-gray-400">
                        +{member.expertise.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action */}
                  <div className="flex items-center text-gray-900 font-medium group-hover:text-gray-600 transition-colors">
                    <span className="text-sm">詳細を見る</span>
                    <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16 lg:mt-20"
        >
          <p className="text-gray-600 mb-6">
            私たちと一緒に働きませんか？
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
          >
            採用情報を見る
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
