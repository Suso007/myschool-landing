// Department Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_DEPARTMENTS, GET_DEPARTMENT } from '../../graphql/queries';
import { ADD_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT } from '../../graphql/mutations';
import { Department, DepartmentInput, UpdateDepartmentInput } from '../../types';

interface DepartmentState {
    departments: Department[];
    selectedDepartment: Department | null;
    loading: boolean;
    error: string | null;
    fetchDepartments: (branchId?: number, skip?: number, take?: number) => Promise<void>;
    fetchDepartment: (id: string) => Promise<void>;
    addDepartment: (input: DepartmentInput) => Promise<Department | null>;
    updateDepartment: (id: string, input: UpdateDepartmentInput) => Promise<Department | null>;
    deleteDepartment: (id: string) => Promise<boolean>;
    setSelectedDepartment: (department: Department | null) => void;
}

export const useDepartmentStore = create<DepartmentState>((set, get) => ({
    departments: [],
    selectedDepartment: null,
    loading: false,
    error: null,

    fetchDepartments: async (branchId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_DEPARTMENTS,
                variables: { branchId, skip, take },
            });
            set({ departments: data.departments, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchDepartment: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_DEPARTMENT,
                variables: { id },
            });
            set({ selectedDepartment: data.department, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addDepartment: async (input: DepartmentInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_DEPARTMENT,
                variables: { input },
            });
            await get().fetchDepartments();
            set({ loading: false });
            return data.addDepartment;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateDepartment: async (id: string, input: UpdateDepartmentInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_DEPARTMENT,
                variables: { id, input },
            });
            await get().fetchDepartments();
            set({ loading: false });
            return data.updateDepartment;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteDepartment: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_DEPARTMENT,
                variables: { id },
            });
            await get().fetchDepartments();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedDepartment: (department) => set({ selectedDepartment: department }),
}));
