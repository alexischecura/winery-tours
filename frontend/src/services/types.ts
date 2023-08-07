export interface SingUpUser {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ErrorForm {
  field: string;
  message: string;
}

export interface SingUpError extends GenericResponse {
  code: string;
  description: string;
  errors: ErrorForm[];
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  status: string;
  access_token: string;
}

export interface ErrorResponse {
  status: string;
  code: string;
  message: string;
  description: string;
}

export interface Winery {
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

export interface WineriesResponse {
  status: string;
  data: Winery[];
}

export interface Tour {
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

export interface ToursResponse {
  status: string;
  data: Tour[];
}
