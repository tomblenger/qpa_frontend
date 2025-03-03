'use client';
import ButtonSecondary from '@/components/button/buttonSecondary';
import MemberCard from '@/components/card/memberCard';
import ProjectCard from '@/components/card/projectCard';
import RevenueCard from '@/components/card/revenueCard';
import TaskCard from '@/components/card/taskCard';
import ActivityChart from '@/components/charts/LineChart';
import ClientTable from '@/components/table/clientTable';
import EmployeeTable from '@/components/table/employeeTable';
import ProjectTable from '@/components/table/projectTable';
import TaskTable from '@/components/table/taskTable';
import { useEffect, useState } from 'react';

export interface RevenueData {
  total: number;
  growth: number;
  monthly_goal: number;
  progress: number;
}

export interface ProjectData {
  total: number;
  progress: number;
  review: number;
  hold: number;
  growth: number;
}

export interface TaskData {
  total: number;
  pending: number;
  ongoing: number;
  done: number;
  overdue: number;
  growth: number;
}

export interface MemberData {
  total: number;
  register_week: number;
  register_now: number;
}

export interface weekData {
  name: string;
  revenue: number;
  users: number;
}

export type ActivityData = {
  month: weekData [];
  month_3: weekData [];
  year: weekData [];
}

type DashboardData = {
  revenue: RevenueData;
  project: ProjectData;
  task: TaskData;
  member: MemberData;
  activity: ActivityData;
}

export type FavouriteProject = {
  package_name: string;
  client: string;
  team: string;
  deadline: string;
  progress: number;
  status: string;
}

export type FavouriteMember = {
  full_name: string;
  site: string;
  job_title: string;
  job_description: string;
  position: string;
  department: string;
  site_name: string;
  salary: string;
  start_date: string;
  status: string,
}

export type FavouriteClient = {
  title: string,
  assignee: string,
  name: string;
  priority: number,
  due_date: Date,
  project: string,
  status: string;
  total_value: number;
}

export type FavouriteTask = {
  title: string;
  assignee: string;
  priority: string;
  due_date: string;
  project: string;
  status: string;
}


