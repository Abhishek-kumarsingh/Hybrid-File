import ResetPasswordForm from '@/components/ResetPasswordForm';
export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <ResetPasswordForm />
    </div>
  );
}