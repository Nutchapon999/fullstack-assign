import { create } from "zustand";

type SearchStore = {
  search: string;
  onSearch: (search: string) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  search: "",
  onSearch: (search) => set({ search }),
}));