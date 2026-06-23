import { useState, useRef } from 'react';

const acceptedFormats = [
  { ext: '.csv', label: 'CSV', icon: 'ri-file-text-line' },
  { ext: '.xlsx,.xls', label: 'Excel', icon: 'ri-file-excel-line' },
  { ext: '.pdf', label: 'PDF', icon: 'ri-file-pdf-line' },
  { ext: '.zip,.rar', label: 'ZIP', icon: 'ri-file-zip-line' },
  { ext: '.pbix', label: 'PBIX', icon: 'ri-bar-chart-2-line' },
];

const Step3 = ({ onNext, onBack, initialFiles }) => {
  const [files, setFiles] = useState(initialFiles || []);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const addFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name));
      const unique = fileArray.filter(f => !existing.has(f.name));
      return [...prev, ...unique];
    });
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleUpload = async () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onNext({ files });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-brand-50/30">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full animate-fadeInUp">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100/80 rounded-full text-brand-700 text-sm font-medium mb-4 border border-brand-200/50">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Step 3 of 6
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Upload Your Data
            </h1>
            <p className="text-lg text-gray-500">
              Share any relevant files. This helps me understand your data structure.
            </p>
          </div>

          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
              dragOver
                ? 'border-brand-500 bg-brand-50'
                : 'border-gray-200 bg-white hover:border-brand-300 hover:bg-brand-50/30'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".csv,.xlsx,.xls,.pdf,.zip,.rar,.pbix"
              onChange={(e) => addFiles(e.target.files)}
              className="hidden"
            />

            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-200 ${
              dragOver ? 'bg-brand-500 text-white scale-110' : 'bg-gray-100 text-gray-400'
            }`}>
              <i className={`text-2xl ${dragOver ? 'ri-upload-cloud-2-line' : 'ri-cloud-line'}`} />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-1">
              {dragOver ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-gray-400 mb-4">or click to browse</p>

            <div className="flex flex-wrap justify-center gap-2">
              {acceptedFormats.map((fmt) => (
                <span key={fmt.ext} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-500">
                  <i className={fmt.icon} />
                  {fmt.label}
                </span>
              ))}
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6 animate-fadeInUp">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {files.length} file{files.length !== 1 ? 's' : ''} selected
              </h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:border-brand-100 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
                      <i className="ri-file-text-line text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <i className="ri-close-line" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-10">
            <button onClick={onBack} className="btn-ghost">
              <i className="ri-arrow-left-line" />
              Back
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="btn-primary text-base px-8 py-3"
            >
              {uploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  Continue
                  <i className="ri-arrow-right-line" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
