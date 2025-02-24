// import ProjectDetailModal from "@/components/modal/projectDetailsModal";
// import { useState } from "react";
'use client';

import type { ProjectData } from '@/components/modal/projectDetailsModal';
import type { TypeProject } from '@/lib/types';
import { isNonEmptyArray } from '@/lib/utils/functions';

interface VACardProps {
  onClick: (param1: number, param2: ProjectData) => void;
  project?: TypeProject;
}

const VACard: React.FC<VACardProps> = ({ onClick, project }) => {
  const data: ProjectData = {
    projectTitle: project?.title || '',
    clientName:
      (isNonEmptyArray(project?.requestedProjectClient) &&
        project?.requestedProjectClient[0].full_name) ||
      '',
    status: project?.state || '',
    dates: { due: '', renewal: '', start: project?.start_date || '' },
    type: project?.project_type || '',
    progress: { used: 12, total: 20, percent: Math.floor((12 / 20) * 100) },
    teamMembers: project?.assignedProjectUser,
    details: {
      servicesProvided: project?.services?.split(','),
      hourlyRate: `${project?.rate}/hr`,
      monthlyHours: `${project?.monthly_hours} hours`,

      packageLevel: project?.package_level,
      postsPerWeek: '7 posts',
      platforms: project?.platforms?.split(','),
      projectType: project?.package_type,
      currentPhase: 'Current Phase',
      technologies: project?.technology?.split(','),
      managementAreas: [
        'Project Management',
        'Team Coordination',
        'Process Optimization'
      ]
    }
  };
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">
                    {project?.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">
                    {project?.package_type?.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {isNonEmptyArray(project?.requestedProjectClient) &&
                    project?.requestedProjectClient[0].full_name}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              {project?.state}
            </span>
          </div>

          {/* <!-- Hours Tracking --> */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Monthly Hours</span>
                <span className="text-gray-900 font-medium">
                  {project?.monthly_hours}/{project?.monthly_hours} hrs
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{
                    width: `${
                      ((project?.monthly_hours || 0) /
                        (project?.monthly_hours || 1)) *
                      100
                    }%`
                  }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Current Week</span>
                <span className="text-gray-900 font-medium">4.5 hrs used</span>
              </div>
              <div className="flex items-center gap-2">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Start Timer
                </button>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                  Add Time Log
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <img
                  src="/images/person1.jpg"
                  alt=""
                  className="w-8 h-8 rounded-lg ring-2 ring-white object-cover"
                />
                <div className="w-8 h-8 rounded-lg bg-gray-100 ring-2 ring-white flex items-center justify-center text-xs text-gray-500">
                  +2
                </div>
              </div>
              <span className="text-xs text-gray-500">Renews in 12 days</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
              {project?.state}
            </span>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              className="text-sm text-brand-500 hover:text-brand-600 font-medium"
              onClick={() => onClick(0, data)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VACard;
