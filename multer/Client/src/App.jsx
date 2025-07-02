import { useEffect, useState } from "react";
import axios from "axios";
import FileComponent from "./FileComponent";

function App() {
  const [fileData, setFileData] = useState([]);

  const getFileFromServer = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/file/get");
      setFileData(res.data); // axios automatically gives you the data
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  useEffect(() => {
    getFileFromServer();
  }, []);

  return (
    <div>
      <h1>File Upload</h1>
      <FileComponent getFileFromServer={getFileFromServer}/>
      <hr />

     <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  }}
>
  {fileData.map((el) => (
    <div key={el._id}>
      <img
        src={`http://localhost:3000/${el.filename}`}
        alt={el.filename}
        style={{
          width: '100%',
          height: 'auto', // Reduced height
          display: 'block',
          borderRadius: '8px',
          objectFit: 'cover',
          border: '2px solid #ccc', // Light gray border
        }}
      />
    </div>
  ))}
</div>


    </div>
  );
}

export default App;
