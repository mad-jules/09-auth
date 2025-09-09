'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { User } from '@/types/user';
import { ChangeEvent, FormEvent, useState } from 'react';
import { editMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface EditProfileFormProps {
  user: User;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [formValues, setFormValues] = useState({
    username: user.username,
  });

  const { setUser } = useAuthStore();
  const router = useRouter();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!formValues.username.length) {
        toast.error("username can't be empty");
        return;
      }
      const updatedUser = await editMe({ username: formValues.username });
      if (updatedUser) {
        setUser(updatedUser);
        toast.success(`${updatedUser.username} changed succesfully`);
        router.replace('/profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Image
        src={user ? user.avatar : ''}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />

      <form onSubmit={handleSubmit} className={css.profileInfo}>
        <div className={css.usernameWrapper}>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleOnChange}
            value={formValues.username}
            id="username"
            name="username"
            type="text"
            className={css.input}
          />
        </div>

        <p>Email: {user.email}</p>

        <div className={css.actions}>
          <button type="submit" className={css.saveButton}>
            Save
          </button>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
