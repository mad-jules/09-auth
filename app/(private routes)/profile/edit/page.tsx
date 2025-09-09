import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { getServerMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import EditProfileForm from './EditProfilePage.client';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const title = `NoteHub - ${user.username} profile`;
  const description = 'Manage your profile and account settings on NoteHub';

  return {
    title,
    description,
  };
}

export default async function EditProfilePage() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <EditProfileForm user={user} />
      </div>
    </main>
  );
}
