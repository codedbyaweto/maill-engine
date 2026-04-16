import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "@/features/auth/authSlice";

const authPersistConfig = {
    key: "auth",
    storage,
};

export const persistedAuthReducer = persistReducer(
    authPersistConfig,
    authReducer
);