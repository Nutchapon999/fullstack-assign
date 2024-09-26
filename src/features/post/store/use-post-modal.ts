import { create } from "zustand";

export type PostModalType = "create" | "edit";

type PostModalData = {
  title?: string;
  description?: string;
  community?: "History" | "Food" | "Pets" | "Health" | "Fashion" | "Exercise" | "Others" | undefined;
}

type PostModalStore = {
  id?: string
  data: PostModalData
  type: PostModalType | null;
  isOpen: boolean;
  onOpen: (type: PostModalType, data: PostModalData, id?: string) => void;
  onClose: () => void;
}

export const usePostModal = create<PostModalStore>((set) => ({
  id: undefined,
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}, id?: string) => set({ isOpen: true, type, data, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));