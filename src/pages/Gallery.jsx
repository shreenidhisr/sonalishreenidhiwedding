import React, { useState } from "react";

export default function Gallery() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.");

    // 1. Get pre-signed URL from backend
    const res = await fetch(
      `https://YOUR_API_GATEWAY_URL/upload-url?fileName=${encodeURIComponent(selectedFile.name)}`
    );
    const { url } = await res.json();

    // 2. Upload directly to S3
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": selectedFile.type },
      body: selectedFile
    });

    alert("Upload successful!");
  };

  return (
    <div>
      <h1>Gallery</h1>
      <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
