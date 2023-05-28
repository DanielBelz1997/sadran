import React, { useState } from "react";
import axios from "axios";

export function InsertExcel() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post("http://localhost:3001/insertExcel/insertExcel", formData)
        .then((response) => {
          console.log("Upload successful!");
        })
        .catch((error) => {
          console.error("Upload failed:", error);
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
    <div className="upload-container">
      <h1>Upload Excel Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="file-input-container">
          <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
          <label htmlFor="file-input"></label>
          <span>{selectedFile ? selectedFile.name : "No file selected"}</span>
        </div>
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
    </div>
  );
}
