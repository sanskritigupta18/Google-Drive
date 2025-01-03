import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

function NavBar(props) {
    const [openModal, setOpenModal] = useState(false);
    const [showExtraOptions, setShowExtraOptions] = useState(false); // State to control additional options
    const { token, user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const optionValues = ["Login", "Logout"];
    const extraOptions = ["Profile", "Settings"]; // Additional options to show

    async function handleLogout() {
        const response = await dispatch(logout(token,navigate));
        if (response) {
            // Handle any necessary state updates or navigation after logout
        }
    }

    return (
        <div className="px-10 flex justify-between">
            <div>
                <p className="text-2xl font-bold mb-4">My Drive</p>
            </div>
            <div className="flex flex-col items-center relative">
                {token && (
                    <div>
                        <div
                            onClick={() => {
                                setOpenModal((prev) => !prev); // Toggle dropdown
                            }}
                        >
                            <img
                                className="w-12 rounded-full cursor-pointer"
                                src={user?.avatar}
                                alt=""
                            />
                        </div>
                    </div>
                )}
                {openModal && ( // Conditionally render select based on openModal state
                    <div className="absolute bg-white top-full right-0 mt-2 rounded shadow-md">
                        <select
                            className="bg-transparent border rounded p-1"
                            onChange={(e) => {
                                const option = e.target.value;
                                if (option === "Login") {
                                    navigate("/login")
                                } else {
                                    handleLogout();
                                }
                                setOpenModal(false); // Close dropdown after selection
                            }}
                        >
                            <option defaultValue={"Select Value"}>Select Value</option>
                            {optionValues.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {showExtraOptions && ( // Conditionally render extra options
                            <select
                                className="bg-transparent border rounded p-1 mt-2"
                                onChange={(e) => {
                                    const extraOption = e.target.value;
                                    if (extraOption === "Profile") {
                                        navigate("/profile");
                                    } else if (extraOption === "Settings") {
                                        navigate("/settings");
                                    }
                                    setShowExtraOptions(false); // Close extra options after selection
                                }}
                            >
                                {extraOptions.map((extraOption) => (
                                    <option key={extraOption} value={extraOption}>
                                        {extraOption}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;