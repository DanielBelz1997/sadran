import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function InsertSoliderInfo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("http://localhost:3001/uploadSolidersInfo/solidersInfo", formData)
        .then((response) => {
          console.log("Upload successful!");
          navigate("/sederHashivot");
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          toast.error(error, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });

      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpload();
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="upload-container">
        <h1>Upload Excel Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="file-input-container">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input"></label>
            <span>{selectedFile ? selectedFile.name : "No file selected"}</span>
          </div>
          <button type="submit" className="upload-button">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}
