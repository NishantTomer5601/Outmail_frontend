"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  CircleUserRound,
  LogOut,
  LayoutDashboard,
  Menu,
  FileText,
  Upload,
  Trash2,
  Eye,
  Search,
  SlidersHorizontal,
  Plus,
  Star,
  MoreHorizontal,
  Mail,
  Package,
  File,
  Users,
  MousePointerClick,
  ShoppingCart,
  HardDrive,
  CheckCircle,
  Square,
  ChevronDown,
  Settings,
  CreditCard,
  Globe,
  MousePointer,
  Paperclip,
  ChevronLeft,
  Calendar,
  Twitter,
  Linkedin,
  Instagram,
  Play,
  User,
  Bell,
  Moon,
  Sun,
  Clock,
  Check,
  Zap,
  Edit,
  Save,
  Phone,
} from "lucide-react";

// **NEW: Modal component for editing an existing template**
const EditTemplateModal = ({ isOpen, onClose, onUpdate, template }) => {
  const [templateName, setTemplateName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  useEffect(() => {
    if (template) {
      setTemplateName(template.title);
      setEmailSubject(template.emailSubject);
      setEmailBody(template.emailBody);
    }
  }, [template]);

  const handleUpdate = () => {
    if (templateName && emailSubject && emailBody) {
      onUpdate({
        ...template,
        title: templateName,
        description: `Subject: ${emailSubject}`,
        emailSubject: emailSubject,
        emailBody: emailBody,
      });
      onClose();
    }
  };

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Template</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Template Name</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              className="w-full p-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Email Subject</label>
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Enter email subject"
              className="w-full p-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Email Body</label>
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Enter email body (HTML allowed, use {{placeholder}} for variables)"
              rows="6"
              className="w-full p-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// Modal component for creating a new template
const CreateTemplateModal = ({ isOpen, onClose, onSave }) => {
  const [templateName, setTemplateName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const handleSave = () => {
    if (templateName && emailSubject && emailBody) {
      onSave({
        id: Date.now(), // Use a unique ID
        icon: <Mail size={20} />, // Default icon for custom email templates
        title: templateName,
        description: `Subject: ${emailSubject}`, // Display the subject as the description
        rating: 0, // No rating initially
        category: "Custom",
        emailSubject: emailSubject,
        emailBody: emailBody,
      });
      setTemplateName("");
      setEmailSubject("");
      setEmailBody("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Template</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Template Name</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              className="w-full p-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Email Subject</label>
            <input
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Enter email subject"
              className="w-full p-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Email Body</label>
            <textarea
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Enter email body (HTML allowed, use {{placeholder}} for variables)"
              rows="6"
              className="w-full p-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// The campaign creation form, extracted and renamed for clarity
const CampaignForm = ({ templates, attachments }) => {
  const [campaignName, setCampaignName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailsManual, setEmailsManual] = useState("");
  const [startTime, setStartTime] = useState("");
  const [selectedCsvFile, setSelectedCsvFile] = useState(null); // Add state for the selected CSV file
  const [endTime, setEndTime] = useState("");
  const [timezone, setTimezone] = useState(
    "(GMT+5:50) Chennai, Kolkata, Mumbai, New Delhi"
  );
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedAttachment, setSelectedAttachment] = useState("");

  const handleTemplateChange = (e) => {
    const templateTitle = e.target.value;
    setSelectedTemplate(templateTitle);
    const selected = templates.find(t => t.title === templateTitle);
    if (selected) {
      setEmailSubject(selected.emailSubject || selected.title);
      setEmailBody(selected.emailBody || selected.description);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedCsvFile(file);
    }
  };


  const handleStartCampaign = () => {
    console.log("Starting Campaign:", {
      campaignName,
      emailSubject,
      emailBody,
      startTime,
      endTime,
      timezone,
      selectedTemplate,
      selectedAttachment
    });
  };
  return (
    <>
      {/* Attachments Heading */}
      <div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-1">Campaign</h1>
          <p className="text-white text-sm sm:text-base">
           Create and Manage your Campaigns
          </p>
        </div>
  
      {/* Create Campaign Card */}
      <div className="mt-15 w-full max-w-7xl bg-white/10 rounded-2xl p-6 text-white border border-white/20 backdrop-blur-lg shadow-md sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
          Create Campaign
        </h1>
  
        {/* Campaign Name Input */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Campaign Name
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder=""
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
  
        {/* Upload CSV or Enter Emails Section */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Upload CSV File or Enter Emails <br />
            <span className="text-sm text-red-500 font-bold font-normal">
              Important: Your file must have a column named "email". If not, email
              addresses will not be fetched and mails will not be sent.
            </span>
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* File Upload Input */}
            <div className="flex-1">
            <label className="w-full flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload size={20} className="text-white mr-2" />
              <span className="text-gray-500">
                {selectedCsvFile ? selectedCsvFile.name : "Choose file"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".csv"
              />
            </label>
            </div>
  
            {/* Manual Email Input */}
            <div className="flex-1">
              <input
                type="text"
                value={emailsManual}
                onChange={(e) => setEmailsManual(e.target.value)}
                placeholder=""
                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          </div>
          <p className="text-sm text-white mt-2">
            CSV should contain name, email, and company columns. Or manually enter
            emails above.
          </p>
        </div>
  
        {/* Template and Attachments Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 ">
          <div className="flex-1 relative">
            <label className="block text-white font-medium mb-2">
              Choose Email Template
            </label>
            <select
              value={selectedTemplate}
              onChange={handleTemplateChange}
              className="w-full p-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none pr-10"
            >
              <option value="" disabled>
                Select a template
              </option>
              {templates.map((t) => (
                <option key={t.id} value={t.title}>
                  {t.title}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 mt-2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <div className="flex-1 relative">
            <label className="block text-white font-medium mb-2">
              Attach File
            </label>
            <select
              value={selectedAttachment}
              onChange={(e) => setSelectedAttachment(e.target.value)}
              className="w-full p-3 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none pr-10"
            >
              <option value="" disabled>
                Select a file
              </option>
              {attachments.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              className="absolute right-3 top-1/2 mt-2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
  
        {/* Attached file display */}
        {selectedAttachment && (
          <div className="flex items-center gap-2 mb-6 p-2 bg-white/10 rounded-lg">
            <File size={20} className="text-white" />
            <p className="text-sm text-white">{selectedAttachment}</p>
          </div>
        )}
  
        {/* Email Subject Input */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Email Subject*
          </label>
          <input
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
  
        {/* Email Body Text Area */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Email Body*
          </label>
          <textarea
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            rows="6"
            placeholder="Hi there,"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition-shadow"
          ></textarea>
          <p className="text-sm text-white mt-2">
            Use personalization variables for better engagement
          </p>
        </div>
  
        {/* Time and Timezone Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Start Time */}
          <div className="flex-1">
            <label className="block text-white font-medium mb-2">
              Start Time*
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>
          </div>
          {/* End Time */}
          <div className="flex-1">
            <label className="block text-white font-medium mb-2"></label>
          </div>
        </div>
  
        {/* Timezone Dropdown */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Timezone*</label>
          <div className="relative">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="appearance-none w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            >
              <option>(GMT+5:50) Chennai, Kolkata, Mumbai, New Delhi</option>
            </select>
            <Globe
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>
  
        {/* Campaign Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Settings size={20} className="text-white" />
            Campaign Details
          </h2>
          <ul className="list-disc list-inside text-white space-y-1">
            <li>Delay between each email</li>
            <li>Emails personalized with name, email, and company</li>
            <li>Fixed HTML template with placeholders</li>
            <li>CSV data stored securely</li>
          </ul>
        </div>
  
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleStartCampaign}
            className="flex-1 w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-purple-400 transition-colors flex items-center justify-center gap-2"
          >
            <Play size={20} />
            Start Campaign
          </button>
          <button className="flex-1 w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <Eye size={20} />
            Preview Email & Check Placeholders
          </button>
        </div>
      </div>
    </>
  );
  
};

const Header = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <div className="">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded hover:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-purple-500 lg:hidden"
        >
          <Menu className="text-white w-5 sm:w-6 h-5 sm:h-6" />
        </button>
        <div>
          <h2 className="text-lg sm:text-xl font-bold"></h2>
        </div>
      </div>
    </div>
  );
};


// Mock ChartComponent for demonstration purposes
const ChartComponent = ({ type, data, title, isMini }) => {
  const chartClass = isMini ? "h-16" : "h-50";
  return (
    <div
      className={`flex items-center justify-center ${chartClass} border border-white text-white bg-white/10 backdrop-blur-md rounded-xl shadow-lg`}
    >
      {title} - {type} Chart Placeholder
    </div>
  );
};

const Card = ({ title, value, percentage, icon }) => {
  const isPositive = percentage.includes("+");
  const percentageColor = isPositive ? "text-green-500" : "text-red-500";

  return (
    <div className="flex items-center justify-between p-6 bg-transparent backdrop-blur-md rounded-xl shadow-lg border border-white/20">
      <div className="flex flex-col">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">
          {value}{" "}
          <span className={`text-lg font-normal ${percentageColor}`}>
            {percentage}
          </span>
        </p>
      </div>
      <div className="p-3 bg-purple-600 rounded-full text-white">{icon}</div>
    </div>
  );
};

// TopHorizontalCards Component
const TopHorizontalCards = () => {
  return (
    <div className="flex flex-col gap-4 font-syne text-white">
     <div className="relative  mt-3 inline-block">
  <select
    className="bg-[#2C2C2C] text-gray-300 px-2   ml-70 sm:px-3 py-1 rounded appearance-none pr-8 text-xs sm:text-sm"
    onChange={() => {}}
  >
    <option value="7 days">7 days</option>
    <option value="15 days">15 days</option>
    <option value="30 days">30 days</option>
  </select>
  
  <div className="pointer-events-none absolute  mr-1 inset-y-0 right-2 flex items-center">
    <ChevronDown className="h-4 w-4 text-gray-300" />
  </div>
</div>
      {/* Card 1: Acceptance Rate */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center justify-center shadow-lg border border-white/10 mt-2">

        <h2 className="text-lg font-semibold text-white mb-1 ">
          Success Rate (total mails sent/total mails scheduled)
        </h2>
        <div className="relative w-28 h-28">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-white/20 stroke-current"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-purple-500 stroke-current"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset="12.56"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-500">95%</span>
          </div>
        </div>
      </div>

      {/* Card 2: Referral Tracking */}
      <div className="rounded-xl p-4 flex flex-col shadow-xl border border-white/20 backdrop-blur-md bg-white/10">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-lg font-semibold text-white">
            Referral Tracking
          </h2>
          <button className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition">
            <MoreHorizontal size={16} className="text-white/80" />
          </button>
        </div>

        <div className="flex flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/60">Invited</p>
            <p className="text-xl font-bold text-white">145</p>
            <p className="text-xs text-white/60 mt-2">Bonus</p>
            <p className="text-xl font-bold text-white">1,465</p>
          </div>

          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-white/20 stroke-current"
                strokeWidth="8"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-green-400 stroke-current"
                strokeWidth="8"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset="17.584"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-green-400">9.3</span>
              <span className="text-[10px] text-white/60">Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SalesOverview Component
const SalesOverview = () => {
  return (
    <div>
      {/* Welcome text */}
      <h2 className="text-2xl font-bold text-white mb-8">Welcome Yash!</h2>
  
      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-xl border border-white/20 col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Company Overview</h3>
          <span className="text-sm text-green-400">+5% more in 2021</span>
          <div className="flex items-center gap-2">
            <button className="p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-sm">
              Jan
            </button>
            <button className="p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-sm">
              Feb
            </button>
            <button className="p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded text-sm">
              Mar
            </button>
          </div>
        </div>
  
        <div className="h-64 mb-1">
          <ChartComponent type="line" title="Sales Overview" />
        </div>
      </div>
    </div>
  );
  
};

// ActiveUsers Component
const ActiveUsers = () => {
  return (
    <div className="bg-white/7 backdrop-blur-md rounded-2xl p-6 text-white shadow-xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Active Users</h3>
        <MoreHorizontal size={20} className="text-white/70" />
      </div>
      <p className="text-sm text-white/70 mb-4">
        <span className="text-green-400">+23</span> from last week
      </p>
      <div className="h-48">
        <ChartComponent type="bar" title="Active Users" />
      </div>
    </div>
  );
};

// Projects Component
const Projects = () => {
  const projects = []; // Empty as per your code

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg border border-white/10 col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Applied Companies</h3>
        <p className="text-sm text-green-400">+30 done this month</p>
        <MoreHorizontal size={20} className="text-white/70" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-2 text-sm text-white/60">COMPANIES</th>
              <th className="px-4 py-2 text-sm text-white/60">MEMBERS</th>
              <th className="px-4 py-2 text-sm text-white/60">BUDGET</th>
              <th className="px-4 py-2 text-sm text-white/60">COMPLETION</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-white/5 last:border-b-0"
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2">
                  <Square size={16} className="text-purple-500" />
                  {project.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-white/80 flex items-center gap-1">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
                    M
                  </span>
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
                    S
                  </span>
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">
                    J
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-white/80">
                  {project.budget}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-white/20 rounded-full h-2.5">
                      <div
                        className="bg-purple-500 h-2.5 rounded-full"
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-white/70">
                      {project.completion}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// OrdersOverview Component
const OrdersOverview = () => {
  const orders = []; // Empty as per your code

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold"> overview</h3>
        <p className="text-sm text-green-400">+30% this month</p>
        <MoreHorizontal size={20} className="text-gray-400" />
      </div>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="flex items-start gap-4 border-b border-gray-800 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="mt-1">
              {index === 0 && (
                <CheckCircle size={20} className="text-green-500" />
              )}
              {index === 1 && <Plus size={20} className="text-red-500" />}
              {index === 2 && (
                <ShoppingCart size={20} className="text-blue-500" />
              )}
              {index === 3 || index === 4 ? (
                <File size={20} className="text-purple-500" />
              ) : null}
              {index === 5 && <Plus size={20} className="text-red-500" />}
            </div>
            <div>
              <p className="text-white font-medium">{order.title}</p>
              <p className="text-sm text-gray-400">{order.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// **Corrected CombinedDashboard Component**
const CombinedDashboard = () => {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      {" "}
      {/* Added overflow-y-auto to allow scrolling within this specific component */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview and Projects (Left side) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SalesOverview />
          <Projects />
        </div>

        {/* Top Cards and Active Users (Right side) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <TopHorizontalCards />
          <ActiveUsers />
        </div>
      </div>
    </div>
  );
};


// PDF Viewer Modal
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


// AttachmentManager Component with corrected confirm logic
const AttachmentManager = ({ attachments, handleUploadAttachment, handleDeleteAttachment, handleViewAttachment }) => {
  const ATTACHMENT_LIMIT = 3;
  const fileInputRef = useRef(null);
  
  const isAttachmentLimitReached = attachments.length >= ATTACHMENT_LIMIT;

  const handleButtonClick = () => {
    if (!isAttachmentLimitReached) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      handleUploadAttachment(file);
      // Reset the file input to allow re-uploading the same file
      event.target.value = null; 
    } else if (file) {
      alert("Please upload a PDF file.");
      event.target.value = null;
    }
  };


  return (
    <div className="p-4 sm:p-6 font-syne mt-6  ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-7 mb-1">Attachments</h1>
          <p className="text-white text-sm sm:text-base">
           Create and Manage your Attachments
          </p>
        </div>
        <button
          onClick={handleButtonClick}
          disabled={isAttachmentLimitReached}
          className={`mt-4 sm:mt-0 text-white font-semibold  py-2 px-4 rounded-lg flex items-center shadow-lg transition duration-200 ease-in-out transform ${
            isAttachmentLimitReached
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 hover:-translate-y-0.5"
          }`}
        >
          <Upload size={18} className="mr-2" />
          {isAttachmentLimitReached ? "Max 3 Allowed" : "Upload Attachment"}
        </button>
         <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".pdf"
        />
      </div>

      {/* Attachments List */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">
          Your Attachments
        </h2>
        {attachments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#2C2C2C]">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2C2C]">
                {attachments.map((attachment) => (
                  <tr key={attachment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {attachment.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {attachment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {attachment.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {attachment.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleViewAttachment(attachment.file)} className="text-purple-400 hover:text-purple-600 mr-4">
                        <Eye size={16} className="inline-block mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteAttachment(attachment.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} className="inline-block mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white">No attachments uploaded yet.</p>
        )}
      </div>
    </div>
  );
};


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



const Templates = ({ templates, handleSaveTemplate, handleUpdateTemplate, handleDeleteTemplate, handleViewTemplate }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const templateLimit = 3;
  const currentCustomTemplates = templates.filter(t => t.category === "Custom");

  const handleCreateTemplate = () => {
    if (currentCustomTemplates.length >= templateLimit) {
      alert("You have reached the maximum limit of 3 custom templates.");
      return;
    }
    setIsCreateModalOpen(true);
  };
  
  const handleEditTemplate = (template) => {
    setTemplateToEdit(template);
    setIsEditModalOpen(true);
  };

  const isTemplateLimitReached = currentCustomTemplates.length >= templateLimit;

  return (
    <div className="p-4 sm:p-6 font-syne">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-10">Templates</h1>
          <p className="text-white text-sm sm:text-base">
            Create and Manage Your templates
          </p>
        </div>
        <button
          onClick={handleCreateTemplate}
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

      <CreateTemplateModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveTemplate}
      />
      
      <EditTemplateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateTemplate}
        template={templateToEdit}
      />

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.length > 0 ? (
            templates.map((template) => (
              <div
                key={template.id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-[#2C2C2C] hover:border-white transition-all duration-300 shadow-md flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-[#2C2C2C] rounded-full mr-3 text-white">
                      {template.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {template.title}
                      </h3>
                      <p className="text-sm text-white mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-white mb-4">
                  {template.rating > 0 && (
                    <>
                      <Star
                        size={16}
                        className="text-yellow-400 mr-1"
                        fill="currentColor"
                      />
                      <span>{template.rating}</span>
                    </>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-auto gap-2">
                  <button
                    onClick={() => handleViewTemplate(template)}
                    className="flex-grow bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center gap-1"
                  >
                    <Eye size={18} /> View
                  </button>
                  
                  {template.category === "Custom" && (
                    <>
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="flex-grow bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center gap-1"
                      >
                        <Edit size={18} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-2 bg-[#2C2C2C] hover:bg-[#3A3A3A] rounded-lg text-red-400 hover:text-red-300 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </div>

              </div>
            ))
          ) : (
            <p className="text-white col-span-full ml-100 mt-60">No templates found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Settings Component
const SettingsComponent = () => {
  // State to manage the user's settings.
  const [profileSettings, setProfileSettings] = useState({
    name: "Yash",
    email: "yash@gmail.com",
    notifications: true,
  });

  // Handle changes in the form inputs.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle the save action for the profile information.
  const handleSave = () => {
    // In a real application, you would send this data to a server.
    console.log("Saving profile settings:", profileSettings);
  };

  return (
    <div className="p-4 sm:p-6 font-syne">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-10">Settings</h1>
          <p className="text-white text-sm sm:text-base">
            Manage your account and email settings
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main content column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <User className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Profile Information
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileSettings.name}
                      onChange={handleChange}
                      className="flex-grow p-3 rounded-lg border border-gray-600 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                    >
                      <Save size={18} />
                      Save
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="text-gray-400" size={20} />
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
                  <p className="text-xs text-gray-400 mt-1">
                    This email will be used for sending all campaigns
                  </p>
                </div>
              </div>
            </div>
{/* Email Scheduling Rules Card
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="text-violet-400" size={24} />
                <h2 className="text-xl font-semibold text-white">
                  Email Scheduling Rules
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-300">
                    Daily Email Limit
                  </span>
                  <div className="mt-2 text-xl font-bold text-white">0/50</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-300">
                    Hourly Email Limit
                  </span>
                  <div className="mt-2 text-xl font-bold text-white">0/20</div>
                </div>
              </div>
            </div> */}

            {/* Optimal Sending Times Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Optimal Sending Times
                </h2>
              </div>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">&#8226;</span>
                  <span>Best time: 9 AM - 11 AM (weekdays)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">&#8226;</span>
                  <span>Avoid weekends and holidays</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">&#8226;</span>
                  <span>Space emails a few minutes apart</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">&#8226;</span>
                  <span>Follow-ups sent only if no reply received</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Preferences Card */}

            {/* Account Status Card */}
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
                <User className="text-gray-400 mb-2" size={40} />
                <span className="text-lg font-bold text-white">Pro Plan</span>
                <span className="text-sm text-gray-400 mt-1">
                  50 emails/day limit
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-500" size={20} />
                  <span>Email campaigns</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-500" size={20} />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-500" size={20} />
                  <span>CSV list upload</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [templates, setTemplates] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [pdfToView, setPdfToView] = useState(null);
  const [isTemplateViewerOpen, setIsTemplateViewerOpen] = useState(false);
  const [templateToView, setTemplateToView] = useState(null);
  const ATTACHMENT_LIMIT = 3;


  const handleSaveTemplate = (newTemplate) => {
    setTemplates([...templates, newTemplate]);
  };

  const handleDeleteTemplate = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this template?");
    if (confirmDelete) {
      const updatedTemplates = templates.filter(template => template.id !== id);
      setTemplates(updatedTemplates);
    }
  };

  const handleUpdateTemplate = (updatedTemplate) => {
    const updatedTemplates = templates.map(t =>
      t.id === updatedTemplate.id ? updatedTemplate : t
    );
    setTemplates(updatedTemplates);
  };

  // NEW handler for viewing a template
  const handleViewTemplate = (template) => {
    setTemplateToView(template);
    setIsTemplateViewerOpen(true);
  };

  const handleCloseTemplateViewer = () => {
    setIsTemplateViewerOpen(false);
    setTemplateToView(null);
  };

  const handleUploadAttachment = (file) => {
    if (attachments.length >= ATTACHMENT_LIMIT) {
      alert("You have reached the maximum limit of 3 attachments.");
      return;
    }
    const newAttachment = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toISOString().slice(0, 10),
      file: file, // Store the actual file object
    };
    setAttachments([...attachments, newAttachment]);
  };

  const handleDeleteAttachment = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attachment?"
    );
    if (!confirmDelete) return;

    const updatedAttachments = attachments.filter(
      (attachment) => attachment.id !== id
    );
    setAttachments(updatedAttachments);
  };
  
  const handleViewAttachment = (file) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPdfToView(fileUrl);
      setIsPdfViewerOpen(true);
    }
  };
  
  const handleClosePdfViewer = () => {
    setIsPdfViewerOpen(false);
    // Clean up the object URL to free up memory
    if (pdfToView) {
      URL.revokeObjectURL(pdfToView);
      setPdfToView(null);
    }
  };

  const ContactForm = () => {
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setShowPopup(true);
      setMessage("");
      setTimeout(() => setShowPopup(false), 3000); // auto close after 3s
    };
    return (

      <>

  <div className="flex-1 space-y-8">
    


    {/* Glassmorphism Card */}
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20  ">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Get In Touch
      </h2>
      
      <p className="text-white mb-8 leading-relaxed">
        Facilisis commodo mattis neque nulla ultrices mattis sed. Ullamcorper
        tempus mattis ac tristique gravida ornare faucibus suspendisse.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-gray-200 font-medium mb-2">
            Your Message
          </label>
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder-gray-300"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition"
        >
          Send Message
        </button>
      </form>
    </div>

    {/* Popup */}
    {showPopup && (
      <div className="fixed top-5 right-5 bg-purple-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn">
        We will get back to you in 24 hours.
      </div>
    )}
  </div>
  </>
);

    
  };

  return (
    <div
      className="relative flex min-h-screen bg-gradient-to-l from-black via-[#6c00ff] to-black text-white font-syne overflow-hidden lg:overflow-visible"
      style={{
        background:
          "radial-gradient(ellipse at center, #6c00ff 0%, #0f0f2d 60%, #000 100%)",
      }}
    >
      {/* Sidebar - fixed and responsive */}
      <aside
        className={`bg-[#0000] text-white p-6 flex flex-col justify-between fixed h-screen z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        }`}
      >
       <div className="flex flex-col">
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl font-bold font-syne">
      Out<span className="text-purple-500">mail</span>
    </h1>
    <button
      onClick={() => setIsSidebarOpen(false)}
      className="lg:hidden p-2 text-white hover:text-purple-400"
    >
      <ChevronLeft size={24} />
    </button>
  </div>
  <div
    className="flex items-center gap-3 mb-6 cursor-pointer"
    onClick={() => {
      setActiveSection("settings");
      setIsSidebarOpen(false);
    }}
  >
    <CircleUserRound className="w-10 h-10 text-white" />
    <div>
      <p className="font-semibold">Yash Sharma</p>
      <span className="text-xs bg-[#2C2C2C] px-2 py-0.5 rounded text-purple-400">
        PRO
      </span>
    </div>
  </div>
  <nav className="space-y-4 mt-10">
    <a
      onClick={() => {
        setActiveSection("dashboard");
        setIsSidebarOpen(false);
      }}
      className={`flex items-center gap-2 transition cursor-pointer ${
        activeSection === "dashboard"
          ? "text-purple-400 font-bold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <LayoutDashboard size={16} /> Dashboard
    </a>
    <a
      onClick={() => {
        setActiveSection("campaign");
        setIsSidebarOpen(false);
      }}
      className={`flex items-center gap-2 transition cursor-pointer ${
        activeSection === "campaign"
          ? "text-purple-400 font-bold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <Mail size={16} /> Campaign
    </a>
    <a
      onClick={() => {
        setActiveSection("attachments");
        setIsSidebarOpen(false);
      }}
      className={`block transition cursor-pointer flex items-center gap-2 ${
        activeSection === "attachments"
          ? "text-purple-400 font-semibold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <Paperclip size={18} />
      Attachments
    </a>
    <a
      onClick={() => {
        setActiveSection("templates");
        setIsSidebarOpen(false);
      }}
      className={`block transition cursor-pointer flex items-center gap-2 ${
        activeSection === "templates"
          ? "text-purple-400 font-semibold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <FileText size={18} />
      Templates
    </a>
    <a
      onClick={() => {
        setActiveSection("settings");
        setIsSidebarOpen(false);
      }}
      className={`block transition cursor-pointer flex items-center gap-2 ${
        activeSection === "settings"
          ? "text-purple-400 font-semibold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <SlidersHorizontal size={18} />
      Settings
    </a>
    <a
      onClick={() => {
        setActiveSection("contact");
        setIsSidebarOpen(false);
      }}
      className={`block transition cursor-pointer flex items-center gap-2 ${
        activeSection === "contact"
          ? "text-purple-400 font-semibold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <Phone size={18} />
      Contact Us
    </a>
  </nav>
</div>
        <div className="mt-auto">
          <a
            href="#"
            className="flex items-center gap-2 text-white hover:text-red-500 transition"
          >
            <LogOut size={16} /> Logout
          </a>
        </div>
      </aside>

      {/* Overlay for small screens to close sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out lg:ml-64 ${
          isSidebarOpen ? "overflow-hidden" : "overflow-x-hidden"
        }`}
      >
        {/* Topbar */}
        <Header setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        {/* Conditional rendering based on activeSection */}
        {activeSection === "dashboard" && <CombinedDashboard />}
        {activeSection === "campaign" && <CampaignForm templates={templates} attachments={attachments} />}
        {activeSection === "attachments" && <AttachmentManager attachments={attachments} handleUploadAttachment={handleUploadAttachment} handleDeleteAttachment={handleDeleteAttachment} handleViewAttachment={handleViewAttachment} />}
        {activeSection === "templates" && <Templates templates={templates} handleSaveTemplate={handleSaveTemplate} handleUpdateTemplate={handleUpdateTemplate} handleDeleteTemplate={handleDeleteTemplate} handleViewTemplate={handleViewTemplate} />}
        {activeSection === "settings" && <SettingsComponent />}
        {activeSection === "contact" && (

          <div className="flex-1 bg-transparent p-8 text-black">
 {/* Heading & Subtext */}
<div className="text-left mb-4">
  <h1 className="text-2xl ml-9 sm:text-3xl text-white font-bold mb-0">
    Contact Us
  </h1>
  <p className="text-white ml-9 text-sm sm:text-base mt-0">
    Fill the form below to get in touch with us. We will respond within 24 hours.
  </p>
</div>



  {/* Main container */}
 <div className="bg-transparent flex flex-col lg:flex-row items-start justify-start p-4 sm:p-6 lg:p-8 font-inter ">
  <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md shadow-lg border border-white/30 rounded-xl p-6 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12  ">
      
      {/* Left Column */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="bg-purple-200 rounded-xl h-64 w-full flex items-center justify-center text-purple-600 text-lg font-semibold">
          Placeholder for Image/Map
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full text-purple-600">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white font-semibold text-lg">Phone Number</p>
            <p className="text-white">+123 456 789 101</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-3 bg-purple-100 rounded-full text-purple-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white font-semibold text-lg">Business Hours</p>
            <p className="text-white">Monday - Friday / 8AM to 5PM</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition duration-200">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition duration-200">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition duration-200">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Right Column */}
      <ContactForm />
    </div>
  </div>
</div>

        )}
      </main>
      <PdfViewerModal
        isOpen={isPdfViewerOpen}
        onClose={handleClosePdfViewer}
        pdfUrl={pdfToView}
      />
      {/* NEW: Render the TemplateViewerModal */}
      <TemplateViewerModal
        isOpen={isTemplateViewerOpen}
        onClose={handleCloseTemplateViewer}
        template={templateToView}
      />
    </div>
  );
}