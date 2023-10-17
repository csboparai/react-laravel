import React from "react";
import { useRef } from "react";
import { Link, UNSAFE_DataRouterStateContext } from "react-router-dom";
import axiosClient from '../axios-client';
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        console.log(payload);
        axiosClient.post("/signup",payload)
        .then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if(response && response.status == 422){
                setErrors(response.data.errors);
                //console.log(response.data.errors);
            }
        })
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    <input placeholder="Email" type="email" />
                    <input type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
