// Student Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_STUDENTS, GET_STUDENT } from '../../graphql/queries';
import { ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from '../../graphql/mutations';
import { Student, StudentInput, UpdateStudentInput } from '../../types';

interface StudentState {
    students: Student[];
    selectedStudent: Student | null;
    loading: boolean;
    error: string | null;
    fetchStudents: (branchId?: number, departmentId?: number, skip?: number, take?: number) => Promise<void>;
    fetchStudent: (id: string) => Promise<void>;
    addStudent: (input: StudentInput) => Promise<Student | null>;
    updateStudent: (id: string, input: UpdateStudentInput) => Promise<Student | null>;
    deleteStudent: (id: string) => Promise<boolean>;
    setSelectedStudent: (student: Student | null) => void;
}

export const useStudentStore = create<StudentState>((set, get) => ({
    students: [],
    selectedStudent: null,
    loading: false,
    error: null,

    fetchStudents: async (branchId, departmentId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_STUDENTS,
                variables: { branchId, departmentId, skip, take },
            });
            set({ students: data.students, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchStudent: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_STUDENT,
                variables: { id },
            });
            set({ selectedStudent: data.student, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addStudent: async (input: StudentInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_STUDENT,
                variables: { input },
            });
            await get().fetchStudents();
            set({ loading: false });
            return data.addStudent;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateStudent: async (id: string, input: UpdateStudentInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_STUDENT,
                variables: { id, input },
            });
            await get().fetchStudents();
            set({ loading: false });
            return data.updateStudent;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteStudent: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_STUDENT,
                variables: { id },
            });
            await get().fetchStudents();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedStudent: (student) => set({ selectedStudent: student }),
}));
