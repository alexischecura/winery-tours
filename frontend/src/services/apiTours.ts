import { ToursResponse } from '../types/types';

export const getTours = async () => {
  const res = await fetch('http://localhost:3000/api/v1/tours');
  const data = (await res.json()) as ToursResponse;
  return data;
};
