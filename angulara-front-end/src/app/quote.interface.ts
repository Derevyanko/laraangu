export interface Quote {
  id: number;
  content: string;
  created_at: string;
  count_like: number;
  user: {
    id: number,
    name: string,
    email: string,
    created_at: string,
    updated_at: string
  };
  likes: {
    id: number,
    id_quote: number,
    id_user: number,
    likes: boolean,
    created_at: string,
    update_at: string
  }[];
}
