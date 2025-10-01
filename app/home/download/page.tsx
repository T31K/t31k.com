'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconFileTypePdf, IconChevronLeft, IconChevronRight, IconLoader2, IconAlertCircle } from '@tabler/icons-react';

interface PDF {
  id: number;
  name: string;
  url: string;
  created_at: string;
}

interface PDFResponse {
  page: number;
  total: number;
  totalPages: number;
  pdfs: PDF[];
}

export default function DownloadPage() {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchPDFs(currentPage);
  }, [currentPage]);

  const fetchPDFs = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<PDFResponse>(`https://api.t31k.cloud/home/pdfs?page=${page}`);
      setPdfs(response.data.pdfs);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
    } catch (err: any) {
      console.error('Error fetching PDFs:', err);
      setError('Failed to load PDFs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">PDF Downloads</h1>
          <p className="text-black text-lg">Browse and download your PDF files</p>
          {total > 0 && <p className="text-black text-base mt-2">Total PDFs: {total}</p>}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-6">
            <div className="flex flex-col items-center justify-center">
              <IconLoader2 className="animate-spin w-12 h-12 text-blue-500 mb-4" />
              <p className="text-black text-lg font-medium">Loading PDFs...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <IconAlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <p className="text-black text-lg font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* PDF List */}
        {!loading && !error && pdfs.length > 0 && (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="space-y-3">
                {pdfs.map((pdf) => (
                  <a
                    key={pdf.id}
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <IconFileTypePdf className="w-8 h-8 text-red-500 flex-shrink-0 mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="text-black text-lg font-medium truncate">{pdf.name}</p>
                        <p className="text-gray-600 text-sm">{formatDate(pdf.created_at)}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="text-blue-500 text-base font-medium">Open →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium text-lg transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <IconChevronLeft className="w-5 h-5 mr-1" />
                    Previous
                  </button>

                  <div className="flex items-center space-x-2">
                    <span className="text-black text-lg font-medium">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium text-lg transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Next
                    <IconChevronRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && pdfs.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <IconFileTypePdf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">No PDFs Found</h2>
            <p className="text-black text-lg">Upload some PDFs to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
