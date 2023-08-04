import { ILogin, ILoginResponse } from './types';

export const loginUser = async (credetials: ILogin) => {
  console.log(credetials);
  const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credetials),
  });
  const data = (await res.json()) as ILoginResponse;
  return data;
};
