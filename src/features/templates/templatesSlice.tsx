import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Template } from "@/utils/types/template/template";

interface TemplatesState {
    templates: Template[];
}

const loadFromStorage = (): Template[] => {
    if (typeof window === "undefined") return [];
    try {
        return JSON.parse(localStorage.getItem("templates") || "[]");
    } catch {
        return [];
    }
};

const initialState: TemplatesState = {
    templates: loadFromStorage(),
};

const templatesSlice = createSlice({
    name: "templates",
    initialState,
    reducers: {
        addTemplate: (state, action: PayloadAction<Template>) => {
            state.templates.push(action.payload);
        },

        deleteTemplate: (state, action: PayloadAction<string>) => {
            state.templates = state.templates.filter(
                (t) => t.id !== action.payload
            );
        },

        duplicateTemplate: (state, action: PayloadAction<Template>) => {
            const copy = {
                ...action.payload,
                id: crypto.randomUUID(),
                name: action.payload.name + " Copy",
            };
            state.templates.push(copy);
        },

        updateTemplate: (state, action: PayloadAction<Template>) => {
            const index = state.templates.findIndex(
                (t) => t.id === action.payload.id
            );
            if (index !== -1) {
                state.templates[index] = action.payload;
            }
        },
    },
});

export const {
    addTemplate,
    deleteTemplate,
    duplicateTemplate,
    updateTemplate,
} = templatesSlice.actions;

export default templatesSlice.reducer;