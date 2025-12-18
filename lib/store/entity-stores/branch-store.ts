// Branch Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_BRANCHES, GET_BRANCH } from '../../graphql/queries';
import { ADD_BRANCH, UPDATE_BRANCH, DELETE_BRANCH } from '../../graphql/mutations';
import { Branch, BranchInput, UpdateBranchInput } from '../../types';

interface BranchState {
    branches: Branch[];
    selectedBranch: Branch | null;
    loading: boolean;
    error: string | null;
    fetchBranches: (organizationId?: number, tenantId?: number, skip?: number, take?: number) => Promise<void>;
    fetchBranch: (id: string) => Promise<void>;
    addBranch: (input: BranchInput) => Promise<Branch | null>;
    updateBranch: (id: string, input: UpdateBranchInput) => Promise<Branch | null>;
    deleteBranch: (id: string) => Promise<boolean>;
    setSelectedBranch: (branch: Branch | null) => void;
}

export const useBranchStore = create<BranchState>((set, get) => ({
    branches: [],
    selectedBranch: null,
    loading: false,
    error: null,

    fetchBranches: async (organizationId, tenantId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_BRANCHES,
                variables: { organizationId, tenantId, skip, take },
            });
            set({ branches: data.branches, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchBranch: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_BRANCH,
                variables: { id },
            });
            set({ selectedBranch: data.branch, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addBranch: async (input: BranchInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_BRANCH,
                variables: { input },
            });
            await get().fetchBranches();
            set({ loading: false });
            return data.addBranch;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateBranch: async (id: string, input: UpdateBranchInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_BRANCH,
                variables: { id, input },
            });
            await get().fetchBranches();
            set({ loading: false });
            return data.updateBranch;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteBranch: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_BRANCH,
                variables: { id },
            });
            await get().fetchBranches();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedBranch: (branch) => set({ selectedBranch: branch }),
}));
