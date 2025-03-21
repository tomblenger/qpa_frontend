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
import {AppDispatch, RootState} from "@/app/admin/reducers/store";
import {useDispatch, useSelector} from "react-redux";
import {getOverview, getTableData} from "@/app/admin/reducers/dashboard";
import ProjectCreateModal from "@/components/modal/projectCreateModal";
import ProjectDetailModal from "@/components/modal/projectDetailsModal";
import EditTaskModal from '@/components/modal/editTaskModal';




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

export type table_employees = {
  id: number;
  full_name: string;
  avatar: string;
  email: string;
  country: string;
  phone: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  verified: boolean;
}

export type table_Project = {
  package_name: string;
  client: string;
  team: string;
  deadline: string;
  progress: number;
  status: string;
}

export type table_task = {
  title: string;
  assignee: string;
  priority: string;
  due_date: string;
  project: string;
  status: string;
}

export type table_client = {
  title: string,
  assignee: string,
  name: string;
  priority: number,
  due_date: Date,
  project: string,
  status: string;
  total_value: number;
}

export type OverviewDataType = {
  revenue: RevenueData;
  project: ProjectData;
  task: TaskData;
  member: MemberData;
  activity: ActivityData;
}

export type TableDataType = {
  employees?: table_employees[];
  projects?: table_Project[];
  tasks?: table_task[];
  clients?: table_client[];
}

export default function Dashboard() {

  const [index, setIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [modal, setModal] = useState<string>('');
  const [keyword, setKeyword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const dashboard = useSelector((state: RootState) => state.dashboard)


  useEffect(() => {
    dispatch(getOverview);
    dispatch(getTableData);
  }, [dispatch]);

  useEffect(() => {
    handleSearch(keyword)
  }, [keyword]);

  const handleIndex = (index: number) => {
    setIndex(index);
  };

  const handleSearch = (search: string) => {
    setKeyword(search);
  }

  const handleClick = (index: number) => {
    if (index === 0) {
      setModal('employees');
    } else if (index === 1) {
      setModal('projects');
    } else if (index === 2) {
      setModal('tasks');
    } else if (index === 3) {
      setModal('clients');
    }
  }

  const Close = () => {
    setModal(false);
  }

  return (
    <>
      <div className="py-20 pl-64 pr-6 w-screen min-h-screen overflow-x-hidden">
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <RevenueCard revenue={dashboard.overviewData.revenue} />
            <ProjectCard project={dashboard.overviewData.project}/>
            <TaskCard task={dashboard.overviewData.task}/>
            <MemberCard member={dashboard.overviewData.member}/>
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
              <ActivityChart index={activityIndex} chartData={dashboard.overviewData.activity}/>
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
                      onChange={(e) => {handleSearch(e.target.value)}}
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
                    onClick={() => handleClick(index)}
                    className="h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-green-700 transition-colors"
                  >

                    Add New

                  </button>
                  {
                    index === 0 && modal === 'employees' ? <></> :
                      index === 1 && modal === 'projects' ? <ProjectCreateModal closeEvent={Close} /> :
                        index === 2 && modal === 'tasks' ? <EditTaskModal closeModal={Close} /> :
                          index === 3 && modal === 'clients' ? <ProjectCreateModal closeEvent={Close} /> : <></>
                  }
                </div>
              </div>
            </div>

            {index === 0 ? (
              <EmployeeTable employeeData={dashboard.tableData.employees ?? []}/>
            ) : index === 1 ? (
              <ProjectTable projectData={dashboard.tableData.projects ?? []}/>
            ) : index === 2 ? (
              <TaskTable taskData={dashboard.tableData.tasks ?? []}/>
            ) : index === 3 ? (
              <ClientTable clientData={dashboard.tableData.clients ?? []}/>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
