import { User } from '@/types/user';
import { NotesInstanceClient } from './api';
import { AxiosResponse } from 'axios';

interface SignUpProps {
  email: string;
  password: string;
}

export async function SignUp({ email, password }: SignUpProps): Promise<User> {
  const res = await NotesInstanceClient.post<User>('/auth/register', {
    email,
    password,
  });

  return res.data;
}

export async function SignIn({ email, password }: SignUpProps): Promise<User> {
  const res = await NotesInstanceClient.post<User>('/auth/login', {
    email,
    password,
  });
  return res.data;
}

export async function checkSession(): Promise<{ success: boolean }> {
  const res = await NotesInstanceClient.get('/auth/session');

  return res.data;
}

export async function getMe(): Promise<User> {
  const user = await NotesInstanceClient.get('/users/me');
  return user.data;
}

interface EditMeProps {
  username: string;
  email?: string;
}

export async function editMe(
  body: EditMeProps,
): Promise<AxiosResponse<User, unknown>> {
  const user = await NotesInstanceClient.patch<User>('/users/me', body);
  return user;
}

export const logout = async (): Promise<boolean> => {
  const res = await NotesInstanceClient.post('/auth/logout');

  return res.status === 200;
};
