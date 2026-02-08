"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function OAuthTester() {
  const { user, isAuthenticated, loading, logout, checkAuth } = useAuth();
  const [testResults, setTestResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Helper function to display results
  const updateResult = (testName, result, isError = false) => {
    setTestResults(prev => ({
      ...prev,
      [testName]: { content: result, isError }
    }));
  };

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      updateResult('backend', '🔄 Testing connection...');
      
      const response = await fetch(`${BASE_URL}/health`, {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        updateResult('backend', '✅ Backend Online - Connected to localhost:8000');
      } else {
        updateResult('backend', `❌ Backend Error - Status: ${response.status}`, true);
      }
    } catch (error) {
      updateResult('backend', '❌ Backend Offline - Cannot connect to localhost:8000. Make sure your backend is running!', true);
    }
  };

  // Test API endpoints
  const testApiEndpoints = async () => {
    try {
      updateResult('api', '🔄 Testing /api/me endpoint...');
      
      const response = await fetch(`${BASE_URL}/api/me`, {
        method: 'GET',
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        updateResult('api', `✅ /api/me working\nResponse: ${JSON.stringify(userData, null, 2)}`);
      } else {
        const errorText = await response.text();
        updateResult('api', `❌ /api/me failed\nStatus: ${response.status}\nResponse: ${errorText}`, true);
      }
    } catch (error) {
      updateResult('api', `❌ Network error: ${error.message}`, true);
    }
  };

  // Test student routes
  const testStudentRoutes = async () => {
    const routes = ['/api/test/student', '/api/student/profile', '/api/student/campaigns'];
    let results = 'Student Route Tests:\n';
    
    for (const route of routes) {
      try {
        const response = await fetch(`${BASE_URL}${route}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok || response.status === 404) {
          results += `✅ ${route} - Status: ${response.status}\n`;
        } else if (response.status === 403) {
          results += `⚠️ ${route} - Forbidden (check role permissions)\n`;
        } else if (response.status === 401) {
          results += `❌ ${route} - Unauthorized (login required)\n`;
        } else {
          results += `❌ ${route} - Status: ${response.status}\n`;
        }
      } catch (error) {
        results += `❌ ${route} - Network error\n`;
      }
    }

    updateResult('student', results);
  };

  // Test admin routes
  const testAdminRoutes = async () => {
    const routes = ['/api/test/admin', '/api/admin/students', '/api/admin/campaigns'];
    let results = 'Admin Route Tests:\n';
    
    for (const route of routes) {
      try {
        const response = await fetch(`${BASE_URL}${route}`, {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok || response.status === 404) {
          results += `✅ ${route} - Status: ${response.status} (Access granted)\n`;
        } else if (response.status === 403) {
          results += `⚠️ ${route} - Forbidden (need TPO_ADMIN role)\n`;
        } else if (response.status === 401) {
          results += `❌ ${route} - Unauthorized (login required)\n`;
        } else {
          results += `❌ ${route} - Status: ${response.status}\n`;
        }
      } catch (error) {
        results += `❌ ${route} - Network error\n`;
      }
    }

    updateResult('admin', results);
  };

  // Test logout
  const testLogout = async () => {
    try {
      updateResult('logout', '🔄 Testing logout...');
      
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        updateResult('logout', '✅ Logout successful - Cookie should be cleared');
        // Refresh auth state
        setTimeout(checkAuth, 500);
      } else {
        updateResult('logout', `❌ Logout failed - Status: ${response.status}`, true);
      }
    } catch (error) {
      updateResult('logout', `❌ Logout error: ${error.message}`, true);
    }
  };

  // Run all tests
  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults({});
    
    await testBackendConnection();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testApiEndpoints();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testStudentRoutes();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testAdminRoutes();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsRunning(false);
  };

  // Auto-test backend connection on mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  const getRoleBadgeClass = (role) => {
    return role === 'TPO_ADMIN' 
      ? 'bg-purple-600 text-white px-2 py-1 rounded text-sm font-medium' 
      : 'bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium';
  };

  const getRoleText = (role) => {
    return role === 'TPO_ADMIN' ? 'TPO Admin' : 'Student';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🚀 OAuth Testing Dashboard</h1>
        <p className="text-gray-600 mb-8">Test your role-based authentication system running on <strong>{process.env.NEXT_PUBLIC_API_BASE_URL}</strong></p>

        {/* Authentication Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔐 Authentication Status</h2>
          
          {loading ? (
            <div className="text-blue-600">🔄 Checking authentication...</div>
          ) : isAuthenticated && user ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Authenticated User</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Name:</strong> {user.display_name || user.name}</div>
                <div><strong>Email:</strong> {user.email}</div>
                <div>
                  <strong>Role:</strong> 
                  <span className={`ml-2 ${getRoleBadgeClass(user.role)}`}>
                    {getRoleText(user.role)}
                  </span>
                </div>
                <div><strong>User ID:</strong> {user.id}</div>
                <div><strong>Profile Picture:</strong> {user.profilePicture ? '✅ Available' : '❌ Not set'}</div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-800">❌ Not authenticated - Please login first</div>
            </div>
          )}
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🧪 Test Controls</h2>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={testBackendConnection}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Test Backend Connection
            </button>
            <button 
              onClick={testApiEndpoints}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Test /api/me Endpoint
            </button>
            <button 
              onClick={testStudentRoutes}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Test Student Routes
            </button>
            <button 
              onClick={testAdminRoutes}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Test Admin Routes
            </button>
            <button 
              onClick={testLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Test Logout
            </button>
            <button 
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {isRunning ? '⏳ Running Tests...' : '🧪 Run All Tests'}
            </button>
          </div>
        </div>

        {/* OAuth Flow */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🎯 OAuth Flow</h2>
          <div className="flex gap-3">
            <a 
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium inline-block"
            >
              🚀 Start OAuth Login
            </a>
            <button 
              onClick={checkAuth}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              🔄 Refresh Auth State
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(testResults).map(([testName, result]) => (
            <div key={testName} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">{testName} Test Results</h3>
              <div className={`bg-gray-50 p-4 rounded-lg font-mono text-sm whitespace-pre-line ${result.isError ? 'text-red-600 bg-red-50' : 'text-gray-800'}`}>
                {result.content}
              </div>
            </div>
          ))}
        </div>

        {/* Role Information */}
        {isAuthenticated && user && (
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">👤 Role Information</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p><strong>Current Role:</strong> {user.role}</p>
              {user.role === 'STUDENT' ? (
                <div className="mt-2 text-sm text-gray-600">
                  <p>✅ Should have access to /api/student/* routes</p>
                  <p>❌ Should NOT have access to /api/admin/* routes</p>
                  <p>🎯 Frontend should redirect to /student/dashboard</p>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-600">
                  <p>✅ Should have access to /api/admin/* routes</p>
                  <p>✅ Should have access to /api/student/* routes</p>
                  <p>🎯 Frontend should redirect to /admin/dashboard</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <p><strong>💡 To test role changes:</strong></p>
              <ol className="mt-2 ml-4 list-decimal space-y-1">
                <li>Access your database</li>
                <li>Find your user record (email: {user.email})</li>
                <li>Change role field: <code>STUDENT</code> ↔ <code>TPO_ADMIN</code></li>
                <li>Refresh this page and test again</li>
              </ol>
              <p className="mt-2"><strong>SQL Example:</strong></p>
              <code className="bg-yellow-100 px-2 py-1 rounded">
                UPDATE users SET role = 'TPO_ADMIN' WHERE email = '{user.email}';
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}