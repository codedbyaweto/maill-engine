// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "@/features/auth/authSlice";
// import uploadReducer from "@/lib/UploadSlice";
// import templateReducer from "@/features/templates/templatesSlice";
// import { baseApi } from "@/services/httpClient/baseApi";
//
// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         upload: uploadReducer,
//         templates: templateReducer,
//         [baseApi.reducerPath]: baseApi.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware().concat(baseApi.middleware),
// });
//
// store.subscribe(() => {
//     const state = store.getState();
//     localStorage.setItem(
//         "templates",
//         JSON.stringify(state.templates.templates)
//     );
// });
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

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