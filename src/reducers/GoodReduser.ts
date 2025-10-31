// Define the localStorage key
const KEY = "goods";

// Type for a single good
export type Good = {
  id: string;
  name: string;
  price: number;
  currency: string; 
  description?: string;
  image_url?: string;
};

// The shape of our reducer state
export interface GoodsState {
  goods: Good[];
  editingGoodIndex: string | null;
}

// Define action types as a discriminated union
export type GoodsAction =
  | { type: "ADD_GOOD"; good: Good }
  | { type: "EDIT_GOOD"; index: string }
  | { type: "UPDATE_GOOD"; updatedGood: Good }
  | { type: "DELETE_GOOD"; index: string };

// Safely load from localStorage
function loadGoods(): Good[] {
  const data = localStorage.getItem(KEY);
  try {
    return data ? (JSON.parse(data) as Good[]) : [];
  } catch {
    return [];
  }
}

// Initial state
export const initialState: GoodsState = {
  goods: loadGoods(),
  editingGoodIndex: null,
};

// Reducer function
export function goodsReducer(
  state: GoodsState,
  action: GoodsAction
): GoodsState {
  switch (action.type) {
    case "ADD_GOOD": {
      const updatedGoods = [...state.goods, action.good];
      localStorage.setItem(KEY, JSON.stringify(updatedGoods));
      return { ...state, goods: updatedGoods };
    }

    case "EDIT_GOOD": {
      return { ...state, editingGoodIndex: action.index };
    }

    case "UPDATE_GOOD": {
      if (state.editingGoodIndex === null) return state; // guard
      const goodsCopy = [...state.goods];
      const index = goodsCopy.findIndex(x => x.id === action.updatedGood.id);
      if (index !== -1) {
        goodsCopy[index] = action.updatedGood;
      }
      localStorage.setItem(KEY, JSON.stringify(goodsCopy));
      return { goods: goodsCopy, editingGoodIndex: null };
    }

    case "DELETE_GOOD": {
      const filteredGoods = state.goods.filter(
        (x) => x.id !== action.index
      );
      localStorage.setItem(KEY, JSON.stringify(filteredGoods));
      return { ...state, goods: filteredGoods };
    }

    default:
      return state;
  }
}
