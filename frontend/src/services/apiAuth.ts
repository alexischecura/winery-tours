import { GenericResponse, ErrorResponse } from '../types/types';
import {
  LoginUserResponse,
  SignUpUserResponse,
  SingUpUserType,
  UserResponse,
} from '../types/userTypes';

const API_AUTH_URL = 'http://localhost:3000/api/v1/users';

enum AuthUrls {
  SIGNUP = `${API_AUTH_URL}/signup`,
  LOGIN = `${API_AUTH_URL}/login`,
  LOGOUT = `${API_AUTH_URL}/logout`,
  VERIFICATION = `${API_AUTH_URL}/verification`,
  CURRENT_USER = `${API_AUTH_URL}/me`,
}

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

async function fetchApi<T>(
  url: string,
  method: Methods,
  body?: object
): Promise<T> {
  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    return (await res.json()) as T;
  } else {
    const data = (await res.json()) as ErrorResponse;
    throw data;
  }
}

export const signUpUser = async (credentials: SingUpUserType) => {
  return await fetchApi<SignUpUserResponse>(
    AuthUrls.SIGNUP,
    Methods.POST,
    credentials
  );
};

export const loginUser = async (email: string, password: string) => {
  return await fetchApi<LoginUserResponse>(AuthUrls.LOGIN, Methods.POST, {
    email,
    password,
  });
};

export const verifyUser = async (verificationCode: string) => {
  return await fetchApi<GenericResponse>(
    `${AuthUrls.VERIFICATION}/${verificationCode}`,
    Methods.GET
  );
};

export const logoutUser = async () => {
  return await fetchApi<GenericResponse>(AuthUrls.LOGOUT, Methods.POST);
};

export const getCurrentUser = async () => {
  const res = await fetchApi<UserResponse>(AuthUrls.CURRENT_USER, Methods.GET);
  return res;
};
