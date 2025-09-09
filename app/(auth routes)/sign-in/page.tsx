'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import css from './SignInPage.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { SignIn } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';

const initialState = { email: '', password: '' };

export default function SignInPage() {
  const [formValues, setFormValues] = useState(initialState);
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handlerOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      setError(null);
      e.preventDefault();

      const userData = await SignIn(formValues);

      if (userData) {
        setUser(userData);
        router.replace('/profile');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.response?.validation?.body?.message ||
            error.response?.data?.response?.message ||
            "User doesn't exist",
        );
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form onSubmit={handlerOnSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleOnChange}
            value={formValues.email}
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleOnChange}
            value={formValues.password}
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
