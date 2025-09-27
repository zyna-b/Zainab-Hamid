import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { getPortfolioData, getBlogPosts, getSiteContent } from '@/lib/data-store';
import { AdminDashboard } from './dashboard';

export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Zainab Hamid',
  description: 'Manage portfolio content, AI experiments, services, and blog posts.',
};

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [portfolio, blogs, site] = await Promise.all([
    getPortfolioData(),
    getBlogPosts(),
    getSiteContent(),
  ]);

  return (
    <main className="container py-12">
      <AdminDashboard portfolio={portfolio} blogs={blogs} hero={site.hero} about={site.about} />
    </main>
  );
}
