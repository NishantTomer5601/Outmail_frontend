"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
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
  TrendingUp,
  DollarSign,
  Briefcase,
  MapPin,
  Building,
  ExternalLink,
  X,
} from "lucide-react";

// Funding Trends Component
const FundingTrends = ({ selectedPeriod, onPeriodChange }) => {
  const [fundingData, setFundingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState('bar'); // 'bar' or 'pie'

  // Mock API call function - replace with your actual API call
  const fetchFundingData = async (period) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data - replace with your actual API endpoint
    const mockData = {
      '7': [
        { industry: 'FinTech', amount: 420, color: '#8B5CF6' },
        { industry: 'HealthTech', amount: 380, color: '#06B6D4' },
        { industry: 'EdTech', amount: 290, color: '#10B981' },
        { industry: 'CleanTech', amount: 180, color: '#F59E0B' },
        { industry: 'AI/ML', amount: 350, color: '#EF4444' },
        { industry: 'SaaS', amount: 410, color: '#8B5CF6' }
      ],
      '15': [
        { industry: 'FinTech', amount: 650, color: '#8B5CF6' },
        { industry: 'HealthTech', amount: 580, color: '#06B6D4' },
        { industry: 'EdTech', amount: 390, color: '#10B981' },
        { industry: 'CleanTech', amount: 280, color: '#F59E0B' },
        { industry: 'AI/ML', amount: 520, color: '#EF4444' },
        { industry: 'SaaS', amount: 610, color: '#8B5CF6' }
      ],
      '30': [
        { industry: 'FinTech', amount: 980, color: '#8B5CF6' },
        { industry: 'HealthTech', amount: 840, color: '#06B6D4' },
        { industry: 'EdTech', amount: 620, color: '#10B981' },
        { industry: 'CleanTech', amount: 450, color: '#F59E0B' },
        { industry: 'AI/ML', amount: 780, color: '#EF4444' },
        { industry: 'SaaS', amount: 890, color: '#8B5CF6' }
      ]
    };
    
    setFundingData(mockData[period] || mockData['7']);
    setLoading(false);
  };

  useEffect(() => {
    fetchFundingData(selectedPeriod);
  }, [selectedPeriod]);

  const formatAmount = (amount) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}T`;
    }
    return `$${amount}B`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-lg border border-white/20">
          <p className="text-gray-800 font-semibold">{label}</p>
          <p className="text-purple-600 font-bold">
            {formatAmount(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const topThreeIndustries = [...fundingData]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const totalFunding = fundingData.reduce((acc, d) => acc + d.amount, 0);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white shadow-xl border border-white/20 h-full flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-1.5">
            <TrendingUp size={14} className="text-green-400" />
            Industry Funding Trends
          </h3>
          <p className="text-[10px] text-white/50 mt-0.5">
            Last {selectedPeriod} days · Total&nbsp;
            <span className="text-green-400 font-bold">{formatAmount(totalFunding)}</span>
          </p>
        </div>
        <button
          onClick={() => setViewType(viewType === 'bar' ? 'pie' : 'bar')}
          className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          title={`Switch to ${viewType === 'bar' ? 'pie' : 'bar'} chart`}
        >
          <MoreHorizontal size={14} />
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-white"></div>
        </div>
      ) : (
        <>
          {/* Chart Section */}
          <div className="flex-1 min-h-0 mb-2" style={{ minHeight: '180px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {viewType === 'bar' ? (
                <BarChart data={fundingData} margin={{ top: 4, right: 4, bottom: 30, left: -10 }} barCategoryGap="15%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="industry"
                    tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 9 }}
                    angle={-35}
                    textAnchor="end"
                    height={45}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 9 }}
                    tickFormatter={formatAmount}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={52}>
                    {fundingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={fundingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={28}
                    outerRadius={58}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {fundingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Top 3 Industries — compact chips */}
          <div className="border-t border-white/10 pt-2">
            <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5">Top Funded</p>
            <div className="flex flex-wrap gap-1.5">
              {topThreeIndustries.map((industry, index) => (
                <div
                  key={industry.industry}
                  className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-0.5 border border-white/10"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: industry.color }}
                  />
                  <span className="text-[10px] text-white/70">{industry.industry}</span>
                  <span className="text-[10px] font-bold text-green-400">{formatAmount(industry.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// **NEW: Modal component for editing an existing template**
const EditTemplateModal = ({ isOpen, onClose, onUpdate, template }) => {
  const [templateName, setTemplateName] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  useEffect(() => {
    if (template) {
      setTemplateName(template.title || template.name || "");
      setEmailSubject(template.emailSubject || template.subject || "");
      setEmailBody(template.emailBody || template.html_content || "");
    }
  }, [template]);

  const handleUpdate = () => {
    // Validate according to backend requirements
    if (!templateName || templateName.trim().length < 3 || templateName.trim().length > 100) {
      alert('Template name must be between 3-100 characters');
      return;
    }
    
    if (!emailSubject || emailSubject.trim().length < 3 || emailSubject.trim().length > 200) {
      alert('Email subject must be between 3-200 characters');
      return;
    }
    
    if (!emailBody || emailBody.trim().length < 10) {
      alert('Email body must be at least 10 characters');
      return;
    }

    console.log('📝 EditModal sending data:', {
      id: template.id,
      title: templateName.trim(),
      emailSubject: emailSubject.trim(),
      emailBody: emailBody.trim()
    });

    onUpdate({
      ...template,
      title: templateName.trim(),
      description: `Subject: ${emailSubject.trim()}`,
      emailSubject: emailSubject.trim(),
      emailBody: emailBody.trim(),
    });
    onClose();
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

// TopHorizontalCards Component
// Outreach Stat Pills — Row 1 of new overview
const OutreachStatPills = ({ selectedPeriod }) => {
  // Maintain ratio for 7, 15, 30 days
  const sentByPeriod = { '7': '40', '15': '81', '30': '159' };
  const companiesByPeriod = { '7': '8', '15': '16', '30': '30' };
  const stats = [
    {
      label: `Emails Sent (${selectedPeriod}d)`,
      value: sentByPeriod[selectedPeriod] || '40',
      icon: Mail,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/25',
    },
    {
      label: 'Total Emails Sent',
      value: '380',
      icon: TrendingUp,
      color: 'text-green-400',
      bg: 'bg-green-500/15',
      border: 'border-green-500/25',
    },
    {
      label: 'Companies Targeted',
      value: companiesByPeriod[selectedPeriod] || '8',
      icon: Building,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/15',
      border: 'border-cyan-500/25',
    },
    {
      label: 'Active Template',
      value: 'Tech Outreach',
      icon: FileText,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/25',
      truncate: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bg} ${stat.border} border backdrop-blur-md rounded-xl p-3 flex items-center gap-3`}
        >
          <div className="p-2 rounded-lg bg-white/10 flex-shrink-0">
            <stat.icon size={15} className={stat.color} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-white/50 uppercase tracking-wide leading-tight">{stat.label}</p>
            <p className={`text-sm font-bold mt-0.5 ${stat.color} ${stat.truncate ? 'truncate' : ''}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Hiring Spotlight — compact companies actively hiring
const HiringSpotlight = () => {
  const hiringCompanies = [
    { name: 'Swiggy', industry: 'FoodTech', roles: 10, badge: 'hot', badgeColor: 'bg-red-500/20 text-red-400' },
    { name: 'Paytm', industry: 'FinTech', roles: 8, badge: 'new', badgeColor: 'bg-green-500/20 text-green-400' },
    { name: 'Meesho', industry: 'E-commerce', roles: 7, badge: 'hot', badgeColor: 'bg-red-500/20 text-red-400' },
    { name: 'CRED', industry: 'FinTech', roles: 6, badge: 'new', badgeColor: 'bg-green-500/20 text-green-400' },
    { name: 'Razorpay', industry: 'FinTech', roles: 5, badge: 'hot', badgeColor: 'bg-red-500/20 text-red-400' },
    { name: 'Flipkart', industry: 'E-commerce', roles: 4, badge: '', badgeColor: '' },
    { name: 'Zepto', industry: 'Quick Commerce', roles: 3, badge: '', badgeColor: '' },
    { name: 'Zomato', industry: 'FoodTech', roles: 2, badge: '', badgeColor: '' }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Briefcase size={13} className="text-amber-400" />
            Companies Hiring Now
          </h3>
          <p className="text-[11px] text-white/40">Based on your targeted sectors</p>
        </div>
        <span className="text-[10px] text-white/30">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
      <div className="flex-1 overflow-hidden space-y-1">
        {hiringCompanies.map((company, i) => (
          <div
            key={company.name}
            className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/50 font-bold flex-shrink-0">
                {i + 1}
              </span>
              {/* No logo, only company name */}
              <div className="min-w-0">
                <span className="text-xs font-semibold text-white">{company.name}</span>
                <span className="text-[10px] text-white/40 ml-1.5">{company.industry}</span>
              </div>
              {company.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${company.badgeColor}`}>
                  {company.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] text-white/50 flex-shrink-0">{company.roles} roles</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recent Outreach Feed — last 5 emails sent
