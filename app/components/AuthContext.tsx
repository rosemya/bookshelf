'use client';

import {createContext, ReactNode, useEffect, useState} from "react";
import {getAuth, User} from 'firebase/auth';

import app from "@/app/config";

interface AuthContextType {
    user: User | null,
    loading: boolean
}

export const AuthContext= createContext<AuthContextType>({user: null, loading: false});

export function AuthProvider({children}: Readonly<{ children: ReactNode; }>) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const auth = getAuth(app);

        // Get auth state changes from firebase
        const unsubscribe = auth.onAuthStateChanged((firebaseUser: User | null) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    );
}