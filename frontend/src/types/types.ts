export interface GenericResponse {
  status: string;
  message: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export interface FormError {
  status: string;
  message: string;
  code: string;
  description: string;
  errors: FieldError[];
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
