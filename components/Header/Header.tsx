'use client';

import css from '@/components/Header/Header.module.css';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function Header() {
  const { isAuthenticated } = useAuthStore();
  return (
    <>
      <header className={css.header}>
        <Link href="/" aria-label="Home">
          NoteHub
        </Link>
        <nav aria-label="Main Navigation">
          <div className={css.navigation}>
            {isAuthenticated && <TagsMenu />}
            <ul className={css.navigation}>
              <AuthNavigation />
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
