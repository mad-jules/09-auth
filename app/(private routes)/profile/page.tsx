import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const title = `NoteHub - ${user.username} profile`;
  const description = 'Manage your profile and account settings on NoteHub';

  return {
    title,
    description,
  };
}

export default async function Profile() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user ? user.avatar : ''}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        {user && (
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </main>
  );
}
