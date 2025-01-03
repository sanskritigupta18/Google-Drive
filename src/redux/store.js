import { configureStore } from "@reduxjs/toolkit";
import profile from "../Slice/Profile/profile";

export const store = configureStore({
    reducer:
    {
        profile: profile
    }
})