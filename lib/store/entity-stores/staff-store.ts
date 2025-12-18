// Staff Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_STAFF_PROFILES, GET_STAFF_PROFILE } from '../../graphql/queries';
import { ADD_STAFF_PROFILE, UPDATE_STAFF_PROFILE, DELETE_STAFF_PROFILE } from '../../graphql/mutations';
import { StaffProfile, StaffProfileInput, UpdateStaffProfileInput } from '../../types';

interface StaffState {
    staffProfiles: StaffProfile[];
    selectedStaffProfile: StaffProfile | null;
    loading: boolean;
    error: string | null;
    fetchStaffProfiles: (branchId?: number, departmentId?: number, skip?: number, take?: number) => Promise<void>;
    fetchStaffProfile: (id: string) => Promise<void>;
    addStaffProfile: (input: StaffProfileInput) => Promise<StaffProfile | null>;
    updateStaffProfile: (id: string, input: UpdateStaffProfileInput) => Promise<StaffProfile | null>;
    deleteStaffProfile: (id: string) => Promise<boolean>;
    setSelectedStaffProfile: (staffProfile: StaffProfile | null) => void;
}

export const useStaffStore = create<StaffState>((set, get) => ({
    staffProfiles: [],
    selectedStaffProfile: null,
    loading: false,
    error: null,

    fetchStaffProfiles: async (branchId, departmentId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_STAFF_PROFILES,
                variables: { branchId, departmentId, skip, take },
            });
            set({ staffProfiles: data.staffProfiles, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchStaffProfile: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_STAFF_PROFILE,
                variables: { id },
            });
            set({ selectedStaffProfile: data.staffProfile, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addStaffProfile: async (input: StaffProfileInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_STAFF_PROFILE,
                variables: { input },
            });
            await get().fetchStaffProfiles();
            set({ loading: false });
            return data.addStaffProfile;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateStaffProfile: async (id: string, input: UpdateStaffProfileInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_STAFF_PROFILE,
                variables: { id, input },
            });
            await get().fetchStaffProfiles();
            set({ loading: false });
            return data.updateStaffProfile;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteStaffProfile: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_STAFF_PROFILE,
                variables: { id },
            });
            await get().fetchStaffProfiles();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedStaffProfile: (staffProfile) => set({ selectedStaffProfile: staffProfile }),
}));