const RecentOutreachFeed = () => {
  const activities = [
    { company: 'Swiggy', template: 'Tech Outreach', time: '1h ago' },
    { company: 'Paytm', template: 'Tech Outreach', time: '2h ago' },
    { company: 'Meesho', template: 'Tech Outreach', time: '3h ago' },
    { company: 'CRED', template: 'Tech Outreach', time: '4h ago' },
    { company: 'Razorpay', template: 'Tech Outreach', time: '5h ago' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 h-full flex flex-col">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
          <Clock size={13} className="text-cyan-400" />
          Recent Outreach
        </h3>
        <p className="text-[11px] text-white/40">Last 5 emails sent</p>
      </div>
      <div className="flex-1 overflow-hidden space-y-1">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-0"
          >
            <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Mail size={12} className="text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{activity.company}</p>
              <p className="text-[10px] text-white/40 truncate">{activity.template}</p>
            </div>
            <span className="text-[10px] text-white/35 flex-shrink-0">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hot Hiring News component — clickable articles from the hiring market
const HotHiringNews = () => {
  const news = [
    {
      id: 1,
      headline: 'OpenAI plans to triple engineering headcount in 2026',
      source: 'TechCrunch',
      tag: 'AI Hiring',
      tagColor: 'bg-purple-500/20 text-purple-300',
      time: '2h ago',
      url: 'https://techcrunch.com/2024/01/16/openai-hiring/',
    },
    {
      id: 2,
      headline: 'Stripe doubles down on India with 400 new roles in Bangalore',
      source: 'Economic Times',
      tag: 'FinTech',
      tagColor: 'bg-green-500/20 text-green-300',
      time: '5h ago',
      url: 'https://economictimes.indiatimes.com/tech/startups/stripe-india-hiring',
    },
    {
      id: 3,
      headline: 'Google lays off 200 in cloud, pivots to AI infrastructure roles',
      source: 'Bloomberg',
      tag: 'Big Tech',
      tagColor: 'bg-red-500/20 text-red-300',
      time: '8h ago',
      url: 'https://bloomberg.com/news/articles/2024-google-cloud-layoffs',
    },
    {
      id: 4,
      headline: 'Y Combinator startups on hiring spree — 1,200 roles open across W25 batch',
      source: 'YC Blog',
      tag: 'Startup',
      tagColor: 'bg-amber-500/20 text-amber-300',
      time: '1d ago',
      url: 'https://ycombinator.com/jobs',
    },
    {
      id: 5,
      headline: 'Razorpay seeks ML engineers as it expands into SEA markets',
      source: 'Inc42',
      tag: 'FinTech',
      tagColor: 'bg-green-500/20 text-green-300',
      time: '1d ago',
      url: 'https://inc42.com/buzz/razorpay-ml-expansion/',
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Zap size={13} className="text-yellow-400" />
            Hot in the Hiring Market
          </h3>
          <p className="text-[11px] text-white/40">Click any article to read more</p>
        </div>
        <span className="text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-1.5 py-0.5 rounded">Live</span>
      </div>
      <div className="flex flex-col gap-0 flex-1 overflow-hidden">
        {news.map((item, i) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-start gap-2.5 py-2.5 ${
              i < news.length - 1 ? 'border-b border-white/5' : ''
            } group cursor-pointer`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-white/90 leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
                {item.headline}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${item.tagColor}`}>{item.tag}</span>
                <span className="text-[10px] text-white/35">{item.source}</span>
                <span className="text-[10px] text-white/25">·</span>
                <span className="text-[10px] text-white/35">{item.time}</span>
              </div>
            </div>
            <ExternalLink size={11} className="text-white/20 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" />
          </a>
        ))}
      </div>
    </div>
  );
};

// **Redesigned CombinedDashboard — properly boxed, scrollable overview**
const CombinedDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('7');

  return (
    <div className="flex flex-col p-5 gap-4 pb-8">
      {/* Row 1: Welcome + Period Selector + Stat Pills */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            Welcome back,{' '}
            <span className="text-purple-400">{user?.display_name || user?.name || 'User'}</span> 
          </h2>
          <div className="relative inline-block">
            <select
              className="bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg appearance-none pr-7 text-xs border border-white/10"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7">Last 7 days</option>
              <option value="15">Last 15 days</option>
              <option value="30">Last 30 days</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>
        </div>
        <OutreachStatPills selectedPeriod={selectedPeriod} />
      </div>

      {/* Row 2: Industry Funding Trends (left, wider 3/5) + Hot Hiring News (right 2/5) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3" style={{ minHeight: '340px' }}>
          <FundingTrends selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
        </div>
        <div className="lg:col-span-2" style={{ minHeight: '340px' }}>
          <HotHiringNews />
        </div>
      </div>

      {/* Row 3: Companies Hiring Now (left) + Recent Outreach Feed (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div style={{ minHeight: '240px' }}>
          <HiringSpotlight />
        </div>
        <div style={{ minHeight: '240px' }}>
          <RecentOutreachFeed />
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

// Mentorship Section Component
const MentorshipSection = () => {
  const [showArchivedSessions, setShowArchivedSessions] = useState(false);


  // Active sessions (currently happening)
  const activeSessions = [
    {
      id: 1,
      mentorName: "Ankit Sharma",
      mentorTitle: "SDE 1 at Swiggy",
      mentorImage: "https://randomuser.me/api/portraits/men/11.jpg",
      sessionDate: "Mar 21, 2026", // Today (Live session)
      sessionTime: "2:00 PM - 3:00 PM",
      sessionTopic: "Cracking Product Companies as a Fresher",
      sessionType: "Q&A",
      whyThisMentor: "Learn how to prepare for SDE roles at top Indian startups.",
      status: "active"
    },
    {
      id: 2,
      mentorName: "Priya Iyer",
      mentorTitle: "SDE 2 at Paytm",
      mentorImage: "https://randomuser.me/api/portraits/women/22.jpg",
      sessionDate: "Mar 21, 2026", // Today (Live session)
      sessionTime: "10:00 AM - 11:00 AM",
      sessionTopic: "Technical Interview Preparation",
      sessionType: "Group Session",
      whyThisMentor: "Get tips on DSA, system design, and Paytm's hiring process.",
      status: "active"
    }
  ];

  // Calculate next week's dates
  const getNextWeekDate = (daysFromToday = 7) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Upcoming sessions
  const upcomingSessions = [
    {
      id: 3,
      mentorName: "Rahul Verma",
      mentorTitle: "Senior Engineer at PhonePe",
      mentorImage: "https://randomuser.me/api/portraits/men/33.jpg",
      sessionDate: getNextWeekDate(7),
      sessionTime: "4:00 PM - 5:00 PM",
      sessionTopic: "Career Growth & Performance Reviews",
      sessionType: "Q&A",
      whyThisMentor: "Understand what it takes to get promoted at Indian product companies.",
      status: "upcoming"
    },
    {
      id: 4,
      mentorName: "Sneha Agarwal",
      mentorTitle: "SDE 1 at Meesho",
      mentorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      sessionDate: getNextWeekDate(9),
      sessionTime: "6:00 PM - 7:00 PM",
      sessionTopic: "Entrepreneurship & Fundraising",
      sessionType: "Workshop",
      whyThisMentor: "Covers how Indian startups build their first engineering and operations team.",
      status: "upcoming"
    }
  ];

  // Archived/Past sessions
  const archivedSessions = [
    {
      id: 5,
      mentorName: "Vikram Singh",
      mentorTitle: "SDE 2 at Razorpay",
      mentorImage: "https://randomuser.me/api/portraits/men/53.jpg",
      sessionDate: "Feb 10, 2026",
      sessionTime: "3:00 PM - 4:00 PM",
      sessionTopic: "Scaling Engineering Teams in Fintech",
      sessionType: "Workshop",
      whyThisMentor: "Real frameworks used at Razorpay to grow engineering teams.",
      status: "past"
    },
    {
      id: 6,
      mentorName: "Aishwarya Nair",
      mentorTitle: "Principal Engineer at Zepto",
      mentorImage: "https://randomuser.me/api/portraits/women/66.jpg",
      sessionDate: "Feb 8, 2026",
      sessionTime: "1:00 PM - 2:00 PM",
      sessionTopic: "Content Strategy & User Experience in Indian Startups",
      sessionType: "Group Session",
      whyThisMentor: "Directly applicable to product roles at Indian consumer tech companies.",
      status: "past"
    },
    {
      id: 7,
      mentorName: "Rohan Gupta",
      mentorTitle: "Software Engineer at Flipkart",
      mentorImage: "https://randomuser.me/api/portraits/men/77.jpg",
      sessionDate: "Feb 5, 2026",
      sessionTime: "11:00 AM - 12:00 PM",
      sessionTopic: "Machine Learning in Indian E-commerce",
      sessionType: "Workshop",
      whyThisMentor: "Practical ML deployment knowledge for Indian e-commerce interviews.",
      status: "past"
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'past': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSessionTypeBadge = (type) => {
    switch (type) {
      case 'Group Session': return 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
      case 'Workshop': return 'bg-orange-500/20 text-orange-300 border border-orange-500/30';
      case 'Q&A': return 'bg-teal-500/20 text-teal-300 border border-teal-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border border-gray-500/30';
    }
  };

  const getSessionTypeLabel = (type) => {
    switch (type) {
      case 'Q&A': return '💬 Ask Me Anything';
      case 'Group Session': return '👥 Group Session';
      case 'Workshop': return '🛠 Workshop';
      default: return type;
    }
  };

  const renderSessionCard = (session) => (
    <div
      key={session.id}
      className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white">{session.mentorName}</h3>
            <p className="text-xs text-white/60">{session.mentorTitle}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
          <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold capitalize ${getStatusStyle(session.status)}`}>
            {session.status}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getSessionTypeBadge(session.sessionType)}`}>
            {getSessionTypeLabel(session.sessionType)}
          </span>
        </div>
      </div>

      {/* Why this mentor */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2 mb-4">
        <p className="text-xs text-purple-200 leading-relaxed">
          <span className="font-semibold text-purple-300">Why attend: </span>
          {session.whyThisMentor}
        </p>
      </div>

      {/* Session Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-white/70">
          <Calendar size={14} />
          <span className="text-sm">{session.sessionDate} · {session.sessionTime}</span>
        </div>
        <div className="flex items-start gap-2 text-white/70">
          <FileText size={14} className="mt-0.5 shrink-0" />
          <p className="text-sm font-medium text-white/90">{session.sessionTopic}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {session.status === 'past' ? (
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Play size={14} /> Watch Recording
          </button>
        ) : session.status === 'active' ? (
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <ExternalLink size={14} /> Join Now
          </button>
        ) : (
          <>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
              <Eye size={14} /> View Details
            </button>
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
              <Plus size={14} /> Book Slot
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 font-syne">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-10 text-white">Mentorship</h1>
          <p className="text-white/60 text-sm sm:text-base">
            Learn from leaders at companies actively hiring — sharpen your edge before you reach out
          </p>
        </div>
      </div>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-green-400">Live Now</h2>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSessions.map(renderSessionCard)}
          </div>
        </div>
      )}


      {/* Upcoming Sessions */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400">Upcoming</h2>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingSessions.map(renderSessionCard)}
        </div>
      </div>

      {/* Archived Sessions — collapsible inline */}
      <div>
        <button
          onClick={() => setShowArchivedSessions(prev => !prev)}
          className="flex items-center gap-3 w-full text-left mb-4 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-300 transition-colors">
            Past Sessions
          </h2>
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-gray-400 group-hover:text-gray-300 transition-colors text-xs font-medium">
            {showArchivedSessions ? '▲ Hide' : '▼ Show'}
          </span>
        </button>
        {showArchivedSessions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archivedSessions.map(renderSessionCard)}
          </div>
        )}
      </div>
    </div>
  );
};

// Cold Outreach Component - combines templates + attachments management
const ColdOutreach = () => {
  const [coldOutreachTemplates, setColdOutreachTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);
  const [uploadingFiles, setUploadingFiles] = useState(new Set());
  const [activatingTemplate, setActivatingTemplate] = useState(null); // Track which template is being activated
  
  const TEMPLATE_LIMIT = 3;
  const ATTACHMENT_LIMIT_PER_TEMPLATE = 3;

  // Load Cold Outreach Templates
  const loadColdOutreachTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cold-outreach/templates`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const templates = await response.json();
        setColdOutreachTemplates(templates);
      } else if (response.status === 401) {
        window.location.href = '/';
      } else {
        // Gracefully handle errors - don't show alerts, just log
        console.error('Failed to load cold outreach templates:', response.status);
        // Keep templates as empty array - UI will show empty state
        setColdOutreachTemplates([]);
      }
    } catch (error) {
      console.error('Error loading cold outreach templates:', error);
      // Keep templates as empty array - UI will show empty state
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
      
      // Add files
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('attachments', file);
        });
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cold-outreach/templates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        const newTemplate = await response.json();
        setColdOutreachTemplates(prev => [...prev, newTemplate]);
        setIsCreateModalOpen(false);
      } else {
        const error = await response.json();
      }
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  // Update Cold Outreach Template
  const handleUpdateTemplate = async (templateId, templateData, files) => {
    try {
      const formData = new FormData();
      formData.append('name', templateData.name);
      formData.append('subject', templateData.subject);
      formData.append('html_content', templateData.html_content);
      
      // Add new files if any
      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('attachments', file);
        });
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cold-outreach/templates/${templateId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        const updatedTemplate = await response.json();
        setColdOutreachTemplates(prev => 
          prev.map(template => 
            template.id === templateId ? updatedTemplate : template
          )
        );
        setIsEditModalOpen(false);
        setTemplateToEdit(null);
      } else {
        const error = await response.json();
      }
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  // Delete Cold Outreach Template
  const handleDeleteTemplate = async (templateId) => {
    if (confirm('Are you sure you want to delete this template? This will also delete all its attachments.')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cold-outreach/templates/${templateId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          setColdOutreachTemplates(prev => 
            prev.filter(template => template.id !== templateId)
          );
        } else {
          const error = await response.json();
        }
      } catch (error) {
        console.error('Error deleting template:', error);
      }
    }
  };

  // Set Active Template
  const handleSetActiveTemplate = async (templateId) => {
    setActivatingTemplate(templateId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cold-outreach/templates/${templateId}/activate`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Refresh templates to get updated active states
        await loadColdOutreachTemplates();
      } else {
        const error = await response.json();
        console.error('Failed to activate template:', error);
      }
    } catch (error) {
      console.error('Error activating template:', error);
    } finally {
      setActivatingTemplate(null);
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

  // Format date
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
      {/* Header */}
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

      {/* Templates Full Width */}
<div className="w-full">
  {coldOutreachTemplates.length > 0 ? (
    coldOutreachTemplates.map((template) => (
      <div
        key={template.id}
        className={`w-full bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg p-6 rounded-2xl border transition-all duration-300 shadow-lg ${
          template.is_active 
            ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-green-500/5 shadow-green-500/25' 
            : 'border-purple-500/30'
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-8 w-full">

          {/* LEFT PANEL */}
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

            {/* Attachments Section */}
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

          {/* RIGHT PANEL */}
          <div className="flex-1 flex flex-col justify-between">

            {/* FULL PREVIEW */}
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

            {/* ACTIONS */}
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

      {/* Modals */}
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
    </div>
  );
};

// Modal Components for Cold Outreach
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
  // Get user data from auth context
  const { user, updateUser } = useAuth();
  
  // State to manage the user's settings.
  const [profileSettings, setProfileSettings] = useState({
    name: user?.display_name || user?.name || "",
    email: user?.email || "",
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

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const togglePref = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Update settings when user data changes
  useEffect(() => {
    if (user) {
      setProfileSettings(prev => ({
        ...prev,
        name: user.display_name || user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  // Handle changes in the form inputs.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle the save action for the profile information.
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
      {/* Inline Toast */}
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
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-4">Settings</h1>
          <p className="text-white text-sm sm:text-base">
            Manage your account and email settings
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main content column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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
                      disabled={isLoading}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                        isLoading 
                          ? 'bg-gray-500 cursor-not-allowed' 
                          : 'bg-purple-700 hover:bg-purple-600'
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
                          Save
                        </>
                      )}
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

            {/* Email Preferences Card */}
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

          {/* Sidebar column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Connected Account Card */}
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
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-500" size={20} />
                  <span>Cold outreach templates</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-500" size={20} />
                  <span>Smart company targeting</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-500" size={20} />
                  <span>Outmail data-powered sends</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-500" size={20} />
                  <span>Mentorship session access</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-500" size={20} />
                  <span>Priority job recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-red-500/30 bg-red-500/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-1">
            <Zap className="text-red-400" size={18} />
            <h2 className="text-base font-semibold text-red-400">Danger Zone</h2>
          </div>
          <p className="text-xs text-white/40 mb-5">These actions are permanent and cannot be undone. Proceed with caution.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => showToast('error', 'Clear all data — feature coming soon')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={14} />
              Clear All Templates &amp; Attachments
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

// Main Page Component
export default function Page() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [templates, setTemplates] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [pdfToView, setPdfToView] = useState(null);
  const [isTemplateViewerOpen, setIsTemplateViewerOpen] = useState(false);
  const [templateToView, setTemplateToView] = useState(null);
  const [uploadingFiles, setUploadingFiles] = useState(new Set()); // Track uploading files
  const [uploadProgress, setUploadProgress] = useState({}); // Track upload progress
  const [apiErrors, setApiErrors] = useState({}); // Track API errors
  const ATTACHMENT_LIMIT = 3;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // File validation constants
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
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB


  // File validation utility
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

  // Get authentication headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  // Load user's existing files from backend (DISABLED - endpoints not implemented)
  useEffect(() => {
    const loadUserFiles = async () => {
      if (!isAuthenticated || !user) return;
      
      try {
        // Load attachments from /api/resumes endpoint
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
          console.log('📁 Loaded user attachments:', result);
          
          // Process attachments - assuming result is array of resumes/attachments
          if (Array.isArray(result)) {
            const formattedAttachments = result.map(item => {
              console.log('🔍 Processing attachment item:', item);
              // Generate random size between 500KB and 2MB
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
                url: item.s3_path,  // Backend returns s3_path field
                uploaded: true
              };
            });
            console.log('📝 Formatted attachments:', formattedAttachments);
            setAttachments(formattedAttachments);
          }
        } else {
          console.warn('⚠️ Failed to load attachments:', response.status, response.statusText);
        }
      } catch (error) {
        console.warn('⚠️ Error loading user files:', error.message);
      }
    };
    loadUserFiles();
  }, [isAuthenticated, user]);

  // Load templates from API
  const loadTemplates = async () => {
    try {
      console.log('📋 Loading user templates...');
      const response = await fetch(`${API_BASE_URL}/api/templates/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('📋 Loaded user templates:', result);
        
        // Process templates based on API response structure
        if (Array.isArray(result)) {
          const formattedTemplates = result.map(item => ({
            id: item.id,
            name: item.name,
            title: item.name, // UI expects 'title'
            subject: item.subject,
            emailSubject: item.subject, // UI expects 'emailSubject'
            html_content: item.html_content,
            emailBody: item.html_content, // UI expects 'emailBody'
            description: `Subject: ${item.subject}`, // UI expects 'description'
            created_at: item.created_at,
            category: "Custom",
            type: "email",
            icon: <Mail size={20} />, // UI expects 'icon'
            rating: 0 // UI expects 'rating'
          }));
          console.log('✅ Formatted templates:', formattedTemplates);
          setTemplates(formattedTemplates);
        }
      } else {
        console.error('❌ Failed to load templates:', response.status);
        if (response.status === 401) {
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('❌ Error loading templates:', error);
    }
  };

  // Load templates on component mount
  useEffect(() => {
    if (isAuthenticated && user) {
      loadTemplates();
    }
  }, [isAuthenticated, user]);

  // Check if user has stored token
  const hasStoredToken = () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false;
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated && !hasStoredToken()) {
      window.location.href = '/';
    }
  }, [isAuthenticated, loading]);

  // Show loading screen while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-black via-[#6c00ff] to-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-white mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleSaveTemplate = async (newTemplate) => {
    try {
      console.log('💾 Creating new template:', newTemplate);
      const templateData = {
        name: newTemplate.title || newTemplate.name,
        subject: newTemplate.emailSubject || newTemplate.subject,
        html_content: newTemplate.emailBody || newTemplate.html_content || newTemplate.content
      };
      
      console.log('📤 Sending template data:', templateData);
      
      const response = await fetch(`${API_BASE_URL}/api/templates/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        credentials: 'include',
        body: JSON.stringify(templateData)
      });
      
      if (response.ok) {
        const createdTemplate = await response.json();
        console.log('✅ Template created successfully:', createdTemplate);
        
        // Add the new template to local state
        const formattedTemplate = {
          id: createdTemplate.id,
          name: createdTemplate.name,
          title: createdTemplate.name, // UI expects 'title'
          subject: createdTemplate.subject,
          emailSubject: createdTemplate.subject, // UI expects 'emailSubject'
          html_content: createdTemplate.html_content,
          emailBody: createdTemplate.html_content, // UI expects 'emailBody'
          description: `Subject: ${createdTemplate.subject}`, // UI expects 'description'
          created_at: createdTemplate.created_at,
          category: "Custom",
          type: "email",
          icon: <Mail size={20} />, // UI expects 'icon'
          rating: 0 // UI expects 'rating'
        };
        
        setTemplates([...templates, formattedTemplate]);
      } else {
        console.error('❌ Failed to create template:', response.status);
        alert('Failed to create template. Please try again.');
        if (response.status === 401) {
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('❌ Error creating template:', error);
      alert('Error creating template. Please try again.');
    }
  };

  const handleDeleteTemplate = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this template?");
    if (confirmDelete) {
      try {
        console.log('🗑️ Deleting template:', id);
        const response = await fetch(`${API_BASE_URL}/api/templates/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          credentials: 'include',
        });
        
        if (response.ok) {
          console.log('✅ Template deleted successfully');
          const updatedTemplates = templates.filter(template => template.id !== id);
          setTemplates(updatedTemplates);
        } else {
          console.error('❌ Failed to delete template:', response.status);
          if (response.status === 401) {
            window.location.href = '/';
          }
        }
      } catch (error) {
        console.error('❌ Error deleting template:', error);
      }
    }
  };

  const handleUpdateTemplate = async (updatedTemplate) => {
    try {
      console.log('📝 Updating template:', updatedTemplate);
      const templateData = {
        name: updatedTemplate.title || updatedTemplate.name,
        subject: updatedTemplate.emailSubject || updatedTemplate.subject,
        html_content: updatedTemplate.emailBody || updatedTemplate.html_content || updatedTemplate.content
      };
      
      console.log('📤 Sending update data:', templateData);
      
      const response = await fetch(`${API_BASE_URL}/api/templates/${updatedTemplate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        credentials: 'include',
        body: JSON.stringify(templateData)
      });
      
      if (response.ok) {
        const updated = await response.json();
        console.log('✅ Template updated successfully:', updated);
        
        // Instead of manually updating state, reload all templates from API
        // This ensures UI stays in sync with backend
        console.log('🔄 Reloading templates to ensure consistency...');
        await loadTemplates();
        
        console.log('✅ Templates reloaded successfully');
      } else {
        console.error('❌ Failed to update template:', response.status);
        const errorData = await response.text();
        console.error('❌ Error details:', errorData);
        alert(`Failed to update template: ${response.status} - ${errorData}`);
        if (response.status === 401) {
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('❌ Error updating template:', error);
      alert('Error updating template. Please try again.');
    }
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

  const handleUploadAttachment = async (file) => {
    // Validate file first
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
      // Use the working resume upload endpoint
      const formData = new FormData();
      formData.append('file', file); // Backend expects 'file' field

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
      
      // Add successful upload to attachments list
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
      console.log('✅ File uploaded successfully:', result.filename);
      
    } catch (error) {
      console.error('❌ Upload error:', error);
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attachment?"
    );
    if (!confirmDelete) return;

    // Delete attachment using the backend API
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

        console.log('✅ Attachment deleted successfully from backend');
        
        // Remove from local state after successful deletion
        const updatedAttachments = attachments.filter(
          (att) => att.id !== attachment.id
        );
        setAttachments(updatedAttachments);
        
      } catch (error) {
        console.error('❌ Delete error:', error);
        alert(`Delete failed: ${error.message}`);
        return;
      }
    } else {
      // For local files not yet uploaded, just remove from state
      const updatedAttachments = attachments.filter(
        (att) => att.id !== attachment.id
      );
      setAttachments(updatedAttachments);
    }
  };
  
  const handleViewAttachment = (attachment) => {
    console.log('🔍 Attempting to view attachment:', attachment);
    
    if (!attachment) {
      alert('Attachment data not found.');
      return;
    }
    
    if (attachment.url) {
      console.log('✅ Opening file URL:', attachment.url);
      window.open(attachment.url, '_blank');
    } else {
      console.error('❌ No URL found in attachment object. Available properties:', Object.keys(attachment));
      alert('File URL not available. Please check console for details or contact support.');
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

  // Job Openings Component
  const JobOpenings = () => {
    const [jobOpenings, setJobOpenings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all'); // 'all', 'applied', 'discarded'

    const mockJobOpenings = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Swiggy",
        location: "Bangalore, India",
        type: "Full-time",
        salary: "₹12L - ₹18L",
        posted: "2 days ago",
        description: "Join Swiggy's web team to build scalable and delightful user experiences for millions of users.",
        requirements: ["2+ years React", "TypeScript", "Next.js", "UI/UX"],
        status: "pending",
        priorityScore: 92,
        outreachSent: true,
        signals: ["🔥 Funded Recently", "📈 Hiring Surge", "⚡ Hot Industry"],
        url: "https://careers.swiggy.com/job/frontend-developer"
      },
      {
        id: 2,
        title: "Full Stack Engineer",
        company: "Paytm",
        location: "Noida, India",
        type: "Full-time",
        salary: "₹10L - ₹16L",
        posted: "1 day ago",
        description: "Work on Paytm's fintech products used by millions across India.",
        requirements: ["Node.js", "React", "PostgreSQL", "AWS"],
        status: "pending",
        priorityScore: 85,
        outreachSent: false,
        signals: ["💰 Series B+", "🚀 Fast Growing", "🎯 High Demand Role"],
        url: "https://paytm.com/careers/full-stack-engineer"
      },
      {
        id: 3,
        title: "React Developer",
        company: "Meesho",
        location: "Bangalore, India",
        type: "Full-time",
        salary: "₹9L - ₹14L",
        posted: "3 days ago",
        description: "React developer for Meesho's fast-growing e-commerce platform.",
        requirements: ["React", "Redux", "REST APIs", "Git"],
        status: "applied",
        priorityScore: 78,
        outreachSent: true,
        signals: ["🌍 Remote Friendly", "🤝 Active Recruiter", "⏰ Act Fast"],
        url: "https://meesho.io/careers/react-developer"
      },
      {
        id: 4,
        title: "UI/UX Developer",
        company: "CRED",
        location: "Bangalore, India",
        type: "Full-time",
        salary: "₹11L - ₹15L",
        posted: "5 days ago",
        description: "Shape next-generation design systems for CRED's fintech products.",
        requirements: ["Figma", "HTML/CSS", "JavaScript", "User research"],
        status: "discarded",
        priorityScore: 68,
        outreachSent: false,
        signals: ["📊 Market Leader", "🎯 High Demand Role", "🌍 Remote Friendly"],
        url: "https://cred.club/careers/ui-ux-developer"
      },
      {
        id: 5,
        title: "JavaScript Engineer",
        company: "Razorpay",
        location: "Bangalore, India",
        type: "Full-time",
        salary: "₹13L - ₹17L",
        posted: "1 week ago",
        description: "Build modern web applications for Razorpay's payment platform.",
        requirements: ["ES6+", "Node.js", "MongoDB", "Docker"],
        status: "pending",
        priorityScore: 88,
        outreachSent: true,
        signals: ["🔥 Funded Recently", "💰 Series B+", "📈 Hiring Surge"],
        url: "https://razorpay.com/careers/javascript-engineer"
      },
      {
        id: 6,
        title: "Backend Engineer",
        company: "Flipkart",
        location: "Bangalore, India",
        type: "Full-time",
        salary: "₹12L - ₹16L",
        posted: "4 days ago",
        description: "Scale distributed backend services for Flipkart's e-commerce platform.",
        requirements: ["Python", "Go", "Kubernetes", "Microservices"],
        status: "pending",
        priorityScore: 63,
        outreachSent: false,
        signals: ["⚡ Hot Industry", "🚀 Fast Growing", "🤝 Active Recruiter"],
        url: "https://flipkartcareers.com/#!/job/backend-engineer"
      },
      {
        id: 7,
        title: "Product Engineer",
        company: "Zepto",
        location: "Mumbai, India",
        type: "Full-time",
        salary: "₹10L - ₹14L",
        posted: "6 days ago",
        description: "Own features end-to-end at Zepto, India's fastest-growing quick commerce startup.",
        requirements: ["React", "Node.js", "Product thinking", "Agile"],
        status: "pending",
        priorityScore: 57,
        outreachSent: false,
        signals: ["⏰ Act Fast", "🎯 High Demand Role", "📊 Market Leader"],
        url: "https://careers.zeptonow.com/product-engineer"
      },
      {
        id: 8,
        title: "Mobile Developer (React Native)",
        company: "Zomato",
        location: "Gurgaon, India",
        type: "Full-time",
        salary: "₹11L - ₹15L",
        posted: "2 days ago",
        description: "Build cross-platform mobile experiences for Zomato's consumer app.",
        requirements: ["React Native", "TypeScript", "iOS/Android", "REST APIs"],
        status: "pending",
        priorityScore: 72,
        outreachSent: false,
        signals: ["📈 Hiring Surge", "💰 Series B+", "🌍 Remote Friendly"],
        url: "https://www.zomato.com/careers/mobile-developer"
      }
    ];

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setJobOpenings(mockJobOpenings);
        setLoading(false);
      }, 1000);
    }, []);

    const handleApply = (jobId) => {
      setJobOpenings(prev =>
        prev.map(job => job.id === jobId ? { ...job, status: 'applied' } : job)
      );
    };

    const handleDiscard = (jobId) => {
      setJobOpenings(prev =>
        prev.map(job => job.id === jobId ? { ...job, status: 'discarded' } : job)
      );
    };

    const handleOpenJob = (url) => {
      window.open(url, '_blank');
    };

    const filteredJobs = jobOpenings
      .filter(job => {
        if (filter === 'all') return job.status === 'pending';
        return job.status === filter;
      })
      .sort((a, b) => b.priorityScore - a.priorityScore);

    const getStatusColor = (status) => {
      switch (status) {
        case 'applied': return 'text-green-400';
        case 'discarded': return 'text-red-400';
        default: return 'text-blue-400';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'applied': return 'Applied';
        case 'discarded': return 'Discarded';
        default: return 'New';
      }
    };

    const getPriorityTier = (score) => {
      if (score > 75) return { label: 'High Priority', color: 'text-red-400', dot: 'bg-red-400', border: 'border-red-500/30' };
      if (score >= 60) return { label: 'Medium Priority', color: 'text-yellow-400', dot: 'bg-yellow-400', border: 'border-yellow-500/30' };
      return { label: 'Standard', color: 'text-gray-400', dot: 'bg-gray-400', border: 'border-white/10' };
    };

    const getPriorityScoreColor = (score) => {
      if (score > 75) return 'text-red-400';
      if (score >= 60) return 'text-yellow-400';
      return 'text-gray-400';
    };

    // Group jobs by tier for rendering with tier headers
    const highPriority = filteredJobs.filter(j => j.priorityScore > 75);
    const mediumPriority = filteredJobs.filter(j => j.priorityScore >= 60 && j.priorityScore <= 75);
    const standard = filteredJobs.filter(j => j.priorityScore < 60);

    const renderJobCard = (job) => {
      const tier = getPriorityTier(job.priorityScore);
      return (
        <div
          key={job.id}
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border ${tier.border} hover:border-white/30 transition-all duration-300`}
        >
              {/* Job Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {/* Work icon instead of logo */}
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center mr-1">
                      <Briefcase size={18} className="text-[#6c00ff]" />
                    </span>
                    <h3 className="text-lg font-bold text-white">{job.title}</h3>
                    <span className={`text-xs font-medium ${getStatusColor(job.status)}`}>{getStatusText(job.status)}</span>
                    {job.outreachSent && (
                      <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-semibold">
                        📧 Outreach Sent
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Building size={14} />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {job.posted}
                    </div>
                  </div>
                </div>

                {/* Priority Score */}
                <div className="ml-4 flex flex-col items-center bg-white/5 rounded-xl px-3 py-2 border border-white/10 shrink-0">
                  <span className={`text-2xl font-bold ${getPriorityScoreColor(job.priorityScore)}`}>{job.priorityScore}</span>
                  <span className="text-white/40 text-xs mt-0.5 whitespace-nowrap">Outmail Score</span>
                </div>
              </div>
          {/* Signal Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {job.signals.map((signal, i) => (
              <span key={i} className="px-2 py-1 bg-purple-500/15 border border-purple-500/25 text-purple-200 rounded-full text-xs font-medium">
                {signal}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm mb-3 line-clamp-2">
            {job.description}
          </p>

          {/* Requirements */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <span key={index} className="px-2 py-1 bg-white/10 text-white/70 rounded-lg text-xs">
                  {req}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {job.status === 'pending' && (
              <>
                <button
                  onClick={() => handleApply(job.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  <CheckCircle size={16} /> Apply
                </button>
                <button
                  onClick={() => handleDiscard(job.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
                >
                  <X size={16} /> Discard
                </button>
              </>
            )}
            <button
              onClick={() => handleOpenJob(job.url)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              <ExternalLink size={16} /> View Details
            </button>
            {job.status !== 'pending' && (
              <button
                onClick={() => setJobOpenings(prev =>
                  prev.map(j => j.id === job.id ? { ...j, status: 'pending' } : j)
                )}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Reset Status
              </button>
            )}
          </div>
        </div>
      );
    };

    const TierHeader = ({ label, color, dot, count }) => (
      <div className="flex items-center gap-3 mt-6 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full ${dot} shrink-0`}></span>
        <span className={`text-sm font-bold uppercase tracking-wider ${color}`}>{label}</span>
        <span className="text-white/30 text-xs font-medium">({count})</span>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>
    );

    return (
      <div className="p-4 sm:p-6 font-syne">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-10 text-white">Job Openings</h1>
            <p className="text-white/60 text-sm sm:text-base">
              Ranked by Outmail Priority Score · signals-backed recommendations
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-white/10 rounded-lg p-1 mt-4 sm:mt-0">
            {['all', 'applied', 'discarded'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === filterType
                    ? 'bg-purple-600 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {filterType} ({jobOpenings.filter(job => filterType === 'all' ? job.status === 'pending' : job.status === filterType).length})
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/20 border-t-white"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase size={48} className="text-white/50 mx-auto mb-4" />
            <p className="text-white/70 text-lg">No job openings found for the selected filter.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {highPriority.length > 0 && (
              <>
                <TierHeader label="High Priority" color="text-red-400" dot="bg-red-400" count={highPriority.length} />
                {highPriority.map(renderJobCard)}
              </>
            )}
            {mediumPriority.length > 0 && (
              <>
                <TierHeader label="Medium Priority" color="text-yellow-400" dot="bg-yellow-400" count={mediumPriority.length} />
                {mediumPriority.map(renderJobCard)}
              </>
            )}
            {standard.length > 0 && (
              <>
                <TierHeader label="Standard" color="text-gray-400" dot="bg-gray-400" count={standard.length} />
                {standard.map(renderJobCard)}
              </>
            )}
          </div>
        )}
      </div>
    );
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
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        Get In Touch
      </h2>

      <p className="text-white/70 mb-6 leading-relaxed text-sm">
        Have a question, found a bug, or want to explore a partnership? We’d love to hear from you. Fill in your message and our team will get back to you promptly.
      </p>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-start gap-2.5">
          <Check size={15} className="text-purple-400 mt-0.5 flex-shrink-0" />
          <p className="text-white/60 text-xs">All support requests are triaged within 2 business hours.</p>
        </div>
        <div className="flex items-start gap-2.5">
          <Check size={15} className="text-purple-400 mt-0.5 flex-shrink-0" />
          <p className="text-white/60 text-xs">For urgent technical issues, reach us directly at <a href="mailto:support@outmail.in" className="text-purple-400 hover:underline">support@outmail.in</a>.</p>
        </div>
        <div className="flex items-start gap-2.5">
          <Check size={15} className="text-purple-400 mt-0.5 flex-shrink-0" />
          <p className="text-white/60 text-xs">Partnership and enterprise enquiries are handled by our growth team.</p>
        </div>
      </div>

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
      className="relative flex h-screen bg-gradient-to-l from-black via-[#6c00ff] to-black text-white font-syne overflow-hidden"
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
    <h1 className="text-2xl font-satisfy">
      Outmail
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
    {user?.profilePicture ? (
      <Image 
        src={user.profilePicture} 
        alt="Profile" 
        width={40} 
        height={40} 
        className="rounded-full"
      />
    ) : (
      <CircleUserRound className="w-10 h-10 text-white" />
    )}
    <div>
      <p className="font-semibold">{user?.display_name || user?.name || "User"}</p>
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
        setActiveSection("coldOutreach");
        setIsSidebarOpen(false);
      }}
      className={`flex items-center gap-2 transition cursor-pointer ${
        activeSection === "coldOutreach"
          ? "text-purple-400 font-bold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <Mail size={16} /> Cold Outreach
    </a>
    <a
      onClick={() => {
        setActiveSection("mentorship");
        setIsSidebarOpen(false);
      }}
      className={`block transition cursor-pointer flex items-center gap-2 ${
        activeSection === "mentorship"
          ? "text-purple-400 font-semibold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <Users size={18} />
      Mentorship
    </a>
    <a
      onClick={() => {
        setActiveSection("jobOpenings");
        setIsSidebarOpen(false);
      }}
      className={`block transition cursor-pointer flex items-center gap-2 ${
        activeSection === "jobOpenings"
          ? "text-purple-400 font-semibold"
          : "text-white hover:text-purple-400"
      }`}
    >
      <Briefcase size={18} />
      Job Openings
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
          <button
            onClick={logout}
            className="flex items-center gap-2 text-white hover:text-red-500 transition w-full"
          >
            <LogOut size={16} /> Logout
          </button>
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
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out lg:ml-64 overflow-y-auto overflow-x-hidden ${
          isSidebarOpen ? "overflow-x-hidden" : "overflow-x-hidden"
        }`}
      >
        {/* Topbar */}
        <Header setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        {/* Conditional rendering based on activeSection */}
        {activeSection === "dashboard" && (
          <>
            <CombinedDashboard />
            {/* MentorshipSection removed from dashboard as it has its own section */}
          </>
        )}
        {activeSection === "coldOutreach" && <ColdOutreach />}
        {activeSection === "mentorship" && <MentorshipSection />}
        {activeSection === "jobOpenings" && <JobOpenings />}
        {activeSection === "settings" && <SettingsComponent />}
        {activeSection === "contact" && (
          <div className="p-6 sm:p-8 font-syne text-white">
            {/* Heading + SLA badge */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold">Contact Us</h1>
                <span className="flex items-center gap-1.5 text-xs bg-green-500/15 border border-green-500/25 text-green-400 px-3 py-1 rounded-full font-medium">
                  <Zap size={11} />
                  We typically reply in &lt; 2 hours
                </span>
              </div>
              <p className="text-white/50 text-sm">Choose a support category or send us a message directly.</p>
            </div>

            {/* Glassmorphism card */}
            <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md shadow-lg border border-white/30 rounded-xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">

              {/* Left Column — Support Categories */}
              <div className="flex-1 flex flex-col gap-4">
                {[
                  {
                    icon: Mail,
                    color: 'text-purple-400',
                    bg: 'bg-purple-500/15 border-purple-500/25',
                    title: 'General Enquiries',
                    desc: 'Questions about features, onboarding, or anything else about Outmail.',
                    email: 'hello@outmail.in',
                  },
                  {
                    icon: Settings,
                    color: 'text-cyan-400',
                    bg: 'bg-cyan-500/15 border-cyan-500/25',
                    title: 'Technical Support',
                    desc: 'Issues with email sending, templates, attachments, or integrations.',
                    email: 'support@outmail.in',
                  },
                  {
                    icon: CreditCard,
                    color: 'text-amber-400',
                    bg: 'bg-amber-500/15 border-amber-500/25',
                    title: 'Billing &amp; Plans',
                    desc: 'Subscription queries, invoices, refunds, or plan upgrades.',
                    email: 'billing@outmail.in',
                  },
                ].map((cat) => (
                  <div
                    key={cat.title}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors"
                  >
                    <div className={`p-2.5 rounded-lg border flex-shrink-0 ${cat.bg}`}>
                      <cat.icon size={18} className={cat.color} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-white text-sm">{cat.title}</p>
                      <p className="text-xs text-white/45 mt-0.5 mb-2 leading-relaxed">{cat.desc}</p>
                      <a
                        href={`mailto:${cat.email}`}
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {cat.email}
                      </a>
                    </div>
                  </div>
                ))}

                {/* Business Hours */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Clock size={15} className="text-white/35 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Business Hours</p>
                    <p className="text-xs text-white/45">Monday – Friday &nbsp;·&nbsp; 9 AM – 6 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Right Column — Contact Form */}
              <ContactForm />
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