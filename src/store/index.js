import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
    state: {
        user: null,
        saltKey: "booklike123!456"
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        logoutUser(state){
            state.user = null;
        }
    },
    getters: {
        _isAuthenticated: state => state.user !== null,
        _getCurrentUser(state) {
            const user = state.user;
            delete user?.password;
            return user;
        },
        _saltKey: state => state.saltKey
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: (key) => {
                    try {
                        return ls.get(key);
                    } catch (error) {
                        console.error("Could not parse JSON from SecureLS:", error);
                        ls.remove(key); // Hatalı veriyi temizler
                        return null;
                    }
                },
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ],
});
