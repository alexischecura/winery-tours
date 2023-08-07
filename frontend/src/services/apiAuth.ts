import {
  SingUpUser,
  LoginUserResponse,
  GenericResponse,
  ErrorResponse,
} from './types';

const API_AUTH_URL = 'http://127.0.0.1:3000/api/v1/users';

enum AuthUrls {
  SIGNUP = `${API_AUTH_URL}/signup`,
  LOGIN = `${API_AUTH_URL}/login`,
  LOGOUT = `${API_AUTH_URL}/logout`,
}

export const signUpUser = async (
  credetials: SingUpUser
): Promise<GenericResponse> => {
  const res = await fetch(AuthUrls.SIGNUP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credetials),
  });
  if (res.ok) {
    return (await res.json()) as GenericResponse;
  } else {
    const data = (await res.json()) as ErrorResponse;
    throw data;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginUserResponse> => {
  const res = await fetch(AuthUrls.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.ok) {
    return (await res.json()) as LoginUserResponse;
  } else {
    const data = (await res.json()) as ErrorResponse;
    throw data;
  }
};

export const logoutUser = async () => {
  const res = await fetch(AuthUrls.LOGOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return (await res.json()) as GenericResponse;
  } else {
    const data = (await res.json()) as ErrorResponse;
    throw data;
  }
};
