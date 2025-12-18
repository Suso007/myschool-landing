// Subject Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_SUBJECTS, GET_SUBJECT } from '../../graphql/queries';
import { ADD_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT } from '../../graphql/mutations';
import { Subject, SubjectInput, UpdateSubjectInput } from '../../types';

interface SubjectState {
    subjects: Subject[];
    selectedSubject: Subject | null;
    loading: boolean;
    error: string | null;
    fetchSubjects: (departmentId?: number, skip?: number, take?: number) => Promise<void>;
    fetchSubject: (id: string) => Promise<void>;
    addSubject: (input: SubjectInput) => Promise<Subject | null>;
    updateSubject: (id: string, input: UpdateSubjectInput) => Promise<Subject | null>;
    deleteSubject: (id: string) => Promise<boolean>;
    setSelectedSubject: (subject: Subject | null) => void;
}

export const useSubjectStore = create<SubjectState>((set, get) => ({
    subjects: [],
    selectedSubject: null,
    loading: false,
    error: null,

    fetchSubjects: async (departmentId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_SUBJECTS,
                variables: { departmentId, skip, take },
            });
            set({ subjects: data.subjects, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchSubject: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_SUBJECT,
                variables: { id },
            });
            set({ selectedSubject: data.subject, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addSubject: async (input: SubjectInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_SUBJECT,
                variables: { input },
            });
            await get().fetchSubjects();
            set({ loading: false });
            return data.addSubject;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateSubject: async (id: string, input: UpdateSubjectInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_SUBJECT,
                variables: { id, input },
            });
            await get().fetchSubjects();
            set({ loading: false });
            return data.updateSubject;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteSubject: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_SUBJECT,
                variables: { id },
            });
            await get().fetchSubjects();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedSubject: (subject) => set({ selectedSubject: subject }),
}));
