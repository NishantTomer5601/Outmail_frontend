import React, { useState } from "react";
import { Calendar, FileText, Play, ExternalLink, Eye, Plus } from "lucide-react";

const MentorshipTab = () => {
  const [showArchivedSessions, setShowArchivedSessions] = useState(false);

  const activeSessions = [
    {
      id: 1,
      mentorName: "Ankit Sharma",
      mentorTitle: "SDE 1 at Swiggy",
      mentorImage: "https://randomuser.me/api/portraits/men/11.jpg",
      sessionDate: "Mar 21, 2026",
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
      sessionDate: "Mar 21, 2026",
      sessionTime: "10:00 AM - 11:00 AM",
      sessionTopic: "Technical Interview Preparation",
      sessionType: "Group Session",
      whyThisMentor: "Get tips on DSA, system design, and Paytm's hiring process.",
      status: "active"
    }
  ];

  const getNextWeekDate = (daysFromToday = 7) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2 mb-4">
        <p className="text-xs text-purple-200 leading-relaxed">
          <span className="font-semibold text-purple-300">Why attend: </span>
          {session.whyThisMentor}
        </p>
      </div>

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 mt-10 text-white">Mentorship</h1>
          <p className="text-white/60 text-sm sm:text-base">
            Learn from leaders at companies actively hiring — sharpen your edge before you reach out
          </p>
        </div>
      </div>

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

export default MentorshipTab;