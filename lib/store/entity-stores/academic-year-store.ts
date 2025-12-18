// Academic Year Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_ACADEMIC_YEARS, GET_ACADEMIC_YEAR } from '../../graphql/queries';
import { ADD_ACADEMIC_YEAR, UPDATE_ACADEMIC_YEAR, DELETE_ACADEMIC_YEAR } from '../../graphql/mutations';
import { AcademicYear, AcademicYearInput, UpdateAcademicYearInput } from '../../types';

interface AcademicYearState {
    academicYears: AcademicYear[];
    selectedAcademicYear: AcademicYear | null;
    loading: boolean;
    error: string | null;
    fetchAcademicYears: (branchId?: number, skip?: number, take?: number) => Promise<void>;
    fetchAcademicYear: (id: string) => Promise<void>;
    addAcademicYear: (input: AcademicYearInput) => Promise<AcademicYear | null>;
    updateAcademicYear: (id: string, input: UpdateAcademicYearInput) => Promise<AcademicYear | null>;
    deleteAcademicYear: (id: string) => Promise<boolean>;
    setSelectedAcademicYear: (academicYear: AcademicYear | null) => void;
}

export const useAcademicYearStore = create<AcademicYearState>((set, get) => ({
    academicYears: [],
    selectedAcademicYear: null,
    loading: false,
    error: null,

    fetchAcademicYears: async (branchId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_ACADEMIC_YEARS,
                variables: { branchId, skip, take },
            });
            set({ academicYears: data.academicYears, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchAcademicYear: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_ACADEMIC_YEAR,
                variables: { id },
            });
            set({ selectedAcademicYear: data.academicYear, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addAcademicYear: async (input: AcademicYearInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_ACADEMIC_YEAR,
                variables: { input },
            });
            await get().fetchAcademicYears();
            set({ loading: false });
            return data.addAcademicYear;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateAcademicYear: async (id: string, input: UpdateAcademicYearInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_ACADEMIC_YEAR,
                variables: { id, input },
            });
            await get().fetchAcademicYears();
            set({ loading: false });
            return data.updateAcademicYear;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteAcademicYear: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_ACADEMIC_YEAR,
                variables: { id },
            });
            await get().fetchAcademicYears();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedAcademicYear: (academicYear) => set({ selectedAcademicYear: academicYear }),
}));
