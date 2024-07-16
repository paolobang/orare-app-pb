"use client"
import React from "react";
import GoogleLogin from 'react-google-login'
import { useEffect } from "react";
import { gapi } from "gapi-script"
 

const SignIn = () => {
  const clientID ='446889604106-ki47mk49s1uo5a9fh8m6vm5sc591q6td.apps.googleusercontent.com'
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId : clientID,
      })
    }
    gapi.load("client:auth2", start)
  }, [])

  const onSuccess = (response) => {
    console.log(response)
  }

  const onFailure = () => {
    console.log("Algo salio mal")
  }

  return (
    <>
    <div className="btn">
    <GoogleLogin 
      clientId={clientID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_policy"}
    />
    </div>
    </>
  );
};

export default SignIn;
