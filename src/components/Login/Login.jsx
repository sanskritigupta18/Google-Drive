import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI";

function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const data = {email: email, password: password}
            console.log(data)
            dispatch(login(data, navigate));
            setSuccess("Logged in successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex h-screen p-10 md:p-0 justify-center items-center">
            <div className="p-10 rounded-xl border-2 border-[#111111bf] bg-white shadow-lg animate-fade-in">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-3xl font-semibold">Welcome Back</p>
                    <p className="text-xl font-semibold">
                        Please enter your details to sign in.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Email */}
                    <div className="flex flex-col pt-5">
                        <label htmlFor="email" className="font-semibold">
                            E-Mail Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="border-2 rounded-xl px-2 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border-2 rounded-xl px-2 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#202122] hover:bg-[#0e0f0f] transition-all ease-in duration-200 py-2 rounded-xl w-full text-white transform hover:shadow-lg"
                    >
                        Sign in
                    </button>
                </form>

                {/* Error & Success Messages */}
                {error && <p className="text-red-500 pt-3">{error}</p>}
                {success && <p className="text-green-500 pt-3">{success}</p>}

                <div className="flex pt-4 justify-center">
                    <p>Don't have an account yet?</p>
                    <p
                        className="font-semibold pl-1 text-blue-500 cursor-pointer"
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >
                        Signup
                    </p>
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}

export default Login;