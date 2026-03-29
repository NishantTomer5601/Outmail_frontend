import React, { useState, useEffect } from "react";
import { Mail, Zap, AlertTriangle, Building2, MapPin, Briefcase } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const ColdOutreachTab = () => {
  const [demoCompanies, setDemoCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [hasResumes, setHasResumes] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resumesResponse, companiesResponse] = await Promise.all([
          api.get('/api/resumes').catch(() => ({ data: [] })),
          api.get('/api/cold-outreach/demo-companies').catch(() => ({ data: [] }))
        ]);

        if (resumesResponse.data && resumesResponse.data.length > 0) {
          setHasResumes(true);
        }

        if (companiesResponse.data && companiesResponse.data.length > 0) {
          setDemoCompanies(companiesResponse.data);
          setSelectedCompany(companiesResponse.data[0]); // Select first by default
        }
      } catch (error) {
        console.warn('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRunTestPipeline = async () => {
    if (!selectedCompany) {
      toast.error('Please select a demo company');
      return;
    }

    if (!hasResumes) {
      toast.error('Please upload a resume in Settings first');
      return;
    }

    setIsTestLoading(true);
    try {
      await api.post('/api/cold-outreach/test-pipeline', {
        hrEmail: selectedCompany.email,
        companyName: selectedCompany.name,
        domain: selectedCompany.industry || "Technology",
        location: selectedCompany.location || "Remote",
        teamSize: selectedCompany.size === "startup" ? "1-10" : selectedCompany.size === "small" ? "11-50" : "51-200",
        companyStage: selectedCompany.size === "startup" ? "Seed" : "Series A",
      });

      toast.success(`Test pipeline triggered for ${selectedCompany.name}!`);
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
              Select a demo company below to send a sample personalized email and see the AI in action.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {demoCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoCompanies.map((company) => (
                <div 
                  key={company.id}
                  onClick={() => setSelectedCompany(company)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    selectedCompany?.id === company.id 
                      ? 'bg-purple-500/20 border-purple-500' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Building2 size={18} className={selectedCompany?.id === company.id ? 'text-purple-400' : 'text-gray-400'} />
                    </div>
                    <h3 className="font-semibold text-white">{company.name}</h3>
                  </div>
                  
                  <div className="space-y-2 mt-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} />
                      <span>{company.industry || 'Technology'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{company.location || 'Remote'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span className="truncate">{company.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400 bg-white/5 rounded-lg">
              No demo companies available.
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handleRunTestPipeline}
              disabled={isTestLoading || !selectedCompany}
              className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 w-full sm:w-auto ${
                isTestLoading || !selectedCompany
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-105 active:scale-95'
              } text-white`}
            >
              {isTestLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Running...
                </>
              ) : (
                <>
                  <Zap size={18} />
                  Send Email to {selectedCompany ? selectedCompany.name : 'Selected Company'}
                </>
              )}
            </button>
          </div>
          
          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-xs text-yellow-300 flex items-start gap-2">
              <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                This will use your latest uploaded resume to generate a personalized email for the selected startup and send it via your connected Gmail.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdOutreachTab;
