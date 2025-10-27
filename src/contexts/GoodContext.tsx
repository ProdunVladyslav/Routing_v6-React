import React, { createContext, useReducer, useContext } from "react";
import { goodsReducer, initialState } from "../reducers/GoodReduser";
import type { GoodsState, GoodsAction } from "../reducers/GoodReduser";

type GoodsContextType = {
  state: GoodsState;
  dispatch: React.Dispatch<GoodsAction>;
};

const GoodsContext = createContext<GoodsContextType | undefined>(undefined);

export function GoodsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(goodsReducer, initialState);

  return (
    <GoodsContext.Provider value={{ state, dispatch }}>
      {children}
    </GoodsContext.Provider>
  );
}

export function useGoods() {
  const ctx = useContext(GoodsContext);
  if (!ctx) {
    throw new Error("useGoods must be used inside <GoodsProvider>");
  }
  return ctx;
}
