// Category Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_CATEGORIES, GET_CATEGORY } from '../../graphql/queries';
import { ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../../graphql/mutations';
import { Category, CategoryInput, UpdateCategoryInput } from '../../types';

interface CategoryState {
    categories: Category[];
    selectedCategory: Category | null;
    loading: boolean;
    error: string | null;
    fetchCategories: (departmentId?: number, skip?: number, take?: number) => Promise<void>;
    fetchCategory: (id: string) => Promise<void>;
    addCategory: (input: CategoryInput) => Promise<Category | null>;
    updateCategory: (id: string, input: UpdateCategoryInput) => Promise<Category | null>;
    deleteCategory: (id: string) => Promise<boolean>;
    setSelectedCategory: (category: Category | null) => void;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,

    fetchCategories: async (departmentId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_CATEGORIES,
                variables: { departmentId, skip, take },
            });
            set({ categories: data.categories, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchCategory: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_CATEGORY,
                variables: { id },
            });
            set({ selectedCategory: data.category, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addCategory: async (input: CategoryInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_CATEGORY,
                variables: { input },
            });
            await get().fetchCategories();
            set({ loading: false });
            return data.addCategory;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateCategory: async (id: string, input: UpdateCategoryInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_CATEGORY,
                variables: { id, input },
            });
            await get().fetchCategories();
            set({ loading: false });
            return data.updateCategory;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteCategory: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_CATEGORY,
                variables: { id },
            });
            await get().fetchCategories();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
