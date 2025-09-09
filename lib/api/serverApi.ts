'use server';
import { cookies } from 'next/headers';
import { NotesInstanceClient } from './api';
import { User } from '@/types/user';
import { Note, NoteTag } from '@/types/note';

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

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await NotesInstanceClient.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

interface ApiGetNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface fetchNoteProps {
  search?: string;
  tag?: NoteTag;
  page: number;
  perPage?: number;
  sortBy?: string;
}

export async function fetchNote({
  search,
  page,
  tag,
}: fetchNoteProps): Promise<ApiGetNotesResponse> {
  const response = await NotesInstanceClient.get<ApiGetNotesResponse>(
    '/notes',
    {
      params: {
        search,
        page,
        perPage: 12,
        tag,
      },
    },
  );
  return response.data;
}
