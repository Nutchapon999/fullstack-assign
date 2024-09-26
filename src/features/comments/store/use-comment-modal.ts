import { create } from "zustand";

type CommentModalStore = {
  isOpen: boolean;
  comment: string;
  onOpen: () => void;
  onClose: () => void;
  onComment: (comment: string) => void;
}

export const useCommentModal = create<CommentModalStore>((set) => ({
  comment: "",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onComment: (comment: string) => set({ comment }),
}));