import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {FavouriteTask} from "@/app/admin/dashboard/page";

interface TaskTableProps {
  taskData: FavouriteTask[];
}

const TaskTable:React.FC<TaskTableProps> = ({taskData}) =>  {
  const [data, setData] = useState<FavouriteTask[]>(taskData);
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
    <div id="tasks-panel" role="tabpanel">
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
                Task
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                Assignee
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                Priority
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                Due Date
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                Project
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
              <span className="font-medium text-gray-900">
                Update User Interface
              </span>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/person1.jpg"
                  alt="user"
                  width={32}
                  height={32}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-gray-600">{item.assignee}</span>
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                {item.priority}
              </span>
            </td>
            <td className="px-4 py-3 text-gray-600">{item.due_date}</td>
            <td className="px-4 py-3 text-gray-600">{item.project}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                  {item.status}
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
export default TaskTable;