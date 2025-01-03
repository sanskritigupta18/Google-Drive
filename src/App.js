import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Drive from "./components/Drive/Drive.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
    const {token, user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    useEffect(()=>{
        if(token)
        {
            navigate(`/user/${user?.uniqueId}`)
        }
        else
        {
            navigate("/login");
        }
    },[])
    return (
        <div>
            <div></div>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/user/:id" element={<Drive/>}></Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
