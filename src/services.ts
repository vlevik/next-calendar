import { AuthPayload } from './types/auth';
import { Event, NewEvent } from './types/events';
import { User } from './types/user';
import { LOGIN_ROUTE } from './constants/routes';

const fetchWithErrorHandling = async <T>(url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (res.redirected) {
      window.location.href = res.url;
      throw new Error('Redirected');
    }

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error);
    }

    if (json.error) {
      throw new Error(json.error);
    }

    return json as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const authFetch = async <T>(url: string, options?: RequestInit) => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = LOGIN_ROUTE;
  }

  const res = await fetchWithErrorHandling<T>(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const getEventsByUser = async (id: string) => {
  const res = await authFetch<Event[]>(`api/users/${id}/events`, {
    method: 'GET',
  });

  return res;
};

export const deleteEvent = async (userId: string, event: Event) => {
  const res = await authFetch<Event[]>(`api/users/${userId}/events`, {
    method: 'DELETE',
    body: JSON.stringify(event),
  });

  return res;
};

export const createNewEvent = async (userId: string, event: NewEvent) => {
  const res = await authFetch<{ user: User }>(`api/users/${userId}/events`, {
    method: 'POST',
    body: JSON.stringify(event),
  });

  return res;
};

export const loginUser = async (values: AuthPayload) => {
  const res = await fetchWithErrorHandling<{ accessToken: string; user: User }>(`api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  return res;
};

export const registerUser = async (values: AuthPayload) => {
  const res = await fetchWithErrorHandling<{ _id: string }>(`api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  return res;
};
