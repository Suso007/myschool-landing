// Class Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_CLASSES, GET_CLASS } from '../../graphql/queries';
import { ADD_CLASS, UPDATE_CLASS, DELETE_CLASS } from '../../graphql/mutations';
import { Class, ClassInput, UpdateClassInput } from '../../types';

interface ClassState {
    classes: Class[];
    selectedClass: Class | null;
    loading: boolean;
    error: string | null;
    fetchClasses: (branchId?: number, academicYearId?: number, skip?: number, take?: number) => Promise<void>;
    fetchClass: (id: string) => Promise<void>;
    addClass: (input: ClassInput) => Promise<Class | null>;
    updateClass: (id: string, input: UpdateClassInput) => Promise<Class | null>;
    deleteClass: (id: string) => Promise<boolean>;
    setSelectedClass: (classEntity: Class | null) => void;
}

export const useClassStore = create<ClassState>((set, get) => ({
    classes: [],
    selectedClass: null,
    loading: false,
    error: null,

    fetchClasses: async (branchId, academicYearId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_CLASSES,
                variables: { branchId, academicYearId, skip, take },
            });
            set({ classes: data.classes, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchClass: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_CLASS,
                variables: { id },
            });
            set({ selectedClass: data.class, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addClass: async (input: ClassInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_CLASS,
                variables: { input },
            });
            await get().fetchClasses();
            set({ loading: false });
            return data.addClass;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateClass: async (id: string, input: UpdateClassInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_CLASS,
                variables: { id, input },
            });
            await get().fetchClasses();
            set({ loading: false });
            return data.updateClass;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteClass: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_CLASS,
                variables: { id },
            });
            await get().fetchClasses();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedClass: (classEntity) => set({ selectedClass: classEntity }),
}));
