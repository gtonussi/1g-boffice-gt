import type { User } from "./user";

export type UserResponse = {
  data: User[];
  page: number;
  per_page: number;
  support: {
    url: string;
    text: string;
  };
  total_pages: number;
  total: number;
};
