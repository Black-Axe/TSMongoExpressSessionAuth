import React, { useState,useEffect,useContext } from "react";
import { profile } from "../services/AuthService";


const UserContext = React.createContext();

export function useAuth() {
      return useContext(UserContext);
  }
  

export const UserProvider  = ({children}) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,setLoading]=useState(true);

  const getVerified = async ()=>{
      console.log("verification of user inside the context/ loading = true");
      /**
       * what happens here is that we will check if the user is authenticated
       * while maintaining a loading state
       * if the user is authenticated or not, we will set the state accordingly
       * and also set the loading state to false
       * 
       * this will render the appropriate components/routes and allow the proper state
       * of the user to be maintained when we render our component
       * 
       * what happens is the state is loading while the fetch happens. While the state is loading,
       * a loading div is rendered. When the fetch is done, loading is set to false
       * and the component renders as it should(with the proper state)
       */
      let response = await profile();
    //  response.verified = false;
      console.log(response.verified);
      console.log("^ Retrieved initial user verification loading still true");
      if(response.verified){
              setIsAuthenticated(true);
              setLoading(false);
      }
      else {
                  setIsAuthenticated(false);
                  setLoading(false);
            }
  }
  useEffect(()=> {
      getVerified()
      console.log("useEffect called with getVerified prior");
      console.log("state of verification is " + isAuthenticated);
  },[])



    return (
          loading ? <div>Loading...</div> :
      <UserContext.Provider value={{isAuthenticated}}>
        {children}
      </UserContext.Provider>
    )
}
