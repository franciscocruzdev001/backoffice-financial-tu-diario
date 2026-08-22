import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { customSessionStorage } from './storages/session-storage.storage';
import axios from "../shared/utils/axiosUtils"
import { get } from 'lodash';
import { LoginRequest } from '@/types/LoginRequest';
import { LoginResponse, User } from '@/types/LoginResponse';

interface AuthStoreState {
    token: string | null,
    user: User | null,
    isAuthenticated: boolean,
    login: (request: LoginRequest) => Promise<void>,
    logout: () => void
}

export const useAuthStore = create<AuthStoreState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            login: async (request: LoginRequest) => {
                const response = await axios.post<{ mensaje: string, data: LoginResponse }>(
                    "http://localhost:4000/authorizer/login", request
                );
                const token = get(response.data, "data.token", "");
                const user = get(response.data, "data.user", null);

                set(state => ({
                    token,
                    user,
                    isAuthenticated: Boolean(token)
                }));
            },
            logout: () => {
                set(state => ({
                    token: null,
                    user: null,
                    isAuthenticated: false
                }));
            }
        }),
        {
            name: "auth-storage",
            storage: customSessionStorage
        }
    )
)
