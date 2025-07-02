import axios from "axios";
import React, { useState } from "react";

const FileComponent = ({getFileFromServer}) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {

    try {
      const formData = new FormData();
      formData.append("file", file); 

      const res = await axios.post("http://localhost:3000/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded:", res.data);
      alert("Upload successful!");
      getFileFromServer()
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileComponent;
