"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useCSVValidator } from '@/hooks/useCSVValidator';


interface CSVValidationResult {
    isValid: boolean;
    errors: string[];
    headers: string[];
    data?: string[][];
}

interface CSVUploadProps {
    requiredHeaders: string[];
    optionalHeaders?: string[];
    onValidationResult?: (result: CSVValidationResult) => void;
    maxFileSize?: number;
    acceptedFileTypes?: string[];
    uploading: boolean;
    isImported: boolean;
}

const CSVUploader: React.FC<CSVUploadProps> = ({
    requiredHeaders,
    optionalHeaders = [],
    onValidationResult,
    maxFileSize = 5120 * 1024 * 1024,
    acceptedFileTypes = ['.csv', 'text/csv'],
    uploading,
    isImported
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const {
        validationResult,
        isProcessing,
        processCSVFile,
        resetValidation
    } = useCSVValidator(requiredHeaders, optionalHeaders);

    const handleFile = async (selectedFile: File) => {
        // Validate file type
        if (!acceptedFileTypes.some(type =>
            selectedFile.type === type || selectedFile.name.toLowerCase().endsWith(type.replace('.', ''))
        )) {
            alert('Please upload a valid CSV file');
            return;
        }

        // Validate file size
        if (selectedFile.size > maxFileSize) {
            alert(`File size exceeds limit of ${selectedFile.size}MB`);
            return;
        }

        setFile(selectedFile);
        const result = await processCSVFile(selectedFile);
        onValidationResult?.(result);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const files = event.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const triggerFileInput = () => {
        if (!isProcessing) {
            fileInputRef.current?.click();
        }
    };

    const handleReset = () => {
        setFile(null);
        resetValidation();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validate = async () => {
        if (file) {
            const result = await processCSVFile(file);
            onValidationResult?.(result);
        }
    }

    useEffect(() => {
        validate();
    }, [requiredHeaders])

    return (
        <div className={`w-full max-w-2xl mx-auto p-6 space-y-6 ${uploading?"opacity-50":""}`}>
            {/* File Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${isDragging
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                    } ${isProcessing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedFileTypes.join(',')}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isProcessing || uploading}
                />

                <div className="space-y-4">
                    <div className="text-gray-400">
                        <svg
                            className="mx-auto h-12 w-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-gray-900">
                            {isProcessing ? 'Processing CSV...' : 'Upload CSV File'}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Max size: {maxFileSize / 1024 / 1024}MB • CSV format only
                        </p>
                    </div>
                </div>
            </div>

            {/* Selected File Info */}
            {file && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-blue-900">{file.name}</p>
                                <p className="text-xs text-blue-700">
                                    {(file.size / 1024).toFixed(2)} KB • {file.type || 'CSV'}
                                </p>
                            </div>
                        </div>
                        {!isProcessing && (
                            <button
                                onClick={handleReset}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Change File
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Required Headers Info */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Required Headers:</h3>
                <div className="flex flex-wrap gap-2">
                    {requiredHeaders.map((header, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200"
                        >
                            {header}
                        </span>
                    ))}
                </div>

                {optionalHeaders.length > 0 && (
                    <>
                        <h3 className="text-sm font-medium text-gray-900 mt-4 mb-3">Optional Headers:</h3>
                        <div className="flex flex-wrap gap-2">
                            {optionalHeaders.map((header, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-green-200"
                                >
                                    {header}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Validation Results */}
            {validationResult && (
                <div className={`p-4 rounded-lg border ${validationResult.isValid
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                    }`}>
                    <div className="flex items-center space-x-2 mb-3">
                        <div className={`w-3 h-3 rounded-full ${validationResult.isValid ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                        <h3 className={`text-sm font-semibold ${validationResult.isValid ? 'text-green-800' : 'text-red-800'
                            }`}>
                            {validationResult.isValid ? 'Validation Successful' : 'Validation Failed'}
                        </h3>
                    </div>

                    {validationResult.isValid ? (
                        <div className="space-y-2">
                            <p className="text-sm text-green-700">
                                CSV file is valid! Found {validationResult.data?.length || 0} data rows.
                            </p>
                            <div className="text-xs text-green-600 bg-green-100 p-2 rounded">
                                <strong>Detected Headers:</strong> {validationResult.headers.join(', ')}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="text-sm text-red-700">
                                Found {validationResult.errors.length} error(s):
                            </p>
                            <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
                                {validationResult.errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Processing Indicator */}
            {isProcessing && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600" />
                        <p className="text-sm font-medium text-yellow-800">
                            Processing CSV file...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CSVUploader;