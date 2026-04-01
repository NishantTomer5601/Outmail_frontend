import React, { useState, useEffect } from "react";
import { Briefcase, Building, MapPin, DollarSign, Clock, CheckCircle, X, ExternalLink } from "lucide-react";

const JobOpeningsTab = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

  // Deterministic score based on job id so it stays stable across renders
  const getOutmailScore = (job) => {
    const seed = String(job.id || job._id || job.title || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return 70 + (seed % 29); // range 70–98
  };

  const fetchJobs = async (page = 1, currentFilter = filter) => {
    setLoading(true);
    try {
      const statusParam = currentFilter === 'all' ? 'pending' : currentFilter;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
      const response = await fetch(`${backendUrl}/api/jobs?page=${page}&limit=10&status=${statusParam}`);
      const data = await response.json();
      if (data.success) {
        // Assign outmail scores then sort descending
        const scored = data.data.map((job) => ({
          ...job,
          priorityScore: getOutmailScore(job),
        }));
        scored.sort((a, b) => b.priorityScore - a.priorityScore);
        setJobOpenings(scored);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(1, filter);
  }, [filter]);

  const handleApply = (jobId) => {
    // Dummy in-memory removal for now
    setJobOpenings(prev => prev.filter(job => job.id !== jobId));
  };

  const handleDiscard = (jobId) => {
    // Dummy in-memory removal for now
    setJobOpenings(prev => prev.filter(job => job.id !== jobId));
  };

  const handleResetStatus = (jobId) => {
    // Dummy in-memory removal for now
    setJobOpenings(prev => prev.filter(job => job.id !== jobId));
  };

  const handleOpenJob = (url) => {
    if (url) window.open(url, '_blank');
  };

  const filteredJobs = jobOpenings;
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
    if (score >= 90) return { label: 'High Priority', color: 'text-red-400', dot: 'bg-red-400', border: 'border-red-500/30' };
    if (score >= 80) return { label: 'Medium Priority', color: 'text-yellow-400', dot: 'bg-yellow-400', border: 'border-yellow-500/30' };
    return { label: 'Standard', color: 'text-blue-300', dot: 'bg-blue-300', border: 'border-blue-500/20' };
  };

  const getPriorityScoreColor = (score) => {
    if (score >= 90) return 'text-red-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-blue-300';
  };

  const highPriority = filteredJobs.filter(j => j.priorityScore >= 90);
  const mediumPriority = filteredJobs.filter(j => j.priorityScore >= 80 && j.priorityScore < 90);
  const standard = filteredJobs.filter(j => j.priorityScore < 80);

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
          {job.signals && job.signals.map((signal, i) => (
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
            {job.requirements && job.requirements.map((req, index) => (
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
              onClick={() => handleResetStatus(job.id)}
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
              {filterType}
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

      {/* Pagination Controls */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={pagination.page === 1}
            onClick={() => fetchJobs(pagination.page - 1)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
          >
            Previous
          </button>
          <span className="text-white/70 text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => fetchJobs(pagination.page + 1)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobOpeningsTab;