import React, {useState} from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {ActivityData} from "@/app/admin/dashboard/page";

// Sample data with more realistic values
const data = {
  month: [
    { name: "Week 1", revenue: 120000, users: 20 },
    { name: "Week 2", revenue: 130000, users: 25 },
    { name: "Week 3", revenue: 110000, users: 18 },
    { name: "Week 4", revenue: 140000, users: 22 },
  ],
  month_3: [
    { name: "Jan", revenue: 350000, users: 60 },
    { name: "Feb", revenue: 380000, users: 65 },
    { name: "Mar", revenue: 400000, users: 70 },
  ],
  year: [
    { name: "Q1", revenue: 1200000, users: 180 },
    { name: "Q2", revenue: 1300000, users: 190 },
    { name: "Q3", revenue: 1250000, users: 175 },
    { name: "Q4", revenue: 1350000, users: 185 },
  ],
}

interface ActivityChartProps {
  index: number;
  chartData: ActivityData;
}

const ActivityChart: React.FC<ActivityChartProps> = ({
                                                       index,
                                                       chartData}) => {
  const [activityData, setActivityData] = useState<ActivityData>(chartData);
  
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={Object.values(activityData)[index]}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#84b894"
          fill="#84b894"
          fillOpacity={0.1}
          strokeWidth={2}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#60a5fa"
          fill="#60a5fa"
          fillOpacity={0.1}
          strokeWidth={2}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;
