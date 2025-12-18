// User Store - Zustand with Apollo Client Integration
import { create } from 'zustand';
import { client } from '../../apollo-client';
import { GET_USERS, GET_USER } from '../../graphql/queries';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../../graphql/mutations';
import { UserManagement, CreateUserInput, UpdateUserInput } from '../../types';

interface UserState {
    users: UserManagement[];
    selectedUser: UserManagement | null;
    loading: boolean;
    error: string | null;

    // Actions
    fetchUsers: (role?: string, tenantId?: number, skip?: number, take?: number) => Promise<void>;
    fetchUser: (id: string) => Promise<void>;
    createUser: (input: CreateUserInput) => Promise<UserManagement | null>;
    updateUser: (id: string, input: UpdateUserInput) => Promise<UserManagement | null>;
    deleteUser: (id: string) => Promise<boolean>;
    setSelectedUser: (user: UserManagement | null) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    selectedUser: null,
    loading: false,
    error: null,

    fetchUsers: async (role, tenantId, skip = 0, take = 100) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_USERS,
                variables: { role, tenantId, skip, take },
                fetchPolicy: 'network-only',
            });
            set({ users: data.users, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    fetchUser: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.query({
                query: GET_USER,
                variables: { id },
                fetchPolicy: 'network-only',
            });
            set({ selectedUser: data.user, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    createUser: async (input: CreateUserInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: CREATE_USER,
                variables: { input },
            });

            // Refetch users list
            await get().fetchUsers();

            set({ loading: false });
            return data.createUser;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    updateUser: async (id: string, input: UpdateUserInput) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_USER,
                variables: { id, input },
            });

            // Refetch users list
            await get().fetchUsers();

            set({ loading: false });
            return data.updateUser;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    deleteUser: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await client.mutate({
                mutation: DELETE_USER,
                variables: { id },
            });

            // Refetch users list
            await get().fetchUsers();

            set({ loading: false });
            return true;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    setSelectedUser: (user) => set({ selectedUser: user }),
}));
