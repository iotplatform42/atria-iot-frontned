import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthStateChange, useClient } from "react-supabase";

interface IAuthContext {
  session: Session | null;
  user?: User | null;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const client = useClient();
  const [state, setState] = useState<{
    session: Session | null;
    user?: User | null;
  }>();

  useEffect(() => {
    if (client.auth) {
      const session = client.auth.session();
      setState({ session, user: session?.user ?? null });
    }
  }, [client.auth]);

  useAuthStateChange((event, session) => {
    console.log(`Supbase auth event: ${event}`, session);
    setState({ session, user: session?.user ?? null });
  });

  return (
    <AuthContext.Provider
      value={{ session: state?.session ?? null, user: state?.user ?? null }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within AuthProvider");
  return context;
}
