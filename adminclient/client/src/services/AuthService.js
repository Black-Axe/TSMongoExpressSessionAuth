import React, {useContext, useState, useEffect} from 'react';

export async function signup(email, password, username, confirmPassword) {
    console.log("signup context");
    console.log(email, password, username, confirmPassword);
    let sendData={
        email: email,
        password: password,
        username: username,
        confirmPassword: confirmPassword
    }
    let JSONData = JSON.stringify(sendData);

    let response = await fetch("http://localhost:11000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSONData,
        credentials: "include"
    });

    console.log(response);
    let data = await response.json();
    console.log(data);
    if(data.error){
        console.log(data.error);
    }else{
        //we get user and message
        console.log(data.user);
        //set local storage
        //setCurrentUser(data.user);
    }
    return data;


    
    }

export async function  login(username, password){
        console.log("login context function");
        return fetch(process.env.REACT_APP_API_LOGIN, {
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
            }
            return data;
        }).catch(error => {
            console.log(error);
            return error;
        });

    }

export async function logout(){
    return fetch("http://localhost:11000/logout", {
        method: "GET",
        credentials: "include",
    }).then(response => {
        console.log(response);
        return response.json();
    })
    }

export async function profile(){
        console.log("profile service function");
        let response = await fetch("http://localhost:11000/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
       // console.log(response);
        let data = await response.json();
      //  console.log(data);
        return data;

    }

