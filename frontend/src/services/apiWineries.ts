import { WineriesResponse } from '../types/types';

export const getWineries = async () => {
  const res = await fetch('http://127.0.0.1:3000/api/v1/wineries');
  const data = (await res.json()) as WineriesResponse;
  return data;
};
