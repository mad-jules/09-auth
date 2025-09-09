import { User } from '@/types/user';
import { NotesInstanceClient } from './api';
import { AxiosResponse } from 'axios';
import type { Note, NoteTag } from '@/types/note';

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

interface fetchNoteProps {
  search?: string;
  tag?: NoteTag;
  page: number;
  perPage?: number;
  sortBy?: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

interface ApiGetNotesResponse {
  notes: Note[];
  totalPages: number;
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

export async function createNote({
  title,
  content,
  tag,
}: CreateNotePayload): Promise<Note> {
  const response = await NotesInstanceClient.post<Note>('/notes', {
    title,
    content,
    tag,
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await NotesInstanceClient.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await NotesInstanceClient.get<Note>(`/notes/${id}`);
  return response.data;
}
