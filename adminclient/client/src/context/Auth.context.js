import React, { useEffect,useContext } from "react";
import useState from 'react-usestateref' // see this line

let REGISTER_URL = process.env.REACT_APP_API_REGISTER;
let LOGIN_URL = process.env.REACT_APP_API_LOGIN;
let LOGOUT_URL = process.env.REACT_APP_API_LOGOUT;
let PROFILE_URL = process.env.REACT_APP_API_PROFILE;

const UserContext = React.createContext();

export function useAuth() {
      return useContext(UserContext);
  }
  

export const UserProvider  = ({children}) => {

  const [isAuthenticated, setIsAuthenticated, authenticatedRef] = useState(false);
  const [loading,setLoading]=useState(true);

  const getVerified = async ()=>{
      console.log("verifying user inside the context function. Loading = true");
      /**
       * what happens here is that we will check if the user is authenticated
       * while maintaining a loading state
       * if the user is authenticated or not, we will set the state accordingly
       * and also set the loading state to false
       * 
       * this will render the appropriate components/routes and allow the proper state
       * of the user to be maintained when we render our component
       * 
       * if a token were to be used, we would fetch from local storage, however the server
       * is set up to use session storage, storing the session on the server,
       * as well as in the cookies
       */
      let response = await profile();
      console.log("recieved response from server where the status of verified is: " + response.verified);
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
     //here we get the correct state of the user
      console.log("state of verification is " + authenticatedRef.current);
  },[])

   async function  login(username, password){
      console.log("login context function");
      return fetch(LOGIN_URL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username,
              password,
          }),
          credentials: "include",
      }).then(response => {
          console.log(response);
          return response.json();
      }).then(data => {
          console.log(data);
          if (data.error) {
              console.log("error");
              console.log(data.error);
          }if(data.verified){
                  setIsAuthenticated(true);
                  setLoading(false);
                  console.log("user is authenticated in context");
          }
          return data;
      }).catch(error => {
          console.log(error);
          return error;
      });

  }

      async function logout(){
              return fetch(LOGOUT_URL, {
                  method: "GET",
                  credentials: "include",
                  }).then(response => {
                          console.log(response);
                          setIsAuthenticated(false);
                              setLoading(false);

                              return response.json();
                              
                              })
      }

      async function profile(){
                  console.log("retrieving profile from context function");
                  try{
                          let response = await fetch(PROFILE_URL, {
                              method: "GET",
                              credentials: "include",
                          })
                          let data = await response.json();
                            if(data.error){
                                    return {verified:false};
                            }

                          return data;

                  }
                  catch(error){
                      return{verified:false};
                  }
      }

      async function signup(email, password, username, confirmPassword){
          console.log("signing up user inside context");
          let sendData = {
                email,
                password,
                username,
                confirmPassword
                }
                let response = await fetch(REGISTER_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sendData),
                    credentials: "include",
                });
                let data = await response.json();
                if(data.verified){
                        setIsAuthenticated(true);
                        setLoading(false);
                        console.log("user is authenticated in context after signup");
                }else{
                    console.log("unable to authenticate user");
                    console.log(data);
                }

                return data;



      }


      const value = {
              isAuthenticated,
                  loading,
                  login,
                  logout,
                  profile,
                    signup,
      }


    return (
          loading ? <div>Loading...</div> :
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    )
}
