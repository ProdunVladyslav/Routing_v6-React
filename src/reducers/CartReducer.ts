import { getLoggedInUserId } from "../helpers/authHelper";

// --- Compute per-user localStorage key ---
function computeCartKey() {
  const userId = getLoggedInUserId();
  return userId ? `cart:${userId}` : "cart:guest";
}

// --- State Shape ---
export interface CartsState {
  goodIDsAddedToCart: string[];
}

// --- Action Types ---
export type CartsAction =
  | { type: "ADD_GOOD_TO_CART"; id: string }
  | { type: "DELETE_GOOD_FROM_CART"; id: string }
  | { type: "CLEAR_CART" };

// --- Helpers ---
function loadGoodIDs(): string[] {
  const data = localStorage.getItem(computeCartKey());
  try {
    return data ? (JSON.parse(data) as string[]) : [];
  } catch {
    return [];
  }
}

function saveGoodIDs(ids: string[]): void {
  localStorage.setItem(computeCartKey(), JSON.stringify(ids));
}

// --- Initial State ---
export const initialCartsState: CartsState = {
  goodIDsAddedToCart: loadGoodIDs(),
};

// --- Reducer ---
export function cartsReducer(
  state: CartsState,
  action: CartsAction
): CartsState {
   switch (action.type) {
    case "ADD_GOOD_TO_CART": {
      // remove if already exists, then re-add (so it stays unique)
      const updated = [
        ...state.goodIDsAddedToCart.filter((x) => x !== action.id),
        action.id,
      ];

      saveGoodIDs(updated);
      return { ...state, goodIDsAddedToCart: updated };
    }

    case "DELETE_GOOD_FROM_CART": {
      const updated = state.goodIDsAddedToCart.filter((x) => x !== action.id);
      saveGoodIDs(updated);
      return { ...state, goodIDsAddedToCart: updated };
    }

    case "CLEAR_CART": {
      localStorage.removeItem(computeCartKey());
      return { ...state, goodIDsAddedToCart: [] };
    }

    default:
      return state;
  }
}