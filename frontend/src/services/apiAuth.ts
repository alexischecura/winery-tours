import {
  SingUpUser,
  LoginUserResponse,
  GenericResponse,
  ErrorResponse,
} from './types';

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginUserResponse> => {
  const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
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

export const signUpUser = async (
  credetials: SingUpUser
): Promise<GenericResponse> => {
  const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credetials),
  });
  return (await res.json()) as GenericResponse;
};
