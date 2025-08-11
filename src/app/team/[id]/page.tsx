import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { teamMembers } from '@/data/team';
import Link from 'next/link';
import { TeamDetailClient } from './TeamDetailClient';

// Generate static params for all team members
export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    id: member.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function TeamMemberDetail({ params }: PageProps) {
  const member = teamMembers.find(m => m.id === params.id);

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

  return <TeamDetailClient member={member} />;
}