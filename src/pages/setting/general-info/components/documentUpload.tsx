import { useState, DragEvent, ChangeEvent } from 'react';
import { FileText, Upload, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';

interface DocumentUploadProps {
    onFilesChange?: (files: File[]) => void;
    maxFileSize?: number;
    accept?: string;
    error2?: string;
    multiple?: boolean;
    disabled?: boolean;
    oldFiles?: string;
}

export function DocumentUpload({
    onFilesChange,
    error2,
    oldFiles,
    maxFileSize = 10 * 1024 * 1024,
    accept = ".pdf,.doc,.docx,.txt",
    multiple = true,
    disabled = false
}: DocumentUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File) => {
        if (file.size > maxFileSize) {
            setError(`File "${file.name}" exceeds maximum size of ${maxFileSize / 1024 / 1024}MB`);
            return false;
        }

        const allowedTypes = accept.split(',');
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!allowedTypes.includes(fileExtension)) {
            setError(`File type "${fileExtension}" is not supported`);
            return false;
        }

        setError(null);
        return true;
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

        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(validateFile);

        if (!multiple && validFiles.length > 0) {
            const newFiles = [validFiles[0]];
            setFiles(newFiles);
            onFilesChange?.(newFiles);
        } else {
            setFiles(prev => {
                const newFiles = [...prev, ...validFiles];
                onFilesChange?.(newFiles);
                return newFiles;
            });
        }
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(validateFile);

            if (!multiple && selectedFiles.length > 0) {
                const newFiles = [selectedFiles[0]];
                setFiles(newFiles);
                onFilesChange?.(newFiles);
            } else {
                setFiles(prev => {
                    const newFiles = [...prev, ...selectedFiles];
                    onFilesChange?.(newFiles);
                    return newFiles;
                });
            }
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => {
            const newFiles = prev.filter((_, i) => i !== index);
            onFilesChange?.(newFiles);
            return newFiles;
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };
    return (
        <div className="w-full space-y-4">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                        border-2 border-dashed rounded-xl p-8
                        flex flex-col items-center justify-center
                        transition-all duration-200 ease-in-out
                        ${isDragging
                        ? 'border-indigo-500 bg-indigo-50'
                        : error2 ? "border-red-500 bg-red-100" : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                    }`}
            >
                <div className="bg-indigo-50 p-4 rounded-full mb-4">
                    <Upload className="w-8 h-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Upload Documents
                </h3>
                <p className="text-gray-500 text-center mb-4">
                    Drag and drop your documents here, or click to browse
                </p>
                <label className="cursor-pointer">
                    <span className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Select Files
                    </span>
                    <input
                        type="file"
                        disabled={disabled}
                        className="hidden"
                        onChange={handleFileInput}
                        multiple={multiple}
                        accept={accept}
                    />
                </label>
                <p className="text-sm text-gray-500 mt-4">
                    Supported formats: PDF, DOC, DOCX, TXT • Max file size: {maxFileSize / 1024 / 1024}MB
                </p>
            </div>

            {(error || error2) && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p className="text-sm">{error2 || error}</p>
                </div>
            )}
            {
                (files?.length === 0 && oldFiles) && (
                    <div
                        key={"old File"}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-indigo-50 p-2 rounded">
                                <FileText className="w-6 h-6 text-indigo-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700">Document Uploaded</p>
                                <Link target='_blank' to={oldFiles ? oldFiles : ""} className="text-xs text-gray-500">See File</Link>
                            </div>
                        </div>

                    </div>
                )
            }
            {files.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Uploaded Documents ({files.length})
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-50 p-2 rounded">
                                        <FileText className="w-6 h-6 text-indigo-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                    </div>
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                </div>
                                <button
                                    disabled={disabled}
                                    type='button'
                                    onClick={() => removeFile(index)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    aria-label="Remove file"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}