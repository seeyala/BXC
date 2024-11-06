"use client";

import { useState, ChangeEvent } from 'react';
import Image from 'next/image'; // Import the Image component from Next.js

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    // Tạo form data để gửi file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Gửi yêu cầu POST tới API /api/upload
      const response = await fetch(`/api/upload?fileName=${file.name}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      // Lưu URL của ảnh đã tải lên để hiển thị
      setImageURL(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageURL && (
        <div>
          <p>Uploaded Image:</p>
          {/* Replace <img> with <Image> for optimization */}
          <Image 
            src={imageURL} 
            alt="Uploaded" 
            width={200} // Set the width of the image
            height={200} // Set the height of the image
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
