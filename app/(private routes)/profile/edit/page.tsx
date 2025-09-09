import css from './EditProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';
import EditProfileForm from './EditProfileForm.client';

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
