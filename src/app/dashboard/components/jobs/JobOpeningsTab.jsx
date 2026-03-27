import React, { useState, useEffect } from "react";
import { Briefcase, Building, MapPin, DollarSign, Clock, CheckCircle, X, ExternalLink } from "lucide-react";

const JobOpeningsTab = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

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
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
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

          <div className="ml-4 flex flex-col items-center bg-white/5 rounded-xl px-3 py-2 border border-white/10 shrink-0">
            <span className={`text-2xl font-bold ${getPriorityScoreColor(job.priorityScore)}`}>{job.priorityScore}</span>
            <span className="text-white/40 text-xs mt-0.5 whitespace-nowrap">Outmail Score</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {job.signals.map((signal, i) => (
            <span key={i} className="px-2 py-1 bg-purple-500/15 border border-purple-500/25 text-purple-200 rounded-full text-xs font-medium">
              {signal}
            </span>
          ))}
        </div>

        <p className="text-white/70 text-sm mb-3 line-clamp-2">
          {job.description}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req, index) => (
              <span key={index} className="px-2 py-1 bg-white/10 text-white/70 rounded-lg text-xs">
                {req}
              </span>
            ))}
          </div>
        </div>

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-10 text-white">Job Openings</h1>
          <p className="text-white/60 text-sm sm:text-base">
            Ranked by Outmail Priority Score · signals-backed recommendations
          </p>
        </div>

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

export default JobOpeningsTab;