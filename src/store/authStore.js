import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";

const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    setUser: (user) => set({ user }),

    initAuth: async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
            set({user: null, loading: false});
            return
        }

        const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

        set({
            user: { ...session.user, role: profile?.role ?? "user"},
            loading: false
        })
    }
}))

export default useAuthStore;