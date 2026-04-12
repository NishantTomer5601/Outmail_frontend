import React, { useState, useEffect } from "react";
import { 
  Briefcase 
} from "lucide-react";
import JobCard from "./JobCard";

const JobOpeningsTab = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

  const getOutmailScore = (job) => {
    const seed = String(job.id || job._id || job.title || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return 70 + (seed % 29);
  };

  const fetchJobs = async (page = 1, currentFilter = filter) => {
    setLoading(true);
    try {
      const statusParam = currentFilter === 'all' ? 'pending' : currentFilter;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
      const response = await fetch(`${backendUrl}/api/jobs?page=${page}&limit=10&status=${statusParam}`);
      const data = await response.json();
      if (data.success) {
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
    setJobOpenings(prev => prev.filter(job => job.id !== jobId));
  };

  const handleDiscard = (jobId) => {
    setJobOpenings(prev => prev.filter(job => job.id !== jobId));
  };

  const handleResetStatus = (jobId) => {
    setJobOpenings(prev => prev.filter(job => job.id !== jobId));
  };

  const handleOpenJob = (url) => {
    if (url) window.open(url, '_blank');
  };

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

  const highPriority = jobOpenings.filter(j => j.priorityScore >= 90);
  const mediumPriority = jobOpenings.filter(j => j.priorityScore >= 80 && j.priorityScore < 90);
  const standard = jobOpenings.filter(j => j.priorityScore < 80);

  const TierHeader = ({ label, color, dot, count }) => (
    <div className="flex items-center gap-3 mt-8 mb-4">
      <span className={`w-2.5 h-2.5 rounded-full ${dot} shrink-0`}></span>
      <span className={`text-xs font-black uppercase tracking-[0.2em] ${color}`}>{label}</span>
      <span className="text-white/20 text-xs font-medium">({count})</span>
      <div className="flex-1 h-px bg-white/5"></div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto font-syne pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 pt-8 sm:pt-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Job Openings</h1>
            {!loading && pagination.total > 0 && (
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/50 border border-white/10 uppercase tracking-widest">
                {pagination.total} Available
              </span>
            )}
          </div>
          <p className="text-white/40 text-sm max-w-md">
            Our AI-powered engine ranks openings specifically for your profile using real-time market signals.
          </p>
        </div>

        <div className="flex bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 border border-white/10 w-full sm:w-auto">
          {['all', 'applied', 'discarded'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all capitalize tracking-widest ${
                filter === filterType
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-purple-500/20"></div>
            <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-2 border-purple-500 animate-spin"></div>
          </div>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest animate-pulse">Analyzing Opportunities...</p>
        </div>
      ) : jobOpenings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
            <Briefcase size={32} className="text-white/20" />
          </div>
          <p className="text-white/50 text-xl font-bold mb-2">No jobs matched your filter</p>
          <p className="text-white/20 text-sm uppercase tracking-widest font-bold">Try changing your filters or check back later</p>
        </div>
      ) : (
        <div className="space-y-4">
          {highPriority.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TierHeader label="High Priority" color="text-red-400" dot="bg-red-400" count={highPriority.length} />
              <div className="grid gap-4">
                {highPriority.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    getPriorityTier={getPriorityTier}
                    getPriorityScoreColor={getPriorityScoreColor}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                    handleOpenJob={handleOpenJob}
                    handleDiscard={handleDiscard}
                    handleResetStatus={handleResetStatus}
                    handleApply={handleApply}
                  />
                ))}
              </div>
            </div>
          )}
          {mediumPriority.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <TierHeader label="Medium Priority" color="text-yellow-400" dot="bg-yellow-400" count={mediumPriority.length} />
              <div className="grid gap-4">
                {mediumPriority.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    getPriorityTier={getPriorityTier}
                    getPriorityScoreColor={getPriorityScoreColor}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                    handleOpenJob={handleOpenJob}
                    handleDiscard={handleDiscard}
                    handleResetStatus={handleResetStatus}
                    handleApply={handleApply}
                  />
                ))}
              </div>
            </div>
          )}
          {standard.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <TierHeader label="Standard Match" color="text-blue-400" dot="bg-blue-400" count={standard.length} />
              <div className="grid gap-4">
                {standard.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job} 
                    getPriorityTier={getPriorityTier}
                    getPriorityScoreColor={getPriorityScoreColor}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                    handleOpenJob={handleOpenJob}
                    handleDiscard={handleDiscard}
                    handleResetStatus={handleResetStatus}
                    handleApply={handleApply}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-16 p-4 bg-white/5 rounded-2xl border border-white/10 w-fit mx-auto">
          <button
            disabled={pagination.page === 1}
            onClick={() => fetchJobs(pagination.page - 1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
          >
            Prev
          </button>
          <div className="flex flex-col items-center min-w-[80px]">
            <span className="text-white/40 text-[10px] font-black uppercase tracking-tighter">Page</span>
            <span className="text-white font-bold">{pagination.page} / {pagination.totalPages}</span>
          </div>
          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() => fetchJobs(pagination.page + 1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobOpeningsTab;