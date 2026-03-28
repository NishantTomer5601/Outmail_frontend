import React, { useState, useEffect } from "react";
import { Plus, Mail, Paperclip, FileText } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { ConfirmDialog } from "@/component/ui/ConfirmDialog";
import ColdOutreachCreateModal from "./ColdOutreachCreateModal";
import ColdOutreachEditModal from "./ColdOutreachEditModal";

const ColdOutreachTab = () => {
  const [coldOutreachTemplates, setColdOutreachTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  
  const TEMPLATE_LIMIT = 3;

  // Load Cold Outreach Templates
  const loadColdOutreachTemplates = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/cold-outreach/templates');
      setColdOutreachTemplates(response.data || []);
    } catch (error) {
      console.error('Error loading cold outreach templates:', error);
      setColdOutreachTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  // Create Cold Outreach Template
  const handleCreateTemplate = async (templateData, files) => {
    try {
      const formData = new FormData();
      formData.append('name', templateData.name);
      formData.append('subject', templateData.subject);
      formData.append('html_content', templateData.html_content);
      
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('attachments', file);
        });
      }

      const response = await api.post('/api/cold-outreach/templates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newTemplate = response.data;
      setColdOutreachTemplates(prev => [...prev, newTemplate]);
      setIsCreateModalOpen(false);
      toast.success('Template created successfully!');
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error(error.response?.data?.error || 'Failed to create template');
    }

  };

  // Update Cold Outreach Template
  const handleUpdateTemplate = async (templateId, templateData, files) => {
    try {
      const formData = new FormData();
      formData.append('name', templateData.name);
      formData.append('subject', templateData.subject);
      formData.append('html_content', templateData.html_content);
      
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('attachments', file);
        });
      }

      const response = await api.put(`/api/cold-outreach/templates/${templateId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedTemplate = response.data;
      setColdOutreachTemplates(prev => 
        prev.map(template => 
          template.id === templateId ? updatedTemplate : template
        )
      );
      setIsEditModalOpen(false);
      setTemplateToEdit(null);
      toast.success('Template updated successfully!');
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error(error.response?.data?.error || 'Failed to update template');
    }
  };

  // Delete Cold Outreach Template
  const handleDeleteTemplate = async (templateId) => {
    setTemplateToDelete(templateId);
    setIsConfirmOpen(true);
  };

  const confirmDeleteTemplate = async () => {
    if (!templateToDelete) return;
    try {
      await api.delete(`/api/cold-outreach/templates/${templateToDelete}`);
      setColdOutreachTemplates(prev => 
        prev.filter(template => template.id !== templateToDelete)
      );
      toast.success('Template deleted successfully!');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error(error.response?.data?.error || 'Failed to delete template');
    } finally {
      setTemplateToDelete(null);
    }
  };

  // Set Active Template
  const handleSetActiveTemplate = async (templateId) => {
    try {
      await api.put(`/api/cold-outreach/templates/${templateId}/activate`);
      await loadColdOutreachTemplates();
      toast.success('Template activated successfully!');
    } catch (error) {
      console.error('Error activating template:', error);
      toast.error(error.response?.data?.error || 'Failed to activate template');
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadColdOutreachTemplates();
  }, []);

  const handleCreateNew = () => {
    if (coldOutreachTemplates.length >= TEMPLATE_LIMIT) {
      return;
    }
    setIsCreateModalOpen(true);
  };

  const handleEditTemplate = (template) => {
    setTemplateToEdit(template);
    setIsEditModalOpen(true);
  };

  const isTemplateLimitReached = coldOutreachTemplates.length >= TEMPLATE_LIMIT;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none px-2 sm:px-6 md:px-10 py-6 font-syne">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-10">Cold Outreach</h1>
          <p className="text-white text-sm sm:text-base">
            Create and manage outreach templates with attachments
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          disabled={isTemplateLimitReached}
          className={`mt-4 sm:mt-0 text-white font-semibold py-2 px-4 rounded-lg flex items-center shadow-lg transition duration-200 ease-in-out transform ${
            isTemplateLimitReached
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 hover:-translate-y-0.5"
          }`}
        >
          <Plus size={20} className="mr-2" />
          {isTemplateLimitReached ? "Max 3 Allowed" : "Create Template"}
        </button>
      </div>

      <div className="w-full">
        {coldOutreachTemplates.length > 0 ? (
          coldOutreachTemplates.map((template) => (
            <div
              key={template.id}
              className={`mb-6 w-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg p-6 rounded-2xl border transition-all duration-300 shadow-lg ${
                template.is_active 
                  ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-green-500/5 shadow-green-500/25' 
                  : 'border-purple-500/30'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-8 w-full">
                <div className="lg:w-1/3 w-full border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl text-white ${
                      template.is_active ? 'bg-green-500' : 'bg-purple-600'
                    }`}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {template.name}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {template.subject}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300">
                      {template.category || "General"}
                    </span>
                  </div>

                  <div className="text-xs text-gray-400">
                    <p>Created: {formatDate(template.created_at)}</p>
                    <p>Updated: {formatDate(template.updated_at)}</p>
                  </div>

                  {template.attachments && template.attachments.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
                        <Paperclip size={14} className="inline-block text-purple-300" /> Attachments
                      </h5>
                      <div className="flex flex-col gap-2">
                        {template.attachments.map((attachment) => (
                          <a
                            key={attachment.id}
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xs text-purple-100 hover:bg-purple-500/10 transition group"
                          >
                            <FileText size={15} className="text-purple-300 group-hover:text-purple-400" />
                            <span className="truncate flex-1">{attachment.original_filename}</span>
                            <span className="text-[10px] text-gray-400 ml-2">{(attachment.file_size / 1024 / 1024).toFixed(2)} MB</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2">
                      Preview
                    </h4>
                    <div
                      className="whitespace-pre-wrap text-sm text-gray-200 bg-black/30 p-4 rounded-xl"
                    >
                      {template.html_content}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleSetActiveTemplate(template.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                    >
                      Set Active
                    </button>

                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-white">No templates yet</p>
          </div>
        )}
      </div>

      <ColdOutreachCreateModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateTemplate}
      />
      
      <ColdOutreachEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setTemplateToEdit(null);
        }}
        onUpdate={handleUpdateTemplate}
        template={templateToEdit}
      />

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setTemplateToDelete(null);
        }}
        onConfirm={confirmDeleteTemplate}
        title="Delete Template?"
        description="Are you sure you want to delete this template? This will also delete all its attachments. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ColdOutreachTab;