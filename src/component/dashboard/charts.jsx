"use client";
// components/dashboard/Charts.tsx

import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

export function LineChart({ userRole = 'STUDENT' }) {
  // Different data based on role
  const getData = () => {
    if (userRole === 'TPO_ADMIN') {
      return [
        {
          id: 'Total Campaigns',
          data: [
            { x: 'Jan', y: 120 },
            { x: 'Feb', y: 190 },
            { x: 'Mar', y: 270 },
            { x: 'Apr', y: 200 },
            { x: 'May', y: 250 },
            { x: 'Jun', y: 300 },
          ],
        },
        {
          id: 'Active Students',
          data: [
            { x: 'Jan', y: 80 },
            { x: 'Feb', y: 120 },
            { x: 'Mar', y: 150 },
            { x: 'Apr', y: 140 },
            { x: 'May', y: 156 },
            { x: 'Jun', y: 142 },
          ],
        },
      ];
    }
    
    return [
      {
        id: 'My Applications',
        data: [
          { x: 'Jan', y: 12 },
          { x: 'Feb', y: 19 },
          { x: 'Mar', y: 27 },
          { x: 'Apr', y: 20 },
          { x: 'May', y: 25 },
          { x: 'Jun', y: 30 },
        ],
      },
    ];
  };

  return (
    <div className="h-60">
      <ResponsiveLine
        data={getData()}
        margin={{ top: 10, right: 20, bottom: 50, left: 40 }}
        axisBottom={{ tickRotation: -30 }}
        colors={{ scheme: 'purple' }}
        theme={{ textColor: '#333' }}
        curve="monotoneX"
        enablePoints={true}
        pointSize={6}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
      />
    </div>
  );
}

export function BarChart({ userRole = 'STUDENT' }) {
  // Different data based on role
  const getData = () => {
    if (userRole === 'TPO_ADMIN') {
      return [
        { category: 'Backend', value: 450 },
        { category: 'Frontend', value: 380 },
        { category: 'DevOps', value: 300 },
        { category: 'Mobile', value: 240 },
        { category: 'AI/ML', value: 180 },
      ];
    }
    
    return [
      { category: 'Backend', value: 45 },
      { category: 'Frontend', value: 38 },
      { category: 'DevOps', value: 30 },
      { category: 'Mobile', value: 24 },
    ];
  };

  return (
    <div className="h-60">
      <ResponsiveBar
        data={getData()}
        keys={['value']}
        indexBy="category"
        margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
        padding={0.3}
        colors="#A46EDB"
        theme={{ textColor: '#333' }}
      />
    </div>
  );
}
  );
}

export function PieChart({ userRole = 'STUDENT' }) {
  // Different data based on role
  const getData = () => {
    if (userRole === 'TPO_ADMIN') {
      return [
        { id: 'Active Students', value: 142 },
        { id: 'Inactive Students', value: 14 },
        { id: 'Pending Approval', value: 8 },
        { id: 'Graduated', value: 25 },
      ];
    }
    
    return [
      { id: 'Applied', value: 35 },
      { id: 'Interviewed', value: 30 },
      { id: 'Rejected', value: 25 },
      { id: 'Offer', value: 10 },
    ];
  };

  return (
    <div className="h-60">
      <ResponsivePie
        data={getData()}
        colors={['#4F21A1', '#6B1C9A', '#A46EDB', '#D4BBF0']}
        margin={{ top: 10, bottom: 10 }}
        innerRadius={0.5}
        theme={{ textColor: '#333' }}
        enableArcLabels={false}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#333',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle',
          }
        ]}
      />
    </div>
  );
}

export default function Charts({ userRole = 'STUDENT' }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {userRole === 'TPO_ADMIN' ? 'System Overview' : 'My Progress'}
        </h3>
        <LineChart userRole={userRole} />
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {userRole === 'TPO_ADMIN' ? 'Applications by Category' : 'Applications by Category'}
        </h3>
        <BarChart userRole={userRole} />
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {userRole === 'TPO_ADMIN' ? 'Student Status' : 'Application Status'}
        </h3>
        <PieChart userRole={userRole} />
      </div>
    </div>
  );
}
