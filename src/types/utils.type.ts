// export interface SuccessResponse<Data> {
//   // message: string;
//   data: Data;
// }

export interface ErrorResponse<Data> {
  message: string;
  data?: Data;
}

export type ListDataResponse<T, K extends string = "data"> = {
  [key in K]: T[];
} & {
  total_count: number;
  limit: number;
  offset: number;
};

// cú pháp `-?` sẽ loại bỏ undefiend của key optional

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export type Task = {
  id: string;
  title: string;
};

export type BoardSections = {
  [key: string]: Task[];
};
