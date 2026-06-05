import { ArrowLeft } from 'lucide-react';
import { teamMembers } from '@/data/team';
import Link from 'next/link';
import { TeamDetailClient } from './TeamDetailClient';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { teamBreadcrumbs } from '@/lib/breadcrumbs';
import { Button } from '@/components/ui/button';

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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">メンバーが見つかりません</h1>
          <p className="mb-8 text-muted-foreground">指定されたチームメンバーは存在しません。</p>
          <Button asChild size="lg">
            <Link href="/#team">
              <ArrowLeft data-icon="inline-start" />
              チーム一覧に戻る
            </Link>
          </Button>
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
