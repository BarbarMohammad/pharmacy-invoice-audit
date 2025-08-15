import { Discrepancy } from '../App';
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';


interface FileUploadProps {
  setDiscrepancies: React.Dispatch<React.SetStateAction<Discrepancy[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ setDiscrepancies }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('invoice', file);

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setDiscrepancies(data.discrepancies || []);
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  return (
  <div className="upload-card">
    <div className="upload-icon">📤</div>
    <div className="upload-details">
      <div style={{ fontWeight: 600, fontSize: '1.14em', marginBottom: '4px', color: '#1976d2' }}>
        Upload Pharmacy Invoice
      </div>
      <form onSubmit={handleSubmit}>
        <div className="upload-controls">
          <input
            id="file-upload"
            type="file"
            className="upload-input"
            accept=".xlsx"
            onChange={handleFileChange}
          />
          {file && (
            <span className="upload-filename" title={file.name}>{file.name}</span>
          )}
          <button
            type="submit"
            className="upload-btn"
            disabled={!file}
          >
            Upload Invoice
          </button>
        </div>
      </form>
      <div style={{ fontSize: '0.93em', color: '#41577a', marginTop: '5px' }}>
        <span role="img" aria-label="tip">ℹ️</span>
        Accepted formats: <b>.xlsx</b>
      </div>
    </div>
  </div>
);


  
};

export default FileUpload;
export {};