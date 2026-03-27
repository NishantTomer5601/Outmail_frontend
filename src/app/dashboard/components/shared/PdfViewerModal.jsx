import React from "react";

const PdfViewerModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen || !pdfUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 w-full max-w-4xl h-3/4 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold"
        >
          &times;
        </button>
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="w-full h-full rounded-xl"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default PdfViewerModal;