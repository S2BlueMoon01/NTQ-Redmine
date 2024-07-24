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
  removeBlock: (blockId: string) => void;
  addBlockToBoardSections: ({ boardId, block }: { boardId: string; block: Block }) => v;
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
    removeBlock: (blockId) => {
      set((state) => {
        Object.keys(state.boardSections).forEach((boardId) => {
          state.boardSections[boardId] = state.boardSections[boardId].filter((block) => block.id !== blockId);
        });
      });
    },
    addBlockToBoardSections: ({ boardId, block }: { boardId: string; block: Block }) => {
      set((state) => {
        state.boardSections[boardId] = [block, ...state.boardSections[boardId]];
      });
    },
  })),
);
