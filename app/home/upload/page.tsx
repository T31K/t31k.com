'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import { IconCheck, IconCloudUpload, IconAlertCircle, IconLoader2 } from '@tabler/icons-react';

interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  compressionRatio: string;
}

interface UploadResult {
  secure_url: string;
  [key: string]: any;
}

// hello
export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [compressing, setCompressing] = useState<boolean>(false);
  const [addingToDatabase, setAddingToDatabase] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compressionStats, setCompressionStats] = useState<CompressionStats | null>(null);

  useEffect(() => {
    // Remove padding from main element
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const originalPadding = mainElement.style.padding;
      mainElement.style.padding = '0';

      // Cleanup: restore original padding when component unmounts
      return () => {
        mainElement.style.padding = originalPadding;
      };
    }
  }, []);

  const compressPDF = async (file: File): Promise<File> => {
    try {
      setCompressing(true);
      setError(null);

      // Read the PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Get original size
      const originalSize = file.size;

      // Compress by removing metadata and optimizing
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

      // Save the compressed PDF
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });

      // Create a new File object from the compressed bytes
      const compressedFile = new File([compressedPdfBytes], file.name, {
        type: 'application/pdf',
        lastModified: Date.now(),
      });

      const compressedSize = compressedFile.size;
      const compressionRatio = (((originalSize - compressedSize) / originalSize) * 100).toFixed(1);

      setCompressionStats({
        originalSize,
        compressedSize,
        compressionRatio,
      });

      return compressedFile;
    } catch (error) {
      console.error('Compression error:', error);
      setError('Failed to compress PDF. Uploading original file...');
      return file; // Return original file if compression fails
    } finally {
      setCompressing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Reset previous states
    setError(null);
    setUploadResult(null);
    setCompressionStats(null);

    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setError('Please select a PDF file only');
        setSelectedFile(null);
        return;
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setError('File size must be less than 10MB');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Compress the PDF first
      const compressedFile = await compressPDF(selectedFile);

      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('upload_preset', 'pdf_preset'); // Replace with your Cloudinary upload preset
      formData.append('resource_type', 'auto');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dkajkphfp/upload', // Replace with your cloud name
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: any) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      setUploadResult(response.data);

      // Add to database
      setUploading(false);
      setAddingToDatabase(true);

      try {
        await axios.post('https://api.t31k.cloud/home/pdf/new', {
          name: selectedFile.name,
          url: response.data.secure_url,
        });

        // Trigger Vercel rebuild
        try {
          await axios.get('https://api.vercel.com/v1/integrations/deploy/prj_6RMTrASCbvl9WPcfHwCLRH77PiQu/IStYi3q7he');
          console.log('Vercel rebuild triggered');
        } catch (vercelError) {
          console.error('Failed to trigger Vercel rebuild:', vercelError);
          // Don't fail the upload if Vercel trigger fails
        }

        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } catch (dbError: any) {
        console.error('Database error:', dbError);
        setError('Uploaded to cloud but failed to save to database.');
      } finally {
        setAddingToDatabase(false);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error?.message || 'Upload failed. Please try again.');
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setError(null);
    setCompressionStats(null);
    setAddingToDatabase(false);
    const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 -p-4">
      <div className="max-w-lg mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">PDF Upload</h1>
          <p className="text-black text-lg">Upload your PDF files securely to the cloud</p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* File Input Area */}
          <div className="mb-6">
            <label
              htmlFor="pdf-upload"
              className="block w-full cursor-pointer"
            >
              <div
                className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                ${
                  selectedFile
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                }
              `}
              >
                <div className="flex flex-col items-center">
                  {selectedFile ? (
                    <>
                      <IconCheck className="w-12 h-12 text-green-500 mb-3" />
                      <p className="text-black font-medium text-lg">{selectedFile.name}</p>
                      <p className="text-black text-base mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <IconCloudUpload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-black font-medium text-lg mb-1">Tap to select PDF</p>
                      <p className="text-black text-base">Max size: 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading || compressing}
              className={`
                w-full py-3 px-4 rounded-xl font-medium text-lg transition-all duration-200
                ${
                  selectedFile && !uploading && !compressing
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {compressing ? (
                <div className="flex items-center justify-center">
                  <IconLoader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Compressing...
                </div>
              ) : uploading ? (
                <div className="flex items-center justify-center">
                  <IconLoader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Uploading...
                </div>
              ) : (
                'Upload PDF'
              )}
            </button>

            {selectedFile && (
              <button
                onClick={resetUpload}
                disabled={uploading || compressing}
                className="w-full py-3 px-4 rounded-xl font-medium text-lg text-black bg-gray-100 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {compressing && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <IconLoader2 className="animate-spin w-6 h-6 text-blue-500 mr-2" />
              <p className="text-black text-lg font-medium !m-0">Compressing...</p>
            </div>
          </div>
        )}

        {uploading && !compressing && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <IconLoader2 className="animate-spin w-6 h-6 text-blue-500 mr-2" />
              <p className="text-black text-lg font-medium !m-0">Uploading...</p>
            </div>
          </div>
        )}

        {addingToDatabase && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <IconLoader2 className="animate-spin w-6 h-6 text-blue-500 mr-2" />
              <p className="text-black text-lg font-medium !m-0">Adding to database...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <IconAlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <p className="text-black text-lg font-medium !m-0">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {uploadResult && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <IconCheck className="w-6 h-6 text-green-500 mr-2" />
              <p className="text-black text-lg font-medium">Done. Download in iPad (wait 2-3 minutes)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
