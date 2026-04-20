import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "@/lib/UploadSlice";
import { baseApi } from "@/services/httpClient/baseApi";
import { persistedAuthReducer } from "@/store/persistConfig";

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        upload: uploadReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;