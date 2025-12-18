// Timetable Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import {
    GET_TIMETABLE_SLOTS,
    GET_STAFF_TIMETABLE,
    GET_SUBSTITUTIONS,
} from '../../graphql/queries';
import {
    ADD_TIMETABLE_SLOT,
    UPDATE_TIMETABLE_SLOT,
    DELETE_TIMETABLE_SLOT,
    BULK_CREATE_SLOTS,
    REQUEST_SUBSTITUTION,
    APPROVE_SUBSTITUTION,
    REJECT_SUBSTITUTION,
} from '../../graphql/mutations';

interface TimetableState {
    // Timetable Slots
    slots: any[];
    selectedSlot: any | null;
    classTimetable: any[];
    staffTimetable: any[];

    // Substitutions
    substitutions: any[];
    selectedSubstitution: any | null;

    // Period Templates
    templates: any[];
    selectedTemplate: any | null;

    // UI State
    loading: boolean;
    error: string | null;

    // Timetable Slot Actions
    fetchClassTimetable: (branchId: number, classId: number) => Promise<void>;
    fetchStaffTimetable: (staffId: number) => Promise<void>;
    addSlot: (input: any, branchId: number, classId: number) => Promise<any | null>;
    updateSlot: (id: string, input: any, branchId: number, classId: number) => Promise<any | null>;
    deleteSlot: (id: string, branchId: number, classId: number) => Promise<boolean>;
    bulkCreateSlots: (slots: any[], branchId: number, classId: number) => Promise<any[]>;

    // Substitution Actions
    fetchSubstitutions: (filters?: { date?: string; status?: string }) => Promise<void>;
    requestSubstitution: (input: any) => Promise<any | null>;
    approveSubstitution: (id: string) => Promise<any | null>;
    rejectSubstitution: (id: string, reason?: string) => Promise<any | null>;

    // Setters
    setSelectedSlot: (slot: any | null) => void;
    setSelectedSubstitution: (sub: any | null) => void;
}

export const useTimetableStore = create<TimetableState>((set, get) => ({
    slots: [],
    selectedSlot: null,
    classTimetable: [],
    staffTimetable: [],
    substitutions: [],
    selectedSubstitution: null,
    templates: [],
    selectedTemplate: null,
    loading: false,
    error: null,

    // Fetch timetable slots
    fetchSlots: async (filters = {}) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_TIMETABLE_SLOTS,
                variables: filters,
            });
            set({ slots: data.timetableSlots, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch class timetable
    fetchClassTimetable: async (branchId: number, classId: number) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_TIMETABLE_SLOTS,
                variables: { branchId, classId },
            });
            set({ classTimetable: data.classTimetable, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Fetch staff timetable
    fetchStaffTimetable: async (staffId: number) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_STAFF_TIMETABLE,
                variables: { staffId },
            });
            set({ staffTimetable: data.staffTimetable, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Add timetable slot
    addSlot: async (input: any, branchId: number, classId: number) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_TIMETABLE_SLOT,
                variables: { input },
            });
            await get().fetchClassTimetable(branchId, classId);
            set({ loading: false });
            return data.addTimetableSlot;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    // Update timetable slot
    updateSlot: async (id: string, input: any, branchId: number, classId: number) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_TIMETABLE_SLOT,
                variables: { id, input },
            });
            await get().fetchClassTimetable(branchId, classId);
            set({ loading: false });
            return data.updateTimetableSlot;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    // Delete timetable slot
    deleteSlot: async (id: string, branchId: number, classId: number) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_TIMETABLE_SLOT,
                variables: { id },
            });
            await get().fetchClassTimetable(branchId, classId);
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    // Bulk create slots
    bulkCreateSlots: async (slots: any[], branchId: number, classId: number) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: BULK_CREATE_SLOTS,
                variables: { input: { slots } },
            });
            await get().fetchClassTimetable(branchId, classId);
            set({ loading: false });
            return data.bulkCreateTimetableSlots;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return [];
        }
    },

    // Fetch substitutions
    fetchSubstitutions: async (filters = {}) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_SUBSTITUTIONS,
                variables: filters,
            });
            set({ substitutions: data.substitutions, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    // Request substitution
    requestSubstitution: async (input: any) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: REQUEST_SUBSTITUTION,
                variables: { input },
            });
            await get().fetchSubstitutions();
            set({ loading: false });
            return data.requestSubstitution;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    // Approve substitution
    approveSubstitution: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: APPROVE_SUBSTITUTION,
                variables: { id },
            });
            await get().fetchSubstitutions();
            set({ loading: false });
            return data.approveSubstitution;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    // Reject substitution
    rejectSubstitution: async (id: string, reason?: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: REJECT_SUBSTITUTION,
                variables: { id, reason },
            });
            await get().fetchSubstitutions();
            set({ loading: false });
            return data.rejectSubstitution;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    setSelectedSlot: (slot) => set({ selectedSlot: slot }),
    setSelectedSubstitution: (sub) => set({ selectedSubstitution: sub }),
}));
