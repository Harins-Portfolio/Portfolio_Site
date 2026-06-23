import React, { useState } from 'react';

const Step3 = ({ onNext }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleNext = () => {
    onNext({ files });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">What data do you have?</h1>
      <p className="text-lg text-gray-600 mb-8">Upload support: CSV, Excel, SQL, PDF, ZIP, PBIX</p>
      <div className="w-1/2 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <p className="text-gray-500">Drag and drop your files here, or click to browse.</p>
        </label>
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={handleNext}
        disabled={files.length === 0}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
      >
        Continue
      </button>
    </div>
  );
};

export default Step3;
