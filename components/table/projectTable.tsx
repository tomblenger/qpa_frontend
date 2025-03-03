import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {FavouriteProject} from "@/app/admin/dashboard/page";

interface FavouriteProjectProps {
  projectData: FavouriteProject[];
}


const ProjectTable: React.FC<FavouriteProjectProps> = ({projectData}) => {
  const [data, setData] = useState<FavouriteProject[]>(projectData);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);

  interface CheckboxChangeEvent {
    target: {
      checked: boolean;
    };
  }
  
  useEffect(() => {
    console.log(checkedItems);
  }, [checkedItems]);
  const handleCheckboxChange = (event: CheckboxChangeEvent, id: number) => {
    
    let buf = [...checkedItems];
    buf.push(id);
    if(event.target.checked) {
      setCheckedItems(buf);
    } else {
      setCheckedItems(buf.filter(item => item !== id));
    }
  };

  const handleSelectAllChange = (event: CheckboxChangeEvent) => {
    const checked = event.target.checked;
    setIsSelectAllChecked(checked);
    if(checked) {
      var buf = [];
      for(let i = 0; i < data.length; i++) buf.push(i);
      setCheckedItems(buf);
    } else setCheckedItems([]);
  };

  useEffect(() => {
    if(checkedItems.length == data.length) setIsSelectAllChecked(true);
    else setIsSelectAllChecked(false);
  }, [checkedItems]);

  return (
    <div id="projects-panel" role="tabpanel">
      <table className="w-full border-spacing-0">
        <thead>
          <tr>
            <th className="w-12 p-4 bg-gray-50/50">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                checked={isSelectAllChecked}
                onChange={handleSelectAllChange}
              />
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Project Name
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Client
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Team
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Deadline
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Progress
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
            <th className="px-4 py-3 bg-gray-50/50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2 table-cell-hover rounded-lg p-1 -ml-1">
                Status
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden={true}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
        {data.map((item, index) => (
          <tr className={index % 2 == 1 ? "table-row-hover bg-yellow-50/50" : "table-row-hover"}>
            <td className="p-4 whitespace-nowrap">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                checked={checkedItems.findIndex(item => item === index) > -1}
                onChange={(e) => handleCheckboxChange(e, index)}
              />
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden={true}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">
                  {item.package_name}
                </span>
              </div>
            </td>
            <td className="px-4 py-3 text-gray-600">{item.client}</td>
            <td className="px-4 py-3">
              <div className="flex -space-x-2">
                <Image
                  src="/images/person1.jpg"
                  alt="user"
                  width={32}
                  height={32}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <Image
                  src="/images/person1.jpg"
                  alt="user"
                  width={32}
                  height={32}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  {item.team}
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-gray-600">{item.deadline}</td>
            <td className="px-4 py-3">
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-brand-500 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${item.progress}%`,
                    background:
                      'linear-gradient(90deg, rgba(132, 184, 148, 0.8), rgba(132, 184, 148, 1))'
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{item.progress}% Complete</div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  {item.progress}
                </span>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
}
export default ProjectTable;