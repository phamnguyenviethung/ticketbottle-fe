export interface PagiantionData<T> {
  data: T[];
  total: number;
  currentPage: number;
  next: number | null;
  prev: number | null;
  lastPage: number;
  perPage: number;
}