export default function Dashboard() {
  
  const [index, setIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    revenue: {
      total: 500000,
      growth: 12.5,
      monthly_goal: 600000,
      progress: 83.3,
    },
    project: {
      total: 120,
      progress: 75,
      review: 20,
      hold: 10,
      growth: 8.2,
    },
    task: {
      total: 500,
      pending: 120,
      ongoing: 200,
      done: 150,
      overdue: 30,
      growth: 6.4,
    },
    member: {
      total: 50,
      register_week: 5,
      register_now: 2,
    },
    activity: {
      month: [
        {name: "Week 1", revenue: 120000, users: 20},
        {name: "Week 2", revenue: 130000, users: 25},
        {name: "Week 3", revenue: 110000, users: 18},
        {name: "Week 4", revenue: 140000, users: 22},
      ],
      month_3: [
        {name: "Jan", revenue: 350000, users: 60},
        {name: "Feb", revenue: 380000, users: 65},
        {name: "Mar", revenue: 400000, users: 70},
      ],
      year: [
        {name: "Q1", revenue: 1200000, users: 180},
        {name: "Q2", revenue: 1300000, users: 190},
        {name: "Q3", revenue: 1250000, users: 175},
        {name: "Q4", revenue: 1350000, users: 185},
      ],
    },
  });
  
  const [favouriteMember, setFavouriteMember] = useState<FavouriteMember[]>([
    {
      full_name: "John Doe",
      site: "New York",
      job_title: "Software Engineer",
      job_description: "Developing and maintaining software solutions.",
      position: "Lead Developer",
      department: "Engineering",
      site_name: "TechCorp Headquarters",
      salary: "$100,000",
      start_date: "2020-02-13",
      status: "Active"
    },
    {
      full_name: "John Doe",
      site: "New York",
      job_title: "Software Engineer",
      job_description: "Developing and maintaining software solutions.",
      position: "Lead Developer",
      department: "Engineering",
      site_name: "TechCorp Headquarters",
      salary: "$100,000",
      start_date: "2020-02-13",
      status: "Active"
    },
    {
      full_name: "John Doe",
      site: "New York",
      job_title: "Software Engineer",
      job_description: "Developing and maintaining software solutions.",
      position: "Lead Developer",
      department: "Engineering",
      site_name: "TechCorp Headquarters",
      salary: "$100,000",
      start_date: "2020-02-13",
      status: "Active"
    },
    {
      full_name: "John Doe",
      site: "New York",
      job_title: "Software Engineer",
      job_description: "Developing and maintaining software solutions.",
      position: "Lead Developer",
      department: "Engineering",
      site_name: "TechCorp Headquarters",
      salary: "$100,000",
      start_date: "2020-02-13",
      status: "Active"
    },
  ]);
  const [favouriteProject, setFavouriteProject] = useState<FavouriteProject[]>([
    {
      package_name: "Website Redesign",
      client: "TechCorp",
      team: "+3",
      deadline: "2025-06-30",
      progress: 75,
      status: "In Progress",
    },
    {
      package_name: "Mobile App Overhaul",
      client: "MegaSoft Solutions",
      team: "+4",
      deadline: "2025-05-15",
      progress: 50,
      status: "In Progress",
    },
    {
      package_name: "E-commerce Website Launch",
      client: "LuxeHardware",
      team: "+2",
      deadline: "2025-04-10",
      progress: 90,
      status: "Completed",
    },
    {
      package_name: "Tech Integration Project",
      client: "RedApp Technologies",
      team: "+5",
      deadline: "2025-08-20",
      progress: 40,
      status: "Not Started",
    },
    {
      package_name: "Cloud Platform Migration",
      client: "Titan Industries",
      team: "+6",
      deadline: "2025-09-01",
      progress: 30,
      status: "In Progress",
    },
  ]);
  const [favouriteTask, setFavouriteTask] = useState<FavouriteTask[]>([
    {
      title: "Update User Interface",
      assignee: "Anatoly Belik",
      priority: "High",
      due_date: "Nov 30, 2024",
      project: "Website Redesign",
      status: "In Review",
    },
    {
      title: "Fix Login Bug",
      assignee: "Jenna Lee",
      priority: "Medium",
      due_date: "Dec 15, 2024",
      project: "Mobile App Update",
      status: "In Progress",
    },
    {
      title: "SEO Optimization",
      assignee: "David Kline",
      priority: "Low",
      due_date: "Jan 5, 2025",
      project: "E-commerce Website",
      status: "Not Started",
    },
    {
      title: "Develop API for New Feature",
      assignee: "Olivia Martin",
      priority: "High",
      due_date: "Dec 25, 2024",
      project: "Tech Integration",
      status: "In Progress",
    },
    {
      title: "Write Blog Post",
      assignee: "Liam Turner",
      priority: "Low",
      due_date: "Jan 10, 2025",
      project: "Content Marketing",
      status: "Completed",
    },
  ]);
  const [favouriteClient, setFavouriteClient] = useState<FavouriteClient[]>([
    {
      assignee: "TC",
      title: "TechCorp Industries",
      name: "Sarah Johnson",
      priority: 3,
      due_date: new Date("2025-06-30"),
      project: "active projects",
      status: "active",
      total_value: 4055,
    },
    {
      assignee: "MS",
      title: "MegaSoft Solutions",
      name: "John Doe",
      priority: 2,
      due_date: new Date("2025-05-15"),
      project: "upcoming projects",
      status: "pending",
      total_value: 4055,
    },
    {
      assignee: "LH",
      title: "LuxeHardware",
      name: "Emily Clark",
      priority: 1,
      due_date: new Date("2025-04-22"),
      project: "new clients",
      status: "active",
      total_value: 4055,
    },
    {
      assignee: "RA",
      title: "RedApp Technologies",
      name: "Mark Smith",
      priority: 4,
      due_date: new Date("2025-08-10"),
      project: "high priority projects",
      status: "active",
      total_value: 4055,
    },
    {
      assignee: "TC",
      title: "Titan Industries",
      name: "Rachel Adams",
      priority: 5,
      due_date: new Date("2025-07-01"),
      project: "active projects",
      status: "completed",
      total_value: 4055,
    },
  ]);

  useEffect(() => {
    getDashboardData();
    getFavouriteProjectData();
    // getFavouriteTaskData();
    // getFavouriteEmployeeData();
    // getFavouriteClientData();
  }, []);
  
  const getDashboardData = async () => {
    const token = localStorage.getItem('access_token');
    const status = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/dashboard`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }
      }
    );
    if(status.status === 200) {
      const responseData = await status.json();
      const { dashboardData} = responseData;
      console.log(dashboardData);
      if(dashboardData) setDashboardData(dashboardData);
      alert("success");
    }
    else {
      console.log('Error in getSettings');
      alert("failed");
    }
  }
  
  const getFavouriteProjectData = async () => {
    const token = sessionStorage.getItem('access_token');
    console.log(token);
    const status = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/dashboard`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }
      }
    );
    if(status.status === 200) {
      const responseData = await status.json();
      console.log(responseData);
      const { dashboardData } = responseData;
      // setDashboardData(dashboardData);
    }
    else {
      console.log('Error in getSettings');
    }
  }
  
  const handleIndex = (index: number) => {
    setIndex(index);
  };

  return (
    <>
      <div className="py-20 pl-64 pr-6 w-screen min-h-screen overflow-x-hidden">
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <RevenueCard revenue={dashboardData.revenue} />
            <ProjectCard project={dashboardData.project}/>
            <TaskCard task={dashboardData.task}/>
            <MemberCard member={dashboardData.member}/>
          </div>

          <div className="flex flex-col stats-card gradient-border card-shine p-6 rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Activity Overview
                </h3>
                <p className="text-sm text-gray-500">
                  Monthly performance metrics
                </p>
              </div>
              <select
                onChange={(e) => {setActivityIndex(e.target.selectedIndex)}}
                className="px-4 py-2 rounded-xl bg-gray-50 text-sm font-medium text-gray-600 border-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="w-100 h-[300]" id="chart">
              <ActivityChart index={activityIndex} chartData={dashboardData.activity}/>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-x-auto">
            <div className="border-b border-gray-100">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <ButtonSecondary
                    title="Employees"
                    count={8}
                    onClick={handleIndex}
                    index={0}
                    isActive={index === 0}
                  />
                  <ButtonSecondary
                    title="Projects"
                    count={12}
                    onClick={handleIndex}
                    index={1}
                    isActive={index === 1}
                  />
                  <ButtonSecondary
                    title="Tasks"
                    count={24}
                    onClick={handleIndex}
                    index={2}
                    isActive={index === 2}
                  />
                  <ButtonSecondary
                    title="Clients"
                    count={6}
                    onClick={handleIndex}
                    index={3}
                    isActive={index === 3}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-64 h-9 pl-9 pr-4 text-sm bg-gray-50 border-none rounded-lg bg-white/50 border border-gray-100 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all duration-300"
                    />
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg
                      className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <button
                    
                    className="h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-green-700 transition-colors">
                    Add New
                  </button>
                </div>
              </div>
            </div>

            {index === 0 ? (
              <EmployeeTable employeeData={favouriteMember}/>
            ) : index === 1 ? (
              <ProjectTable projectData={favouriteProject}/>
            ) : index === 2 ? (
              <TaskTable taskData={favouriteTask}/>
            ) : index === 3 ? (
              <ClientTable clientData={favouriteClient}/>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
