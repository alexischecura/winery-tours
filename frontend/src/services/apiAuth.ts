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
  VERIFICATION = `${API_AUTH_URL}/verification`,
  ME = `${API_AUTH_URL}/me`,
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
    headers: {
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

export const signUpUser = async (
  credentials: SingUpUser
): Promise<GenericResponse> => {
  return fetchApi<GenericResponse>(AuthUrls.SIGNUP, Methods.POST, credentials);
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginUserResponse> => {
  return fetchApi<LoginUserResponse>(AuthUrls.LOGIN, Methods.POST, {
    email,
    password,
  });
};

export const verificateUser = async (
  verificationCode: string
): Promise<GenericResponse> => {
  return fetchApi<GenericResponse>(
    `${AuthUrls.VERIFICATION}/${verificationCode}`,
    Methods.POST
  );
};

export const logoutUser = async (): Promise<GenericResponse> => {
  return fetchApi<GenericResponse>(AuthUrls.LOGOUT, Methods.POST);
};

export const getMe = async (): Promise<GenericResponse> => {
  return fetchApi<GenericResponse>(AuthUrls.ME, Methods.GET);
};
