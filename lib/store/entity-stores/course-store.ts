// Course Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_COURSES, GET_COURSE } from '../../graphql/queries';
import { ADD_COURSE, UPDATE_COURSE, DELETE_COURSE } from '../../graphql/mutations';
import { Course, CourseInput, UpdateCourseInput } from '../../types';

interface CourseState {
    courses: Course[];
    selectedCourse: Course | null;
    loading: boolean;
    error: string | null;
    fetchCourses: (departmentId?: number, skip?: number, take?: number) => Promise<void>;
    fetchCourse: (id: string) => Promise<void>;
    addCourse: (input: CourseInput) => Promise<Course | null>;
    updateCourse: (id: string, input: UpdateCourseInput) => Promise<Course | null>;
    deleteCourse: (id: string) => Promise<boolean>;
    setSelectedCourse: (course: Course | null) => void;
}

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null,

    fetchCourses: async (departmentId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_COURSES,
                variables: { departmentId, skip, take },
            });
            set({ courses: data.courses, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchCourse: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_COURSE,
                variables: { id },
            });
            set({ selectedCourse: data.course, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addCourse: async (input: CourseInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_COURSE,
                variables: { input },
            });
            await get().fetchCourses();
            set({ loading: false });
            return data.addCourse;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateCourse: async (id: string, input: UpdateCourseInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_COURSE,
                variables: { id, input },
            });
            await get().fetchCourses();
            set({ loading: false });
            return data.updateCourse;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteCourse: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_COURSE,
                variables: { id },
            });
            await get().fetchCourses();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedCourse: (course) => set({ selectedCourse: course }),
}));
