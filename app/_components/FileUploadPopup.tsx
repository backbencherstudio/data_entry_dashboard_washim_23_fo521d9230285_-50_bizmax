import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FileUploadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUpload: (file: File) => void;
  maxSize?: number; // in MB
}

export default function FileUploadPopup({
  isOpen,
  onClose,
  onFileUpload,
  maxSize = 5
}: FileUploadPopupProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dataType, setDataType] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setError('');

    // Check file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = () => {
    if (!dataType) {
      toast.error("Please select a data type.")
      return;
    }
    if (selectedFile) {
      onFileUpload(selectedFile);
      resetForm();
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000027] backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-999" onClick={() => handleClose()}>
      <Toaster position='top-right' />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Upload CSV File</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Upload Area */}
          <div>
            <Select
              value={dataType}
              onValueChange={(value: string) => setDataType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a data type" />
              </SelectTrigger>
              <SelectContent className='z-999'>
                <SelectItem value="apollo">Apollo</SelectItem>
                <SelectItem value="zoominfo">Zoominfo</SelectItem>
                <SelectItem value="sells">Sells</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragging
              ? 'border-blue-500 bg-blue-50'
              : selectedFile
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".csv"
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
                <p className="text-green-700 font-medium mb-1">File Selected</p>
                <p className="text-green-600 text-sm">{selectedFile.name}</p>
                <p className="text-green-500 text-xs mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-600 mb-1">
                  <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-gray-500 text-sm">CSV files only (Max {maxSize}MB)</p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* File Requirements */}
          {/* <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              File Requirements
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Must be a .csv file</li>
              <li>• Maximum file size: {maxSize}MB</li>
              <li>• Ensure proper column formatting</li>
              <li>• Supported encoding: UTF-8</li>
            </ul>
          </div> */}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors border hover:border-gray-300 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
}