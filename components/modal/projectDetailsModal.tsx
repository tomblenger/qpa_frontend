import type { TypeUser } from '@/lib/types';
import { isNonEmptyArray } from '@/lib/utils/functions';
import React from 'react';

type DateType = {
  due: string;
  renewal: string;
  start: string;
};

export interface ProjectData {
  projectTitle?: string;
  clientName?: string;
  status?: string;
  dates?: DateType;
  type?: string;
  progress?: { used?: number; total?: number; percent?: number };
  teamMembers?: TypeUser[];
  details: {
    servicesProvided?: string[];
    hourlyRate?: string;
    monthlyHours?: string;
    packageLevel?: string;
    postsPerWeek?: string;
    platforms?: string[];
    projectType?: string;
    currentPhase?: string;
    technologies?: string[];
    managementAreas?: string[];
  };
}

export default function ProjectDetailModal({
  onClose,
  data
}: {
  onClose: () => void;
  data: ProjectData | null;
}) {
  if (!data) {
    return null;
  }
  const statusColorMap: Record<string, string> = {
    Active: 'bg-emerald-50 text-emerald-700',
    'In Progress': 'bg-blue-50 text-blue-700',
    'Pending Review': 'bg-yellow-50 text-yellow-700',
    'On Track': 'bg-green-50 text-green-700'
  };
  const iconMap: Record<string, { bg: string; text: string; icon: string }> = {
    va: {
      bg: 'bg-blue-100',
      text: 'text-blue-500',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    obm: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-500',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    smm: {
      bg: 'bg-purple-100',
      text: 'text-purple-500',
      icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11'
    },
    wds: {
      bg: 'bg-rose-100',
      text: 'text-rose-500',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
    }
  };

  const getHourlyProgressTemplate = (data: ProjectData) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-500">Monthly Hours</span>
          <span className="text-gray-900 font-medium">
            {data?.progress?.used}/{data?.progress?.total} hrs
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`bg-${
              data.type === 'va' ? 'blue' : 'indigo'
            }-500 h-1.5 rounded-full`}
            style={{ width: `${data?.progress?.percent || 100}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500">Used Today</div>
            <div className="text-sm font-medium text-gray-900">2.5 hrs</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500">This Week</div>
            <div className="text-sm font-medium text-gray-900">12.5 hrs</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-500">Remaining</div>
            <div className="text-sm font-medium text-gray-900">
              ${(data?.progress?.total || 0) - (data?.progress?.used || 0)} hrs
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getMilestonesTemplate = (data: ProjectData) => {
    const milestones: Record<string, string[]> = {
      smm: ['Strategy', 'Content', 'Publishing', 'Review'],
      wds: ['Design', 'Development', 'Testing', 'Launch']
    };

    return (milestones[data?.type || ''] || []).map((milestone, index) => (
      <div
        key={index}
        className={`text-center p-2 ${
          index < 2 ? 'bg-green-50' : index === 2 ? 'bg-blue-50' : 'bg-gray-50'
        } rounded-lg`}
      >
        <div
          className={`text-xs ${
            index < 2
              ? 'text-green-600'
              : index === 2
              ? 'text-blue-600'
              : 'text-gray-500'
          }`}
        >
          {index < 2 ? 'Complete' : index === 2 ? 'In Progress' : 'Upcoming'}
        </div>
        <div className="text-sm font-medium">{milestone}</div>
      </div>
    ));
  };

  const getFixedPriceProgressTemplate = (data: ProjectData) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-500">Project Progress</span>
          <span className="text-gray-900 font-medium">
            {data?.progress?.percent}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className={`bg-${
              data.type === 'smm' ? 'purple' : 'rose'
            }-500 h-1.5 rounded-full`}
            style={{ width: `${data?.progress?.percent || 100}%` }}
          />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {getMilestonesTemplate(data)}
        </div>
      </div>
    );
  };

  const getDetailsTemplate = (data: ProjectData) => {
    // Ensure data.details exists
    const details = data.details || {};

    const commonDetails = () => (
      <>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Created</span>
          <span className="text-gray-900">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Last Activity</span>
          <span className="text-gray-900">2 hours ago</span>
        </div>
      </>
    );

    const typeSpecificDetails = (type: string) => {
      return type === 'va' ? (
        <>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Hourly Rate</span>
            <span className="text-gray-900">{details.hourlyRate || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Monthly Hours</span>
            <span className="text-gray-900">
              {details.monthlyHours || 'N/A'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-gray-500">
              Services Provided
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(details.servicesProvided || []).map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : type === 'smm' ? (
        <>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Package Level</span>
            <span className="text-gray-900">
              {details.packageLevel || 'N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Posts per Week</span>
            <span className="text-gray-900">
              {details.postsPerWeek || 'N/A'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-gray-500">Platforms</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(details.platforms || []).map((platform, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : type === 'wds' ? (
        <>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Project Type</span>
            <span className="text-gray-900">
              {details.projectType || 'N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Current Phase</span>
            <span className="text-gray-900">
              {details.currentPhase || 'N/A'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-gray-500">
              Technologies
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(details.technologies || []).map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Hourly Rate</span>
            <span className="text-gray-900">{details.hourlyRate || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Monthly Hours</span>
            <span className="text-gray-900">
              {details.monthlyHours || 'N/A'}
            </span>
          </div>
          <div className="mt-3">
            <span className="text-xs font-medium text-gray-500">
              Management Areas
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(details.managementAreas || []).map((area, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </>
      );
    };

    return (
      <>
        {commonDetails()}
        {typeSpecificDetails(data.type || '')}
      </>
    );
  };

  const getTimelineTemplate = () => {
    return (
      <>
        <div className="relative pl-10 pb-6  border-gray-300/50 border-l-2">
          <div className="absolute -left-2 -top-1 w-4 h-4 rounded-full bg-brand-500" />
          <div className="text-sm space-x-2">
            <span className="font-medium text-gray-900">Sarah Wilson</span>
            <span className="text-gray-500">
              logged 2.5 hours for Content Creation
            </span>
          </div>
          <span className="text-xs text-gray-400">2 hours ago</span>
        </div>
        <div className="relative pl-10 pb-6  border-gray-300/50 border-l-2 ">
          <div className="absolute -left-2 -top-1 w-4 h-4 rounded-full bg-gray-200" />
          <div className="text-sm space-x-2">
            <span className="font-medium text-gray-900">Mike Johnson</span>
            <span className="text-gray-500">
              completed milestone: Strategy Phase
            </span>
          </div>
          <span className="text-xs text-gray-400">Yesterday at 4:30 PM</span>
        </div>
        <div className="relative pl-10 pb-6  border-gray-300/50 border-l-2 ">
          <div className="absolute -left-2 -top-1 w-4 h-4 rounded-full bg-gray-200" />
          <div className="text-sm space-x-2">
            <span className="font-medium text-gray-900">Emily Chen</span>
            <span className="text-gray-500">added a comment</span>
          </div>
          <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            Updated the content calendar for next week. Please review when you
            have a chance.
          </p>
          <span className="text-xs text-gray-400">2 days ago</span>
        </div>
      </>
    );
  };

  const { projectTitle, clientName, status, dates, type } = data;
  return (
    <div
      id="projectDetailsModal"
      className="modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-4xl bg-white rounded-xl shadow-lg z-50 active"
    >
      <div className="relative flex flex-col max-h-[90vh]">
        {/* <!-- Header --> */}
        <div className="sticky top-0 z-20 bg-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                id="projectTypeIcon"
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  iconMap[type || ''].bg
                }`}
              >
                {/* <!-- Icon will be inserted dynamically --> */}
                <svg
                  className={`w-5 h-5 ${iconMap[type || ''].text}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d={`${iconMap[type || ''].icon}`}
                  />
                </svg>
              </div>
              <div>
                <h2
                  id="projectTitle"
                  className="text-xl font-semibold text-gray-900"
                >
                  {projectTitle}
                </h2>
                <p id="clientName" className="text-sm text-gray-500">
                  {clientName}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden={true}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* <!-- Content --> */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* <!-- Status Bar --> */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span
                  id="projectStatus"
                  className={`inline-flex items-center ${
                    statusColorMap[status || 0]
                  } px-2.5 py-1 rounded-lg text-xs font-medium`}
                >
                  {/* <!-- Status will be inserted dynamically --> */}
                  {status}
                </span>
                <span className="h-4 w-px bg-gray-200" />
                <span id="projectDates" className="text-sm text-gray-500">
                  {/* <!-- Dates will be inserted dynamically --> */}
                  {dates?.due
                    ? `Due${dates?.due}`
                    : dates?.renewal
                    ? `Renews${dates?.renewal}`
                    : `Started ${dates?.start}`}
                </span>
              </div>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="text-sm text-brand-500 hover:text-brand-600 font-medium">
                Edit Project
              </button>
            </div>

            {/* <!-- Progress Section --> */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div id="progressSection">
                {/* <!-- Progress content will be inserted dynamically based on project type --> */}
                {data.type === 'va' || data.type === 'obm'
                  ? getHourlyProgressTemplate(data)
                  : getFixedPriceProgressTemplate(data)}
              </div>
            </div>

            {/* <!-- Team Section --> */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Team Members
                </h3>
                <div id="teamMembers" className="space-y-3">
                  {/* <!-- Team members will be inserted dynamically --> */}
                  {isNonEmptyArray(data.teamMembers) &&
                    data.teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={member.avatar}
                          alt={member.full_name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {member.full_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {member.role}
                          </div>
                        </div>
                        <span className="ml-auto flex items-center gap-1 text-xs font-medium text-green-600">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          {member.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Project Details
                </h3>
                <div id="projectDetails" className="space-y-3">
                  {/* <!-- Project details will be inserted dynamically --> */}
                  {getDetailsTemplate(data)}
                </div>
              </div>
            </div>

            {/* <!-- Activity Timeline --> */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div id="activityTimeline" className="space-y-4">
                {/* <!-- Timeline will be inserted dynamically --> */}
                {getTimelineTemplate()}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                View Time Logs
              </button>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                View Files
              </button>
            </div>
            <div className="flex items-center gap-3">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700">
                Archive Project
              </button>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600">
                Start Timer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
