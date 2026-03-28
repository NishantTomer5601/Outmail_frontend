import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

const ColdOutreachEditModal = ({ isOpen, onClose, onUpdate, template }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    html_content: '',
    category: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Update form data when template changes
  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name || '',
        subject: template.subject || '',
        html_content: template.html_content || '',
        category: template.category || ''
      });
    }
  }, [template]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const currentAttachmentCount = template?.attachments?.length || 0;
    
    if (currentAttachmentCount + files.length + selectedFiles.length > 3) {
      toast.warning("Maximum 3 attachments allowed per template.");
      return;
    }

    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.subject.trim() || !formData.html_content.trim() || !formData.category) {
      return;
    }

    setLoading(true);
    try {
      await onUpdate(template.id, formData, files);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Edit Cold Outreach Template</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Template Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-black/20 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter template name"
              required
              minLength={3}
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full bg-black/20 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter email subject"
              required
              minLength={3}
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Template Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-black/20 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              required
            >
              <option value="" className="text-gray-400">Select template category</option>
              <option value="technical" className="text-white">Technical</option>
              <option value="non-technical" className="text-white">Non-Technical</option>
              <option value="core" className="text-white">Core</option>
              <option value="operations" className="text-white">Operations</option>
              <option value="sales" className="text-white">Sales</option>
              <option value="marketing" className="text-white">Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Body (HTML) *
            </label>
            <textarea
              name="html_content"
              value={formData.html_content}
              onChange={handleInputChange}
              rows={8}
              className="w-full bg-black/20 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter email body HTML content"
              required
              minLength={10}
            />
          </div>

          {/* Current Attachments */}
          {template.attachments && template.attachments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Current Attachments ({template.attachments.length}/3)
              </label>
              <div className="space-y-1 mb-3">
                {template.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between bg-black/20 p-2 rounded">
                    <span className="text-sm text-gray-300">{attachment.original_filename}</span>
                    <span className="text-xs text-gray-400">
                      {(attachment.file_size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Add New Attachments
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.doc,.docx,.txt"
              className="w-full bg-black/20 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
            />
            {files.length > 0 && (
              <div className="mt-2 space-y-1">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-black/20 p-2 rounded">
                    <span className="text-sm text-gray-300">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                  Updating...
                </>
              ) : (
                'Update Template'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColdOutreachEditModal;