import { v4 as uuidv4 } from 'uuid';

const LOGGED_IN_KEY = "loggedInUserId";
const USERS_SET_KEY = "users";

function loadLoggedInUser(): User | null {
  const raw = localStorage.getItem(LOGGED_IN_KEY);
  return raw ? JSON.parse(raw) : null;
}

export const initialState = {
  users: JSON.parse(localStorage.getItem(USERS_SET_KEY) || "[]"),
  loggedInUser: loadLoggedInUser(),
  isLoggedInUserAdmin: loadLoggedInUser()?.isAdmin ?? false,
  message: ""
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type AuthState = {
  users: User[];
  loggedInUser: User | null;
  isLoggedInUserAdmin: boolean;
  message: string;
};

export type AuthAction =
  | { type: "REGISTER"; user: User }
  | { type: "LOGIN"; email: string, password: string }
  | { type: "LOGOUT" };


function saveUsers(users: User[]) {
  localStorage.setItem(USERS_SET_KEY, JSON.stringify(users));
}

function saveLoggedInUser(user: User) {
  localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(user));
}

function clearLoggedInUser(){
    localStorage.removeItem(LOGGED_IN_KEY);
}

export function authReducer(state : AuthState, action: AuthAction) {
  switch (action.type) {
    case "REGISTER": {
      const alreadyExistsUsername = state.users.some(
        (u : User) => u.username === action.user.username
      );

      const alreadyExistsEmail = state.users.some(
        (u : User) => u.email === action.user.email
      );

      if (alreadyExistsUsername || alreadyExistsEmail) {
        return { ...state, message: "Username or email already exists"};
      }

      const normalizedUser: User = {
        ...action.user,
        id: action.user.id || uuidv4(),
      };

      const updatedUsers = [...state.users, normalizedUser];

      saveUsers(updatedUsers)
      return { ...state, users: updatedUsers , message: "Successfully registered"};
    }
    
    case "LOGIN": {
        const loginUser = state.users.find(
            (u: User) => u.email === action.email
        );

        if (!loginUser) {
            return { ...state, message: "No such email found"};
        }

        if (loginUser.password !== action.password) {
            return { ...state, message: "Incorrect password"};
        }

        saveLoggedInUser(loginUser);

        const isAdmin = loginUser.isAdmin;

        return {
            ...state,
            loggedInUser: loginUser,
            isLoggedInUserAdmin: isAdmin,
            message: isAdmin
                ? "Successfully logged in as admin"
                : "Successfully logged in as user"
        };
    }

    case "LOGOUT": {
        clearLoggedInUser();

        return {...state, loggedInUser: null, isLoggedInUserAdmin: false, message: ""}
    }

    default:
      return state;
  }
}
