'use client';
import React, { useState } from 'react';

import Toast from '../toast';
import {toast, ToastContainer} from 'react-toastify';
import {PermissionProps} from '@/app/admin/settings/SettingsContent';
export interface EditPermissionModalProps {
  closeEvent: () => void;
  permission: PermissionProps[];
  role: string;
}
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

const EditPermissionModal: React.FC<EditPermissionModalProps> = ({
                                                           closeEvent,
                                                           permission,
                                                           role
                                                         }) => {

  const [permissions, setPermissions] = useState<PermissionProps[]>(permission);
  
  // Toggle checkbox state
  const togglePermission = (rowIndex: number, key: keyof PermissionProps) => {
    setPermissions((prev) =>
      prev.map((perm, index) =>
        index === rowIndex ? { ...perm, [key]: !perm[key] } : perm
      )
    );
  };
  
  // Render checkbox inside table cells
  const renderCheckbox = (rowData: PermissionProps, column: any) => {
    return (
      <Checkbox
        inputId={`${rowData.name}-${column.field}`}
        checked={!!rowData[column.field as keyof PermissionProps]}
        onChange={() => togglePermission(permissions.indexOf(rowData), column.field as keyof PermissionProps)}
        className={`
        ${!!rowData[column.field as keyof PermissionProps] ?
          "" : "border-gray-400 rounded-md border-2 transition-all"}`}
      />
    );
  };
  const update = async () => {
    const status = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/rolePermission`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(permissions)
      }
    );
    if(status.status === 200) {
      toast.success('updated successfully');
      closeEvent();
    }
    else {
      toast.error('update failed');
    }
  }
  
  return (
    <div>
      <ToastContainer />
      <div
        id="projectModal"
        className="active fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 modal bg-white rounded-xl shadow-lg w-[800px] max-h-[90vh] overflow-y-auto z-50"
      >
        <div id="newProjectForm" className="relative">
          {/* <!-- Header --> */}
          <div className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit role {role}
              </h2>
              <button
                type="button"
                onClick={closeEvent}
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
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Manage Permissions</h2>
          
          <DataTable value={permissions} className="p-datatable-sm">
            <Column field="name" header="Module" sortable></Column>
            <Column field="create" header="Create" body={renderCheckbox}></Column>
            <Column field="manage" header="Manage" body={renderCheckbox}></Column>
            <Column field="edit" header="Edit" body={renderCheckbox}></Column>
            <Column field="delete" header="Delete" body={renderCheckbox}></Column>
          </DataTable>
          
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={update}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
            >
              Update
            </button>
            <button
              onClick={closeEvent}
              className="px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors"
            >
             Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default EditPermissionModal;
