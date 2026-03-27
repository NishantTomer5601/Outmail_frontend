import React, { useState, useRef } from "react";
import { X } from "lucide-react";

const ColdOutreachCreateModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    html_content: '',
    category: ''
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 3) {
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
      await onSave(formData, files);
      // Reset form only on success
      setFormData({ name: '', subject: '', html_content: '', category: '' });
      setFiles([]);
    } catch (error) {
      // Don't reset form on error - keep user data
      console.error('Error saving template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', subject: '', html_content: '', category: '' });
    setFiles([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Create Cold Outreach Template</h2>
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

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Attachments (Max 3 files, 10MB each)
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
                  Creating...
                </>
              ) : (
                'Create Template'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColdOutreachCreateModal;