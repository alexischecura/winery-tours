import { IToursResponse } from './types';

export const getTours = async () => {
  const res = await fetch('http://127.0.0.1:3000/api/v1/tours');
  const data = (await res.json()) as IToursResponse;
  return data;
};
