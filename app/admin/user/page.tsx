'use client'
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Avatar } from "primereact/avatar";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { FileUpload } from 'primereact/fileupload';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import UserClientModal from "@/components/modal/userClientModal";

type FormData = {
  id: number;
  avatar: string;
  country: string;
  role: string;
  status: string;
  verified: boolean | undefined;
  created_at: string;
  updated_at: string;
  fullName: string;
  businessName: string;
  personalAddress: string;
  businessAddress: string;
  position: string;
  email: string;
  phone: string;
  preferredContact: string;
  timezone: string;
  services: string[];
  deadlines: string;
  hoursNeeded: string;
  otherServices: string;
  currentTools: string;
  needAccess: boolean | undefined;
  toolsSpecify: string;
  fileSharing: string;
  updateFrequency: string;
  updateMethod: string;
  stakeholders: string;
  workflows: string;
  priorities: string;
  specialInstructions: string;
  startDate: Date | null;
  billingMethod: string;
  billingCycle: string;
  billingEmail: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  signature: string;
  date: Date | null;
  messagingApp: string;
}

interface User {
  id: number;
  full_name: string;
  avatar: string;
  email: string;
  country: string;
  phone: string;
  role: string;
  status: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export default function usersDemo() {
  let emptyUser: User = {
    id: 0,
    full_name: "",
    avatar: "",
    email: "",
    country: "",
    phone: "",
    role: "",
    status: "",
    verified: false,
    created_at: "",
    updated_at: "",
  };
  const basicData = {
    contactMethods: ["Email", "Phone", "WhatsApp"],
    serviceOptions: ["Marketing Strategy", "SEO Optimization", "Social Media Management"],
    timezones: ["America/Chicago", "America/New York", "America/Los Angeles"],
    role: ["admin", "client", "manager", "VA"],
    status: ["Active", "InActive", "Suspended"],
  };
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      full_name: "John Doe",
      avatar: "upload/1.jpg",
      email: "johndoe@example.com",
      country: "United States",
      phone: "+1 555-1234",
      role: "Admin",
      status: "Active",
      verified: true,
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-02-20T08:15:00Z",
    },
    {
      id: 2,
      full_name: "Jane Smith",
      avatar: "upload/1.jpg",
      email: "janesmith@example.com",
      country: "United States",
      phone: "+1 555-5678",
      role: "Editor",
      status: "Inactive",
      verified: false,
      created_at: "2023-12-10T14:00:00Z",
      updated_at: "2024-01-25T09:45:00Z",
    },
    {
      id: 3,
      full_name: "Michael Johnson",
      avatar: "upload/1.jpg",
      email: "michaeljohnson@example.com",
      country: "United States",
      phone: "+44 7700 900123",
      role: "User",
      status: "Active",
      verified: true,
      created_at: "2024-02-05T12:45:00Z",
      updated_at: "2024-02-28T16:30:00Z",
    },
    {
      id: 4,
      full_name: "Emily Davis",
      avatar: "upload/1.jpg",
      email: "emilydavis@example.com",
      country: "United States",
      phone: "+61 400 123 456",
      role: "Moderator",
      status: "Suspended",
      verified: false,
      created_at: "2023-11-20T18:20:00Z",
      updated_at: "2024-01-10T14:10:00Z",
    },
    {
      id: 5,
      full_name: "David Wilson",
      avatar: "upload/1.jpg",
      email: "davidwilson@example.com",
      country: "United States",
      phone: "+49 170 9876543",
      role: "User",
      status: "Active",
      verified: true,
      created_at: "2024-01-02T09:10:00Z",
      updated_at: "2024-02-18T11:50:00Z",
    },
  ]);
  const [userDialog, setUserDialog] = useState<boolean>(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState<boolean>(false);
  const [user, setUser] = useState<User>(emptyUser);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [image, setImage] = useState(user.avatar || null);
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    avatar: "",
    country: "",
    role: "",
    status: "",
    verified: false,
    created_at: "",
    updated_at: "",
    fullName: "",
    businessName: "",
    personalAddress: "",
    businessAddress: "",
    position: "",
    email: "",
    phone: "",
    preferredContact: "",
    timezone: "",
    services: [],
    deadlines: "",
    hoursNeeded: "",
    otherServices: "",
    currentTools: "",
    needAccess: false,
    toolsSpecify: "",
    fileSharing: "",
    updateFrequency: "",
    updateMethod: "",
    stakeholders: "",
    workflows: "",
    priorities: "",
    specialInstructions: "",
    startDate: null,
    billingMethod: "",
    billingCycle: "",
    billingEmail: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    signature: "",
    date: null,
    messagingApp: "",
  });
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<User[]>>(null);
  
  useEffect(() => {
    // userservice.getusers().then((data) => {
      // setUsers(data)
    // });
  }, []);
  
  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };
  
  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };
  
  const hideDeleteUserDialog = () => {
    setDeleteUsersDialog(false);
  };
  
  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  };
  
  const editUser = (user: User) => {
    setUser({ ...user });
    setUserDialog(true);
  };
  
  const confirmDeleteUser = (user: User) => {
    setUser(user);
    setDeleteUsersDialog(true);
  };
  
  const deleteUser = () => {
    let _users = users.filter((val) => val.id !== user.id);
    
    setUsers(_users);
    setDeleteUsersDialog(false);
    setUser(emptyUser);
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
  };
  
  const exportCSV = () => {
    dt.current?.exportCSV();
  };
  
  const confirmDeleteSelected = () => {
    setDeleteUsersDialog(true);
  };
  
  const deleteSelectedUsers = () => {
    let _users = users.filter((val) => !selectedUsers.includes(val));
    
    setUsers(_users);
    setDeleteUsersDialog(false);
    setSelectedUsers([]);
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'users Deleted', life: 3000 });
  };
  
  const saveUser = () => {
    setSubmitted(true);
    handleSubmit();
    // <Button label="Submit" className="mt-4 w-full" onClick={} />
    
    if (user.id.toString().trim()) {
      // let _users = [...users];
      // let _user = { ...user };
      //
      // if (user.id) {
      //   const index = findIndexById(user.id);
      //  
      //   _users[index] = _user;
      //   toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'user Updated', life: 3000 });
      // } else {
      //   _user.id = createId();
      //   _user.image = 'user-placeholder.svg';
      //   _users.push(_user);
      //   toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000 });
      // }
      
      // setUsers(_users);
      // setUserDialog(false);
      // setUser(emptyUser);
    }
  };
  
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-20">
        <Button label="New" icon="pi pi-plus" severity="success" className='!bg-green-500 !text-white p-2' onClick={openNew} />
        <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} className="!bg-red-500 !text-white p-2" disabled={!selectedUsers || !selectedUsers.length} />
      </div>
    );
  };
  
  const rightToolbarTemplate = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help !bg-indigo-700 !text-white p-2" onClick={exportCSV} />;
  };
  
  const statusBodyTemplate = (rowData: User) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
  };
  
  const verifiedBodyTemplate = (rowData: User) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
  };
  
  const UserBodyTemplate = (rowData: User) => {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg hover:shadow-md w-80">
        <Avatar
          image={`${process.env.backendURL}${user.avatar}`}
          shape="circle"
          className="w-12 h-12"
        />
        <div>
          <h4 className="text-gray-900 font-semibold">Pamela Tay</h4>
          <p className="text-gray-500 text-sm">pamela@qpas.co.uk</p>
        </div>
      </div>
    );
  }
  
  const countryBodyTemplate = (rowData: User) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData.country}</span>
      </div>
    );
  };
  
  const actionBodyTemplate = (rowData: User) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
      </React.Fragment>
    );
  };
  
  const getSeverity = (user: User) => {
    switch (user.status) {
      case 'Active':
        return 'success';
      
      case 'InActive':
        return 'warning';
      
      case 'Suspended':
        return 'danger';
      
      default:
        return null;
    }
  };
  
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  
  const onFileSelect = (event: { files: File[] }) => {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === "string") {
          setImage(e.target.result); // Set the image preview
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleChange = (e: any, field: keyof FormData) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  
  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };
  
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      {/*<h4 className="m-0">Manage users</h4>*/}
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText  className="pt-4 pb-4 pl-10 !important" type="search" placeholder="Search..." onInput={(e) => {const target = e.target as HTMLInputElement; setGlobalFilter(target.value);}}  />
      </IconField>
    </div>
  );
  
  const userDialogFooter = (
    <div className="flex space-x-10 justify-end">
      <Button label="Cancel" icon="pi pi-times" className='!bg-white p-2' outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className='!bg-green-500 !text-white p-2' onClick={saveUser} />
    </div>
  );
  
  const deleteUserDialogFooter = (
    <div className="flex space-x-10 justify-end">
      <Button label="No" icon="pi pi-times" className='!bg-white p-2' outlined onClick={hideDeleteUserDialog} />
      <Button label="Yes" icon="pi pi-check" className='!bg-green-500 !text-white p-2' severity="danger" onClick={deleteUser} />
    </div>
  );
  
  const deleteUsersDialogFooter = (
    <div className="flex space-x-10 justify-end">
      <Button label="No" icon="pi pi-times" className='!bg-white p-2' outlined onClick={hideDeleteUsersDialog} />
      <Button label="Yes" icon="pi pi-check" className='!bg-green-500 !text-white p-2' severity="danger" onClick={deleteSelectedUsers} />
    </div>
  );
  
  return (
    <div className="flex w-auto justify-start mt-28 ml-64">
    <Toast ref={toast} />
    <div className="card">
      <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
      
      <DataTable
        ref={dt} value={users} selection={selectedUsers}
        onSelectionChange={(e) => {
         if (Array.isArray(e.value)) {
           setSelectedUsers(e.value);
         }
        }}
        dataKey="id" rows={10} rowsPerPageOptions={[5, 10, 25]}
        // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" globalFilter={globalFilter}
        header={header} selectionMode="multiple"
      >
        <Column selectionMode="multiple" exportable={false}></Column>
        <Column field="id" header="Id"></Column>
        <Column field="full_name" header="Full Name" body={UserBodyTemplate}></Column>
        <Column field="country.name" header="Country" body={countryBodyTemplate}></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="role" header="Role"></Column>
        <Column field="status" header="Status" body={statusBodyTemplate}></Column>
        <Column field="updated_at" header="Created At"></Column>
        <Column field="created_at" header="Updated At"></Column>
        <Column field="verified" header="Verified" dataType="boolean" body={verifiedBodyTemplate} />
        <Column body={actionBodyTemplate} exportable={false} ></Column>
      </DataTable>
      <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
    </div>
    <UserClientModal type="user" id={0}/>
    
    
    <Dialog
      visible={userDialog}
      style={{ width: '60rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header="User Details"
      modal
      className="p-fluid bg-white rounded-lg shadow-lg"
      footer={userDialogFooter}
      onHide={hideDialog}
    >
      {/* Image Upload Section */}
      <div className="flex flex-col items-center">
        {image ? (
          <img src={image} alt="Preview" className="w-24 h-24 rounded-full shadow-md mb-3" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-3">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <FileUpload
          mode="basic"
          name="demo[]"
          accept="image/*"
          maxFileSize={1000000}
          customUpload
          onSelect={onFileSelect}
          className="mt-2"
          chooseLabel="Upload Image"
        />
      </div>
      {/*<div className="p-6 max-w-3xl mx-auto rounded-lg shadow-md">*/}
      {/*  <h2 className="text-xl font-bold mb-4">Client Information</h2>*/}
      {/*  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
      {/*    <div>*/}
      {/*      <label>Full Name</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.fullName} onChange={(e) => handleChange(e, "fullName")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Role</label>*/}
      {/*      <Dropdown className="w-full p-2 !important bg-amber-50" value={formData.role} options={basicData.role.map(c => ({ label: c, value: c }))} onChange={(e) => handleChange(e, "role")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Status</label>*/}
      {/*      <Dropdown className="w-full p-2 !important bg-amber-50" value={formData.status} options={basicData.status.map(c => ({ label: c, value: c }))} onChange={(e) => handleChange(e, "status")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Verified</label>*/}
      {/*      <Checkbox inputId="needAccess" className="w-auto p-2 !important bg-amber-300" checked={!!formData.verified} onChange={(e) => setFormData({ ...formData, verified: e.checked })}/>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Business Name</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.businessName} onChange={(e) => handleChange(e, "businessName")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Personal Address</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.personalAddress} onChange={(e) => handleChange(e, "personalAddress")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Business Address</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.businessAddress} onChange={(e) => handleChange(e, "businessAddress")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Email</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.email} onChange={(e) => handleChange(e, "email")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Phone</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.phone} onChange={(e) => handleChange(e, "phone")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Preferred Contact</label>*/}
      {/*      <Dropdown className="w-full p-2 !important bg-amber-50" value={formData.preferredContact} options={basicData.contactMethods.map(c => ({ label: c, value: c }))} onChange={(e) => handleChange(e, "preferredContact")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Timezone</label>*/}
      {/*      <Dropdown className="w-full p-2 !important bg-amber-50" value={formData.timezone} options={basicData.timezones.map(tz => ({ label: tz, value: tz }))} onChange={(e) => handleChange(e, "timezone")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Services</label>*/}
      {/*      <MultiSelect className="w-full p-2 !important bg-amber-50" value={formData.services} options={basicData.serviceOptions.map(s => ({ label: s, value: s }))} onChange={(e) => handleChange(e, "services")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Start Date</label>*/}
      {/*      <Calendar className="w-full p-2 !important bg-amber-50" value={formData.startDate} onChange={(e) => handleChange(e, "startDate")} showIcon />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Billing Email</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.billingEmail} onChange={(e) => handleChange(e, "billingEmail")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Emergency Contact Name</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.emergencyName} onChange={(e) => handleChange(e, "emergencyName")} />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <label>Emergency Phone</label>*/}
      {/*      <InputText className="w-full p-2 !important bg-amber-50" value={formData.emergencyPhone} onChange={(e) => handleChange(e, "emergencyPhone")} />*/}
      {/*    </div>*/}
      {/*    <div className="flex items-center p-2 !important bg-amber-50">*/}
      {/*      <Checkbox inputId="needAccess" checked={!!formData.needAccess} onChange={(e) => setFormData({ ...formData, needAccess: e.checked })} />*/}
      {/*      <label htmlFor="needAccess" className="ml-2">Need Access to Tools?</label>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </Dialog>
    
    <Dialog
      visible={deleteUsersDialog}
      style={{ width: '32rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header="Confirm"
      modal
      footer={deleteUsersDialogFooter}
      onHide={hideDeleteUsersDialog}
    >
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
        {user && <span>Are you sure you want to delete the selected users?</span>}
      </div>
    </Dialog>
  </div>
  );
}
        