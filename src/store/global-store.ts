import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BoardSections, Block } from "~/types/utils.type";

type State = {
  isEditMyPage: boolean;
  boardSections: BoardSections;
};

type Actions = {
  setIsEditMyPage: (data: boolean) => void;
  setBoardSections: (data: BoardSections) => void;
  removeBlock: (boardId: string, blockId?: string) => void;
};

export const useGlobalStore = create<State & Actions>()(
  immer((set) => ({
    isEditMyPage: false,
    setIsEditMyPage: (data) => {
      set((state) => {
        state.isEditMyPage = data;
      });
    },
    boardSections: {},
    setBoardSections: (boardSections) => {
      set((state) => {
        state.boardSections = boardSections;
      });
    },
    removeBlock: (boardId, blockId) => {
      set((state) => {
        state.boardSections[boardId] = state.boardSections[boardId].filter((block: Block) => block.id !== blockId);
      });
    },
  })),
);
