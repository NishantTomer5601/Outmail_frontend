import React from "react";

const TemplateViewerModal = ({ isOpen, onClose, template }) => {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 w-full max-w-4xl h-3/4 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold"
        >
          &times;
        </button>
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold text-white mb-2">{template.title}</h2>
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Subject: {template.emailSubject}</h3>
          <div
            className="text-white prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: template.emailBody }}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateViewerModal;