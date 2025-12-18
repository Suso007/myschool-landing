// Organization Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_ORGANIZATIONS, GET_ORGANIZATION } from '../../graphql/queries';
import { ADD_ORGANIZATION, UPDATE_ORGANIZATION, DELETE_ORGANIZATION } from '../../graphql/mutations';
import { Organization, OrganizationInput, UpdateOrganizationInput } from '../../types';

interface OrganizationState {
    organizations: Organization[];
    selectedOrganization: Organization | null;
    loading: boolean;
    error: string | null;
    fetchOrganizations: (tenantId?: number, skip?: number, take?: number) => Promise<void>;
    fetchOrganization: (id: string) => Promise<void>;
    addOrganization: (input: OrganizationInput) => Promise<Organization | null>;
    updateOrganization: (id: string, input: UpdateOrganizationInput) => Promise<Organization | null>;
    deleteOrganization: (id: string) => Promise<boolean>;
    setSelectedOrganization: (organization: Organization | null) => void;
}

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
    organizations: [],
    selectedOrganization: null,
    loading: false,
    error: null,

    fetchOrganizations: async (tenantId, skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_ORGANIZATIONS,
                variables: { tenantId, skip, take },
            });
            set({ organizations: data.organizations, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchOrganization: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_ORGANIZATION,
                variables: { id },
            });
            set({ selectedOrganization: data.organization, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addOrganization: async (input: OrganizationInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_ORGANIZATION,
                variables: { input },
            });
            await get().fetchOrganizations();
            set({ loading: false });
            return data.addOrganization;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateOrganization: async (id: string, input: UpdateOrganizationInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_ORGANIZATION,
                variables: { id, input },
            });
            await get().fetchOrganizations();
            set({ loading: false });
            return data.updateOrganization;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteOrganization: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_ORGANIZATION,
                variables: { id },
            });
            await get().fetchOrganizations();
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedOrganization: (organization) => set({ selectedOrganization: organization }),
}));
