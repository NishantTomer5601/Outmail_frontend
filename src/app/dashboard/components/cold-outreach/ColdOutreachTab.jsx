import React, { useState, useEffect } from "react";
import { Mail, Zap, AlertTriangle } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ColdOutreachTab = () => {
  const [testEmail, setTestEmail] = useState("");
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [hasResumes, setHasResumes] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    // Check if user has resumes for test pipeline
    const checkResumes = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/resumes');
        if (response.data && response.data.length > 0) {
          setHasResumes(true);
        }
      } catch (error) {
        console.warn('Error checking resumes:', error.message);
      } finally {
        setLoading(false);
      }
    };
    checkResumes();
  }, []);

  const handleRunTestPipeline = async () => {
    if (!testEmail.trim()) {
      toast.error('Please enter a recipient email');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!hasResumes) {
      toast.error('Please upload a resume in Settings first');
      return;
    }

    setIsTestLoading(true);
    try {
      await api.post('/api/cold-outreach/test-pipeline', {
        hrEmail: testEmail,
      });

      toast.success('Test pipeline triggered successfully!');
      setTestEmail("");
    } catch (error) {
      console.error('Error running test pipeline:', error);
      toast.error(error.response?.data?.error || 'An error occurred while running the test pipeline.');
    } finally {
      setIsTestLoading(false);
    }
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
            Test and run your automated cold outreach pipeline
          </p>
        </div>
      </div>

      <div className="mt-6 mb-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Test Outreach Pipeline
            </h2>
            <p className="text-xs text-white/40 mt-0.5">
              Send a sample personalized email to a test recipient to see the AI in action.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="testEmail" className="block text-sm font-medium text-gray-300 mb-1">
              Recipient Email (Your email or a test account)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="text-gray-400" size={18} />
                </div>
                <input
                  type="email"
                  id="testEmail"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                />
              </div>
              <button
                onClick={handleRunTestPipeline}
                disabled={isTestLoading}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                  isTestLoading 
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-105 active:scale-95'
                } text-white min-w-[160px]`}
              >
                {isTestLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Run Test
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-xs text-yellow-300 flex items-start gap-2">
              <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                This will use your latest uploaded resume to generate a personalized email for a demo startup and send it to the specified email.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdOutreachTab;