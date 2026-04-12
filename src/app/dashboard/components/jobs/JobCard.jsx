import React, { useState } from "react";
import { 
  Briefcase, Building, MapPin, DollarSign, Clock, 
  CheckCircle, X, ExternalLink, Calendar, Users, 
  ChevronDown, ChevronUp 
} from "lucide-react";

const JobCard = ({ job, getPriorityTier, getPriorityScoreColor, getStatusColor, getStatusText, handleOpenJob, handleDiscard, handleResetStatus, handleApply }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const tier = getPriorityTier(job.priorityScore);

  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border ${tier.border} hover:border-white/30 transition-all duration-300`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center mr-1">
              <Briefcase size={18} className="text-[#6c00ff]" />
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">{job.title}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 ${getStatusColor(job.status)}`}>
              {getStatusText(job.status)}
            </span>
            {job.outreachSent && (
              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-semibold">
                📧 Outreach Sent
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
            <div className="flex items-center gap-1.5">
              <Building size={14} className="text-purple-400 shrink-0" />
              <span className="truncate max-w-[150px]">{job.company}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-purple-400 shrink-0" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase size={14} className="text-purple-400 shrink-0" />
              <span>{job.workType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign size={14} className="text-purple-400 shrink-0" />
              <span>{job.compensation}</span>
            </div>
            {job.duration && (
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-purple-400 shrink-0" />
                <span>{job.duration}</span>
              </div>
            )}
            {job.startDate && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-purple-400 shrink-0" />
                <span>{job.startDate}</span>
              </div>
            )}
            {job.numApplicants && (
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-purple-400 shrink-0" />
                <span>{job.numApplicants} applicants</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center bg-white/5 rounded-xl px-4 py-3 border border-white/10 shrink-0 self-start md:self-center">
          <div className="flex flex-col items-center">
            <span className={`text-2xl font-bold ${getPriorityScoreColor(job.priorityScore)}`}>{job.priorityScore}</span>
            <span className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Priority</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.signals && job.signals.map((signal, i) => (
          <span key={i} className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-200 rounded-md text-[11px] font-medium">
            {signal}
          </span>
        ))}
      </div>

      <div className="border-t border-white/5 pt-4 mt-2">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors mb-4 group"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              Show Job Details
            </>
          )}
        </button>

        {isExpanded && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Job Description</h4>
              <div 
                className="text-white/70 text-sm prose prose-invert max-w-none prose-p:leading-relaxed prose-li:my-1"
                dangerouslySetInnerHTML={{ __html: job.details }}
              />
            </div>

            {job.qualifications && (
              <div className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300/60 mb-3">Qualifications</h4>
                <div 
                  className="text-white/70 text-sm prose prose-invert max-w-none prose-p:leading-relaxed prose-li:my-1"
                  dangerouslySetInnerHTML={{ __html: job.qualifications }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {job.status === 'pending' && (
          <>
            <button
              onClick={() => handleOpenJob(job.applyLink || job.url)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all active:scale-95 text-sm shadow-lg shadow-green-900/20"
            >
              <CheckCircle size={18} /> Apply Now
            </button>
            <button
              onClick={() => handleDiscard(job.id)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/70 font-bold rounded-xl border border-white/10 transition-all active:scale-95 text-sm"
            >
              <X size={18} /> Discard
            </button>
          </>
        )}
        <button
          onClick={() => handleOpenJob(job.url)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 ${job.status === 'pending' ? 'bg-purple-600/50 hover:bg-purple-600' : 'bg-purple-600 hover:bg-purple-500'} text-white font-bold rounded-xl transition-all active:scale-95 text-sm shadow-lg shadow-purple-900/20`}
        >
          <ExternalLink size={18} /> Source Link
        </button>
        {job.status !== 'pending' && (
          <button
            onClick={() => handleResetStatus(job.id)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all active:scale-95 text-sm"
          >
            Reset Status
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
