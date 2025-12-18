// Tenant Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_TENANTS, GET_TENANT } from '../../graphql/queries';
import { ADD_TENANT, UPDATE_TENANT, DELETE_TENANT } from '../../graphql/mutations';
import { Tenant, TenantInput, UpdateTenantInput } from '../../types';

interface TenantState {
    tenants: Tenant[];
    selectedTenant: Tenant | null;
    loading: boolean;
    error: string | null;

    // Actions
    fetchTenants: (skip?: number, take?: number) => Promise<void>;
    fetchTenant: (id: string) => Promise<void>;
    addTenant: (input: TenantInput) => Promise<Tenant | null>;
    updateTenant: (id: string, input: UpdateTenantInput) => Promise<Tenant | null>;
    deleteTenant: (id: string) => Promise<boolean>;
    setSelectedTenant: (tenant: Tenant | null) => void;
}

export const useTenantStore = create<TenantState>((set, get) => ({
    tenants: [],
    selectedTenant: null,
    loading: false,
    error: null,

    fetchTenants: async (skip = 0, take = 50) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_TENANTS,
                variables: { skip, take },
            });
            set({ tenants: data.tenants, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchTenant: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_TENANT,
                variables: { id },
            });
            set({ selectedTenant: data.tenant, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addTenant: async (input: TenantInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: ADD_TENANT,
                variables: { input },
            });

            // Refetch tenants list
            await get().fetchTenants();

            set({ loading: false });
            return data.addTenant;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    updateTenant: async (id: string, input: UpdateTenantInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_TENANT,
                variables: { id, input },
            });

            // Refetch tenants list
            await get().fetchTenants();

            set({ loading: false });
            return data.updateTenant;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return null;
        }
    },

    deleteTenant: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_TENANT,
                variables: { id },
            });

            // Refetch tenants list
            await get().fetchTenants();

            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            return false;
        }
    },

    setSelectedTenant: (tenant) => set({ selectedTenant: tenant }),
}));
