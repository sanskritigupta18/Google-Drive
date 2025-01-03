import React, { useEffect, useRef, useState } from "react";
import {
    deleteFile,
    editFile,
    getFileByUser,
    uploadFile,
    uploadNewFile,
} from "../../services/operations/fileAPI";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { replace, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function Drive() {
    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [newFile, setNewFile] = useState(null);
    const [editFileValue, setEditFile] = useState(false);
    const [fileName, setFileName] = useState("Updated File Name");
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const filePreview = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { token, user } = useSelector((state) => state.profile);
    let filteredFiles;

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await dispatch(getFileByUser(token));
                console.log("Response", response);
                setFiles(response);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        token && fetchFiles();
    }, [token]);

    // console.log("File",files.length)
    if (files != null && files.length !== 0) {
        filteredFiles = files.filter((file) =>
            file?.fileDetails?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }
    function handleUpdateForm(e, selectedFile) {
        e.preventDefault();
        console.log("Selected File", selectedFile);
        handleFileEdit(selectedFile, fileName);
    }

    async function handleFileEdit(file, newName) {
        // public_id, name
        const data = {
            public_id: file?.fileDetails?.cloudinary_public_id,
            name: newName,
        };
        const response = await dispatch(editFile(data, token));
        // navigate(location.pathname);
        window.location.reload(false);
    }

    async function handleFileDelete(public_id) {
        const response = await dispatch(deleteFile(public_id, token));
        window.location.reload(false);
    }

    const handleFileClick = () => {
        filePreview.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setNewFile(e.target.files[0]);
        setImagePreview();
    };

    const handleFileUpload = async () => {
        if (!newFile) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", newFile);

            const response = await dispatch(uploadFile(formData, token));
            setFiles([...files, response.data]);
            setIsUploadModalOpen(false);
            setNewFile(null);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="p-6 bg-gray-100 min-h-screen">
                <p className="text-2xl font-semibold mb-4">
                    Hi, {user?.fullName}
                </p>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search files..."
                    className="p-2 border rounded w-full mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Upload Button */}
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Upload New File
                </button>

                {/* Files Display */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredFiles &&
                        filteredFiles.map((file) => (
                            <div
                                key={file.fileDetails.cloudinary_public_id}
                                className="flex items-center hover:shadow-xl transition-all ease-in duration-200
                             justify-between p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
                            >
                                <div
                                    onClick={() => {
                                        setSelectedFile(file);
                                        console.log(file);
                                    }}
                                    className="w-full"
                                >
                                    <p className="text-xl font-semibold truncate">
                                        {file.fileDetails.name.substr(0, 20)}
                                    </p>
                                    <h2 className="font-medium text-sm truncate">
                                        Size:{" "}
                                        {(
                                            file.fileDetails.size / 1000000
                                        ).toFixed(4)}
                                        mb
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        {file.fileDetails.type}
                                    </p>
                                </div>
                                <div
                                    onClick={() => {
                                        handleFileDelete(
                                            file.fileDetails
                                                .cloudinary_public_id
                                        );
                                    }}
                                >
                                    <MdDeleteOutline className="text-2xl" />
                                </div>
                            </div>
                        ))}
                </div>

                {/* File Preview Modal */}
                {selectedFile && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
                        <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
                            <div className="flex items-center justify-between">
                                {!editFileValue && (
                                    <h2 className="font-medium mb-2">
                                        {selectedFile.fileDetails.name.substr(
                                            0,
                                            40
                                        )}
                                    </h2>
                                )}

                                {editFileValue && (
                                    <h2 className="font-medium mb-2">
                                        {fileName}
                                    </h2>
                                )}

                                <div className="flex gap-5 pb-2">
                                    <button
                                        className="bg-blue-400 text-white px-4 py-2 hover:bg-blue-500 transition-all ease-in duration-200 rounded-md font-bold float-right"
                                        onClick={() => {
                                            setEditFile(true);
                                            // handleFileEdit(selectedFile,fileName);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all ease-in duration-200 font-bold float-right"
                                        onClick={() => setSelectedFile(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                            {/* <iframe
                            src={selectedFile.fileDetails.url}
                            title="File Preview"
                            className="w-screen border"
                        /> */}
                            {(() => {
                                switch (selectedFile.fileDetails.type) {
                                    case "png":
                                        return (
                                            <img
                                                src={
                                                    selectedFile.fileDetails.url
                                                }
                                                alt=""
                                            />
                                        );
                                    case "jpg":
                                        return (
                                            <img
                                                src={
                                                    selectedFile.fileDetails.url
                                                }
                                                alt=""
                                            />
                                        );
                                    case "mp4":
                                        return (
                                            <video
                                                autoPlay
                                                controls
                                                src={
                                                    selectedFile.fileDetails.url
                                                }
                                                alt=""
                                            />
                                        );
                                    case "pdf":
                                        return (
                                            // <iframe
                                            //     src={selectedFile.fileDetails.url}
                                            //     title={
                                            //         selectedFile.fileDetails?.name
                                            //     }
                                            //     className="w-72 h-72 object-cover"
                                            // />
                                            <img
                                                src={selectedFile.fileDetails.url.replace(
                                                    "pdf",
                                                    "jpg"
                                                )}
                                                alt=""
                                            />
                                        );
                                    default:
                                        return <div>File not supported</div>;
                                }
                            })()}
                            <p className="text-md mt-2">
                                Size:{" "}
                                {(
                                    selectedFile.fileDetails.size / 1000000
                                ).toFixed(4)}
                                mb
                            </p>
                            <p className="text-md">
                                Uploaded On:{" "}
                                {new Date(
                                    selectedFile.fileDetails.uploadedOn
                                ).toLocaleDateString()}
                            </p>
                            {editFileValue && (
                                <div className="w-full mt-2">
                                    <form
                                        onSubmit={(e) => {
                                            handleUpdateForm(e, selectedFile);
                                        }}
                                        className="flex justify-between w-full"
                                    >
                                        <input
                                            type="text"
                                            name=""
                                            onChange={(e) => {
                                                setFileName(e.target.value);
                                            }}
                                            className="w-full border px-2 rounded-md rounded-r-none"
                                            placeholder="Updated file name"
                                            id=""
                                        />
                                        <button className="bg-blue-400 hover:bg-blue-500 transition-all ease-in duration-200 rounded-md rounded-l-none font-semibold text-white px-2 py-2">
                                            Update
                                        </button>
                                    </form>
                                </div>
                            )}
                            <div>
                                <button className="bg-blue-400 hover:bg-blue-500 mt-2 transition-all ease-in duration-200 text-white font-semibold px-2 py-2 rounded-md" onClick={() => {}}>
                                    <a
                                        href={`${selectedFile?.fileDetails?.url}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Download
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload File Modal */}
                {isUploadModalOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
                        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                            <div className="flex flex-col items-center gap-5">
                                <h2 className="text-lg font-bold mb-4">
                                    Upload New File
                                </h2>
                                <div className="flex flex-col justify-center items-center">
                                    <div
                                        className="flex justify-center items-center gap-5"
                                        onClick={handleFileClick}
                                    >
                                        <IoCloudUploadOutline className="text-4xl" />
                                        <p>Upload File</p>
                                    </div>
                                    <input
                                        type="file"
                                        ref={filePreview}
                                        onChange={handleFileChange}
                                        className="mb-4"
                                        style={{ display: "none" }}
                                    />
                                </div>
                                <div className="flex gap-5">
                                    <button
                                        onClick={() =>
                                            setIsUploadModalOpen(false)
                                        }
                                        className="bg-gray-500 hover:bg-gray-600 transition-all ease-in duration-200 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleFileUpload}
                                        className="bg-green-500 hover:bg-green-600 transition-all ease-in duration-200 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drive;
