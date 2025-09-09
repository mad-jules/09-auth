import { cookies } from 'next/headers';
import { NotesInstanceClient } from './api';
import { User } from '@/types/user';

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await NotesInstanceClient.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });

  return res;
}
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await NotesInstanceClient.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
