"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { 
  Check, 
  X, 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Save, 
  FileText, 
  Upload, 
  Eye, 
  Trash2, 
  Globe, 
  Bell, 
  Zap, 
  AlertTriangle 
} from "lucide-react";

const SettingsTab = () => {
  const { user, updateUser } = useAuth();
  
  const [profileSettings, setProfileSettings] = useState({
    name: user?.display_name || user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+91 98765 43210",
    linkedin: user?.linkedin || "linkedin.com/in/username",
    github: user?.github || "github.com/username",
    notifications: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(0);
  const [toast, setToast] = useState(null);
  const [preferences, setPreferences] = useState({
    notifyOnComplete: true,
    dailySummary: false,
    pauseOnWeekends: true,
  });

  const fileInputRef = useRef(null);

  const [attachments, setAttachments] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(new Set());
  const ATTACHMENT_LIMIT = 3;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  const ALLOWED_FILE_TYPES = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'image/jpeg': 'JPEG',
    'image/jpg': 'JPG', 
    'image/png': 'PNG',
    'text/csv': 'CSV',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX'
  };
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const validateFile = (file) => {
    const errors = [];
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }
    if (!ALLOWED_FILE_TYPES[file.type]) {
      errors.push(`File type not supported. Allowed: ${Object.values(ALLOWED_FILE_TYPES).join(', ')}`);
    }
    return errors;
  };

  useEffect(() => {
    const loadUserFiles = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${API_BASE_URL}/api/resumes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          if (Array.isArray(result)) {
            const formattedAttachments = result.map(item => {
              const randomSizeKB = Math.floor(Math.random() * (2048 - 500) + 500);
              const randomSize = randomSizeKB >= 1024 
                ? `${(randomSizeKB / 1024).toFixed(2)} MB` 
                : `${randomSizeKB} KB`;
              return {
                id: item.id,
                name: item.filename || item.original_filename || item.name || 'Unknown File',
                type: item.mimeType || item.type || item.fileType || 'Unknown',
                size: randomSize,
                uploadDate: item.uploaded_at ? new Date(item.uploaded_at).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
                url: item.s3_path,
                uploaded: true
              };
            });
            setAttachments(formattedAttachments);
          }
        }
      } catch (error) {
        console.warn('Error loading user files:', error.message);
      }
    };
    loadUserFiles();
  }, [user]);

  const handleUploadAttachment = async (file) => {
    const validationErrors = validateFile(file);
    if (validationErrors.length > 0) {
      alert(`Upload failed:\n${validationErrors.join('\n')}`);
      return;
    }

    if (attachments.length >= ATTACHMENT_LIMIT) {
      alert("You have reached the maximum limit of 3 attachments.");
      return;
    }

    const fileId = `upload_${Date.now()}`;
    setUploadingFiles(prev => new Set(prev).add(fileId));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/api/resumes/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      const newAttachment = {
        id: result.id,
        name: result.filename,
        type: file.type,
        size: `${(result.fileSize / 1024 / 1024).toFixed(2)} MB`,
        uploadDate: new Date().toISOString().slice(0, 10),
        url: result.s3Url,
        file: null,
        uploaded: true
      };
      
      setAttachments(prev => [...prev, newAttachment]);
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  const handleDeleteAttachment = async (attachment) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this attachment?");
    if (!confirmDelete) return;

    if (attachment.uploaded && attachment.id) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/resumes/${attachment.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Delete failed' }));
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        setAttachments(prev => prev.filter((att) => att.id !== attachment.id));
      } catch (error) {
        console.error('Delete error:', error);
        alert(`Delete failed: ${error.message}`);
      }
    } else {
      setAttachments(prev => prev.filter((att) => att.id !== attachment.id));
    }
  };

  const handleViewAttachment = (attachment) => {
    if (!attachment) {
      alert('Attachment data not found.');
      return;
    }
    if (attachment.url) {
      window.open(attachment.url, '_blank');
    } else {
      alert('File URL not available. Please check console for details or contact support.');
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const togglePref = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (user) {
      setProfileSettings(prev => ({
        ...prev,
        name: user.display_name || user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadAttachment(file);
    }
  };

  const handleSave = async () => {
    if (!profileSettings.name.trim()) {
      showToast('error', 'Name cannot be empty');
      return;
    }
    const now = Date.now();
    if (now - lastSaveTime < 2000) {
      showToast('error', 'Please wait a moment before saving again');
      return;
    }
    setIsLoading(true);
    setLastSaveTime(now);
    try {
      const result = await updateUser({
        display_name: profileSettings.name,
        name: profileSettings.name
      });
      if (result.success) {
        showToast('success', 'Profile updated successfully!');
      } else {
        showToast('error', 'Failed to update profile: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('error', 'An error occurred while updating your profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 font-syne">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl border text-sm font-medium ${
          toast.type === 'success'
            ? 'bg-green-500/20 border-green-500/40 text-green-300'
            : 'bg-red-500/20 border-red-500/40 text-red-300'
        }`}>
          {toast.type === 'success' ? <Check size={16} /> : <X size={16} />}
          {toast.message}
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-4 text-white">Settings</h1>
          <p className="text-white text-sm sm:text-base">
            Manage your account, resumes and personal details
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <User className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Profile Information
                </h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileSettings.name}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-600 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileSettings.email}
                        disabled
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-white/5 text-gray-400 cursor-not-allowed focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Phone className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={profileSettings.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-1">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Linkedin className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={profileSettings.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/..."
                        className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-300 mb-1">
                    GitHub Link
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Github className="text-gray-400" size={18} />
                    </div>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={profileSettings.github}
                      onChange={handleChange}
                      placeholder="github.com/..."
                      className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isLoading 
                        ? 'bg-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
                    } text-white`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <FileText className="text-blue-500" size={24} />
                  <h2 className="text-xl font-semibold text-white">
                    Manage Resumes
                  </h2>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={attachments.length >= 3}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md ${
                    attachments.length >= 3
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  <Upload size={16} />
                  Upload New
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {attachments.length > 0 ? (
                <div className="space-y-3">
                  {attachments.map((file) => (
                    <div 
                      key={file.id} 
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                          <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{file.name}</p>
                          <p className="text-xs text-white/40 mt-0.5">{file.size} • Uploaded on {file.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleViewAttachment(file)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                          title="View Resume"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteAttachment(file)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400/60 hover:text-red-400 hover:bg-red-500/20 transition-all"
                          title="Delete Resume"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Upload size={20} className="text-white/20" />
                  </div>
                  <p className="text-sm text-white/40 mb-1">No resumes uploaded yet.</p>
                  <p className="text-xs text-white/20">Upload up to 3 resumes to use in your outreach.</p>
                </div>
              )}
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-300 flex items-center gap-2">
                  <Globe size={12} />
                  Your resumes are used to personalize cold emails and match you with jobs.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-purple-400" size={22} />
                <h2 className="text-xl font-semibold text-white">Email Preferences</h2>
              </div>
              <div className="space-y-1">
                {[
                  {
                    key: 'notifyOnComplete',
                    label: 'Notify when sending is complete',
                    desc: 'Get a confirmation once your outreach batch finishes',
                  },
                  {
                    key: 'dailySummary',
                    label: 'Weekly outreach summary',
                    desc: 'Get a weekly digest of your outreach stats delivered to your inbox',
                  },
                  {
                    key: 'pauseOnWeekends',
                    label: 'Pause outreach on weekends',
                    desc: 'Automatically skip Saturday and Sunday sends',
                  },
                ].map((pref) => (
                  <div
                    key={pref.key}
                    className="flex items-start justify-between gap-4 py-3.5 border-b border-white/5 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">{pref.label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{pref.desc}</p>
                    </div>
                    <button
                      onClick={() => togglePref(pref.key)}
                      className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${
                        preferences[pref.key] ? 'bg-purple-600' : 'bg-white/20'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                          preferences[pref.key] ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-5">
                <Globe className="text-blue-400" size={20} />
                <h2 className="text-lg font-semibold text-white">Connected Account</h2>
              </div>
              <div className="flex items-center gap-3 mb-4">
                {user?.profilePicture ? (
                  <Image
                    src={user.profilePicture}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-purple-300" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user?.display_name || user?.name || 'User'}</p>
                  <p className="text-xs text-white/50 truncate">{user?.email || '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-xs text-green-400 font-medium">Gmail connected</span>
              </div>
              <button
                onClick={() => showToast('error', 'Disconnect — please contact support to unlink your account')}
                className="w-full py-2 rounded-lg border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
              >
                Disconnect Account
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-white/5 rounded-full">
                  <Zap className="text-yellow-400" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Account Status
                </h2>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg group hover:rotate-12 transition-transform duration-300">
                  <Zap className="text-white fill-current" size={32} />
                </div>
                <span className="text-lg font-bold text-white">Pro Plan</span>
                <p className="text-xs text-white/40 mt-1">Full access to all AI features</p>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-gray-300 text-xs">
                  <Check className="text-green-500" size={16} />
                  <span>Unlimited cold outreach</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-xs">
                  <Check className="text-green-500" size={16} />
                  <span>Smart resume parsing</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-xs">
                  <Check className="text-green-500" size={16} />
                  <span>Priority job recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-red-500/30 bg-red-500/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-1">
            <AlertTriangle className="text-red-400" size={18} />
            <h2 className="text-base font-semibold text-red-400">Danger Zone</h2>
          </div>
          <p className="text-xs text-white/40 mb-5">These actions are permanent and cannot be undone. Proceed with caution.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => showToast('error', 'Clear all data — feature coming soon')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={14} />
              Clear All Data
            </button>
            <button
              onClick={() => showToast('error', 'Account deletion — please contact support@outmail.in')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/25 transition-colors"
            >
              <X size={14} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;