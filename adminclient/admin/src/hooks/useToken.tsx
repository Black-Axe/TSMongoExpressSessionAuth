import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    if(tokenString) {
      let token = JSON.parse(tokenString);
      return token?.token;
    }
    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: { token: any; }) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}