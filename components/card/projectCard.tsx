import React, {useState} from 'react';
import NoColorBadge from '../badge/noColorBadge';
import {ProjectData} from "@/app/admin/dashboard/page";

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard:React.FC<ProjectCardProps> = ({project}) => {
  const [projectData, setProjectData] = useState<ProjectData>(project);
  return (
    <div
      className="stats-card gradient-border card-shine p-6 rounded-2xl animate-in bg-white"
      style={{ animationDelay: '0.2s' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-500">Active Projects</h3>
            <div className="text-2xl font-bold text-gray-900">{projectData.total}</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-purple-500 bg-purple-50 px-3 py-1 rounded-lg text-sm font-medium">
            {projectData.growth > 0 ? '+' : '-'}{projectData.growth}%
          </span>
          <span className="text-xs text-gray-400 m-1">vs last month</span>
        </div>
      </div>
      <div className="neon-line my-4"></div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <NoColorBadge title="In Progress" count={projectData.progress} />
        <NoColorBadge title="In Review" count={projectData.review} />
        <NoColorBadge title="On Hold" count={projectData.hold} />
      </div>
    </div>
  );
}

export default ProjectCard;