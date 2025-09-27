import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAdminSession } from '@/lib/auth';
import { LoginForm } from './login-form';

export const runtime = 'nodejs';

export const metadata: Metadata = {
  title: 'Admin Login | Zainab Hamid',
  description: 'Access the admin dashboard to update portfolio content and blogs.',
};

type AdminLoginPageProps = {
  searchParams?: Promise<{
    redirect?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const session = await getAdminSession();
  if (session) {
    redirect('/admin');
  }

  const resolvedParams = searchParams ? await searchParams : {};
  const redirectTo = typeof resolvedParams?.redirect === 'string' ? resolvedParams.redirect : undefined;

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Admin Access</CardTitle>
          <CardDescription>
            Sign in with your administrator credentials to manage portfolio content and blog posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={redirectTo} />
        </CardContent>
      </Card>
    </main>
  );
}
