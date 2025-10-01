'use client';

import pdfData from '@/public/pdf.json';

interface PDF {
  id: string;
  name: string;
  url: string;
  created_at: string;
}

export default function DownloadPage() {
  const allPdfs: PDF[] = pdfData.pdfs || [];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">PDFs</h1>

        {allPdfs.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {allPdfs.map((pdf) => (
              <a
                key={pdf.id}
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between p-3 hover:bg-gray-50"
              >
                <span className="text-black text-lg">{pdf.name}</span>
                <span className="text-blue-500 text-lg">Open</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-black text-lg">No PDFs</p>
          </div>
        )}
      </div>
    </div>
  );
}
