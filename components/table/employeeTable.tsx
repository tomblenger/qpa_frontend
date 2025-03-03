import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {FavouriteMember} from "@/app/admin/dashboard/page";

interface EmployeeTableProps {
  employeeData: FavouriteMember[];
}

const EmployeeTable:React.FC<EmployeeTableProps> = ({employeeData}) =>  {

  const [data, setData] = useState<FavouriteMember[]>(employeeData);
  const [checkedItems, setCheckedItems] = useState<any []>([]);
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
      let buf = [];
      for(let i = 0; i < data.length; i++) buf.push(i);
      setCheckedItems(buf);
    } else setCheckedItems([]);
  };
  
  useEffect(() => {
    if(checkedItems.length == data.length) setIsSelectAllChecked(true);
    else setIsSelectAllChecked(false);
  }, [checkedItems]);
  
  return (
    <div id="employees-panel" role="tabpanel">
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
                Name
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
                Job Title
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
                Department
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
                Site
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
                Salary
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
                Start Date
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
        {
          data.map((item, index) => (
            <tr className={index % 2 == 1 ? "table-row-hover bg-yellow-50/50" : "table-row-hover"} key={index}>
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
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/person1.jpg"
                      alt="user"
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-gray-100"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.full_name}</div>
                    <div className="text-xs text-gray-500">
                      {item.site}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.job_title}</div>
                <div className="text-xs text-gray-500">{item.job_description}</div>
              </td>
              <td className="px-4 py-3 text-gray-600">{item.department}</td>
              <td className="px-4 py-3 text-gray-600">{item.site_name}</td>
              <td className="px-4 py-3 text-gray-900 font-medium">{item.salary}</td>
              <td className="px-4 py-3 text-gray-600">{item.start_date}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
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

export default EmployeeTable;
