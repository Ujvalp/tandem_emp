import { createContext, useContext, useEffect, useState } from "react";
import { SupabaseEmp } from "../supabase/supabase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
SupabaseEmp.auth.signInWithPassword({ email, password });

const signOut = () => SupabaseEmp.auth.signOut();

const passwordReset = (email) =>
SupabaseEmp.auth.resetPasswordForEmail(email, {
  redirectTo: "http://localhost:5173/reset"
});

const updatePassword = (updatedPassword) =>
SupabaseEmp.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }) => {
  
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const[validatePhone,setValidatePhone] = useState(false)
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [session ,setSession]=useState(null)
  const [loading, setLoading] = useState(true);
  const [update,setUpdate]=useState(true)
  const [searchInput,setSearchInput]=useState("")
  const [render,setRender]=useState(true)
  const[validateEmail,setValidateEmail] = useState(false)



 

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await SupabaseEmp.auth.getUser();
      const { user: currentUser } = data;
      setUser(currentUser ?? null);
      setSession(data.session)
      setAuth(currentUser ? true : false);
      setLoading(false);
      
    };
    getUser();
    const { data } = SupabaseEmp.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        setAuth(false);
      } else if (event === "SIGNED_IN") {
        setUser(session.user);
        setSession(session)
        setAuth(true);
        
      } else if (event === "SIGNED_OUT") {
        setAuth(false);
        setUser(null);
        setSession(null)
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        render,
        setRender,
        searchInput,
        setSearchInput,
        update,
        setUpdate,
        session,
        auth,
        user,
        login,
        signOut,
        passwordReset,
        updatePassword,
        email,
        setEmail,
        validateEmail,
        setValidateEmail,
        setPhone,
        phone,
        validatePhone,
        setValidatePhone
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
