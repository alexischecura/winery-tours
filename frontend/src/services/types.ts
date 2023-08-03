export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  natinalId: string;
  role: string;
  photo: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IWinery {
  id: string;
  name: string;
  description: string;
  imageCover: string;
  images?: string[] | null;
  address: string;
  coordinates?: number[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface IWineriesResponse {
  status: string;
  data: IWinery[];
}

export interface ITour {
  id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount: number;
  summary: string;
  description: string;
  location?: null;
  imageCover: string;
  startDates?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface IToursResponse {
  status: string;
  data: ITour[];
}
