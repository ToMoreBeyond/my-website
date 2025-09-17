import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { teamMembers } from '@/data/team';
import Link from 'next/link';
import { TeamDetailClient } from './TeamDetailClient';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { teamBreadcrumbs } from '@/lib/breadcrumbs';

// Generate static params for all team members
export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    id: member.id,
  }));
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TeamMemberDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const member = teamMembers.find(m => m.id === resolvedParams.id);

  if (!member) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-semibold text-neutral-900 mb-4">メンバーが見つかりません</h1>
          <p className="text-neutral-600 mb-8">指定されたチームメンバーは存在しません。</p>
          <Link 
            href="/#team"
            className="inline-flex items-center px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            チーム一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DetailLayout
      breadcrumbs={teamBreadcrumbs(member.name)}
      cta={{
        title: '私たちと一緒に働きませんか？',
        description: 'ToMoreBeyondでは、共に革新的なプロダクトを作り上げる仲間を募集しています',
        buttonLabel: '採用について問い合わせる',
        buttonHref: '/#contact',
      }}
    >
      <TeamDetailClient member={member} />
    </DetailLayout>
  );
}
