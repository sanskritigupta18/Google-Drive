import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";  // Importing the avatar icon
import { MdWallpaper } from "react-icons/md";  // Importing the wallpaper icon
import { useDispatch } from "react-redux";
import { login, signup } from "../../services/operations/authAPI";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar); // append avatar
    try {
      const response = await dispatch(signup(formData,navigate));
      // toast.success("User registered successfully!");
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <div className="flex pt-20 p-5 h-full justify-center items-center">
      <div className="p-10 rounded-xl border-2 bg-white shadow-lg animate-fade-in">
        <div className="flex flex-col justify-center items-center">
          <p className="text-3xl font-semibold">Welcome</p>
          <p className="text-xl font-semibold">
            Please enter your details to sign up.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Fullname */}
          <div className="flex flex-col">
            <div className="flex flex-col pt-5">
              <label htmlFor="fullname" className="font-semibold">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                className="border-2 rounded-xl px-2 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
          {/* email */}
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="border-2 rounded-xl px-2 py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {/* user name */}
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border-2 px-2 rounded-xl py-2 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* password */}
          <div className="flex flex-col">
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
          </div>

          {/* avatar and cover image */}
          <div className="flex justify-center gap-5">
            {/* avatar */}
            <div className="flex flex-col items-center">
              <label className="font-semibold flex items-center gap-2 cursor-pointer" htmlFor="avatarInput">
                <RxAvatar className="text-4xl" /> Choose Avatar
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
                required
              />
              {avatar && <p className="text-sm">{avatar.name}</p>}
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="bg-[#202122] hover:bg-[#0e0f0f] transition-all ease-in duration-200 py-2 rounded-xl w-full text-white transform hover:shadow-lg">
            Sign up
          </button>
        </form>

        <div className="flex pt-4 justify-center">
          <p>Already have an account?</p>
          <p className="font-semibold pl-1 text-blue-500 cursor-pointer" onClick={()=> navigate("/login")}>
            Login
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
