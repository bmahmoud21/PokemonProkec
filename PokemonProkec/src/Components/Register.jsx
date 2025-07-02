import React, { useState } from "react";

function Register({ onRegister, onSwitchToLogin, onGuest }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="userpw">
            <div className="block-cube block-input">
                <input
                    type="text"
                    placeholder="Enter Username"
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <span className="bg"><span className="bg-inner"></span></span>
                <span className="bg bg-top"><span className="bg-inner"></span></span>
                <span className="bg bg-right"><span className="bg-inner"></span></span>
            </div>
            <div className="block-cube block-input">
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="bg"><span className="bg-inner"></span></span>
                <span className="bg bg-top"><span className="bg-inner"></span></span>
                <span className="bg bg-right"><span className="bg-inner"></span></span>
            </div>
            <div className="block-cube block-input">
                <button
                    type="button"
                    className="login-input"
                    onClick={() => onRegister(username, password)}
                >
                    <span className="text">Sign Up</span>
                    <span className="bg"><span className="bg-inner" /></span>
                    <span className="bg bg-top"><span className="bg-inner" /></span>
                    <span className="bg bg-right"><span className="bg-inner" /></span>
                </button>
            </div>
            <div className="block-cube block-input">
                <button
                    type="button"
                    className="login-input"
                    onClick={onSwitchToLogin}
                >
                    <span className="text">Back to Login</span>
                    <span className="bg"><span className="bg-inner" /></span>
                    <span className="bg bg-top"><span className="bg-inner" /></span>
                    <span className="bg bg-right"><span className="bg-inner" /></span>
                </button>
            </div>
            <div className="block-cube block-input">
                <button
                    type="button"
                    className="login-input"
                    onClick={onGuest}
                >
                    <span className="text">Continue as Guest</span>
                    <span className="bg"><span className="bg-inner" /></span>
                    <span className="bg bg-top"><span className="bg-inner" /></span>
                    <span className="bg bg-right"><span className="bg-inner" /></span>
                </button>
            </div>
        </div>
    );
}

export default Register;