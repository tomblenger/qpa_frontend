'use client';

import React, {useState, useEffect, type ChangeEvent} from 'react';
import {toast, ToastContainer} from "react-toastify";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  Settings,
  Users,
  CreditCard,
  Bell,
  Shield,
  Puzzle,
  Info,
  Check
} from 'lucide-react';
import EditPermissionModal from '@/components/modal/editPermissionModal';

export interface PermissionProps {
  name: string;
  create: boolean;
  manage: boolean;
  edit: boolean;
  delete: boolean;
}
interface Pay {
  id: any;
  last4: string;
  exp: string;
  primary: boolean;
}

type FormData = {
  //general setting
  company_title: string;
  website: string;
  business_start: string;
  business_end: string;
  timezone: string;
  date_format: string;
  default_currency: string;
  language: string;
  region: string;
  //notification
  email_notification: boolean;
  app_notification: boolean;
  project_update: boolean;
  task_assignment: boolean;
  team_update: boolean;
  desktop_notification: boolean;
  sound_notification: boolean;

  //session state
  active_session_title: string;
  active_session_detail: string;
  active_session_state: string;

  //security
  enable_2FA: boolean;

  //connected apps & integration
  connect_slack: boolean;
  connect_google_calender: boolean;
  
  //
  role: {
    systemAccess: string[];
    vaManager: string[];
    vaMember: string[];
    client: string[];
  }
  //biiling
  base_currency: string;
  accounting: boolean;
  round_billing: boolean;
  enable_carryover: boolean;
  report_currency: string;
  financial_year: string;
  invoice_prefix: string;
  next_invoice_number: number;
  default_payment_term: string;
  invoice_notes_template: string;
  financial_notifications: boolean;
  send_invoice_notifications: boolean;
  send_payment_reminders: boolean;
  notify_package_hours:boolean;
  pay_cycle: string;
  payment_date: string;
  va_base_rate: number;
  obm_base_rate: number;
  overtime_rate_multi: string;
  default_tax_rate: string;
  auto_calculate_tax_deduction: boolean;
  health_insurance: boolean;
  pension_contribution: boolean;
  income_tax: boolean;
  bonus_setting: string;
  approval_threshold: number;
  default_category: string;
  payment_methods: Pay [];
}
const SettingsContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('general');
  
  const [userPermissions, setUserPermissions] = useState<PermissionProps[]>([
    { name: "Projects", create: true, manage: true, edit: true, delete: true },
    { name: "Tasks", create: true, manage: true, edit: true, delete: true },
    { name: "Timesheet", create: true, manage: true, edit: false, delete: true },
  ]);
  const [roleType, setRoleType] = useState('administrator');
  //password
  const [currentPassword, setCurrentPassword] = useState('1111');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createModal, setCreateModal] = useState(false);
  
  const [paymentMethods, setPaymentMethods] = useState<Pay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: null, last4: '', exp: '' });
  
  const tabs: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'team', label: 'Roles & Permissions', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Puzzle }
  ];

  useEffect(() => {
    getSettings();
  }, [])
  
  useEffect(() => {
    setFormData({...formData, payment_methods: paymentMethods})
  }, [paymentMethods]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const tab = params.get('tab') || 'general';
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const [formData, setFormData] = useState<FormData>({
    //general setting
    company_title: "Crextio",
    website: "https://crextio.com",
    business_start: "09:00",
    business_end: "17:00",
    timezone: 'GMT (UTC +0:00)',
    date_format: 'DD/MM/YYYY',
    default_currency: 'USD ($)',
    language: 'English (US)',
    region: 'United Kingdom',
    //notification
    email_notification: true,
    app_notification: true,
    project_update: true,
    task_assignment: false,
    team_update: false,
    desktop_notification: false,
    sound_notification: false,
    //security
    enable_2FA: true,

    //session
    active_session_title: 'MacBook Pro-Chrome',
    active_session_detail: 'London, UK · Last active: 2 mins ago',
    active_session_state: 'current',

    //connected apps & integration
    connect_slack: false,
    connect_google_calender: true,
    
    //roles and permissions
    role: {
      systemAccess: [
        'Manage Team',
        'System Settings',
        'Billing Access'
      ],
      vaManager: [
        'Manage Projects',
        'Assign Tasks',
        'View Reports',
        'Manage VA Team',
        'Client Communication',
        'Time Management'
      ],
      vaMember: [
        'View Tasks',
        'Track Time',
        'Update Status',
        'Submit Reports',
        'Access Resources'
      ],
      client: [
        'View Progress',
        'Add Comments',
        'Access Files'
      ]
    },
    base_currency: '',
    accounting: false,
    round_billing: false,
    enable_carryover: false,
    report_currency: '',
    financial_year: '',
    invoice_prefix: '',
    next_invoice_number: 0,
    default_payment_term: '',
    invoice_notes_template: '',
    financial_notifications: false,
    send_invoice_notifications: false,
    send_payment_reminders: false,
    notify_package_hours:false,
    pay_cycle: '',
    payment_date: '',
    va_base_rate: 0,
    obm_base_rate: 0,
    overtime_rate_multi: '',
    default_tax_rate: '',
    auto_calculate_tax_deduction: false,
    health_insurance: false,
    pension_contribution: false,
    income_tax: false,
    bonus_setting: '',
    approval_threshold: 0,
    default_category: '',
    payment_methods: [
      { id: 1, last4: '4242', exp: '12/24', primary: true },
    ]
  });

  const getSettings=  async () => {
    const status = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/getSettings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          }
        }
    );
    if(status.status === 200) {
      const responseData = await status.json();
      const { formData } = responseData;
      setFormData(formData);
      setPaymentMethods(formData.payment_methods);
    }
    else {
      console.log('Error in getSettings');
      setPaymentMethods(formData.payment_methods);
    }
  };

  const updateSettings = async () => {
    const status = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/updateSettings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(formData)
        }
    );
    if(status.status === 200) toast.success('Saved successfully');
    else {
      toast.error('Save failed')
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    const status = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/register/updatepassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
          body: JSON.stringify(formData)
        }
    );

    if(status.status === 200) {
      toast.success('update password successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    }
    else {
      toast.error('error updating password');
      setLoading(false);
    }
  };

  const handleInputChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const openModal = (method: any = null) => {
    if (method) {
      setModalData(method);
    } else {
      setModalData({ id: null, last4: '', exp: '' });
    }
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSave = () => {
    if (modalData.id) {
      setPaymentMethods((prev) =>
        prev.map((method) =>
          method.id === modalData.id ? { ...method, last4: modalData.last4, exp: modalData.exp } : method
        )
      );
    } else {
      const newMethod = { id: Date.now(), last4: modalData.last4, exp: modalData.exp, primary: false };
      setPaymentMethods([...paymentMethods, newMethod]);
    }
    closeModal();
  };
  
  const setPrimary = (id: any) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({ ...method, primary: method.id === id }))
    );
  };
  
  const openEditPermissionModal = (type: string) => {
    setCreateModal(true);
    setRoleType(type);
  };
  const closeEditPermissionModal = () => {
    setCreateModal(false);
  };
  
  const TeamSection = () => (
    <div className={activeTab === 'team' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Roles & Permissions
        </h2>
        <div className="mt-6">
          <div className="space-y-4">
            {/* Administrator Role */}
            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">Administrator</div>
                  <div className="text-sm text-gray-500">
                    Full system access and management control
                  </div>
                </div>
                <button
                  onClick={() => {
                      openEditPermissionModal('Administrator')
                  }}
                  className="text-sm text-brand-500 font-medium"
                >
                  Edit Role
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {formData.role.systemAccess.map(
                  (permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        {permission}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* VA Manager Role */}
            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">VA Manager</div>
                  <div className="text-sm text-gray-500">
                    Team and project management capabilities
                  </div>
                </div>
                <button
                  onClick={() => {
                    openEditPermissionModal('VA Manager')
                  }}
                  className="text-sm text-brand-500 font-medium"
                >
                  Edit Role
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {formData.role.vaManager.map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VA Member Role */}
            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">VA Member</div>
                  <div className="text-sm text-gray-500">
                    Task execution and time tracking
                  </div>
                </div>
                <button
                  onClick={() => {
                    openEditPermissionModal('VA Member')
                  }}
                  className="text-sm text-brand-500 font-medium"
                >
                  Edit Role
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {formData.role.vaMember.map((permission) => (
                  <div key={permission} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Role */}
            <div className="p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-gray-900">Client</div>
                  <div className="text-sm text-gray-500">
                    Limited access to project viewing and updates
                  </div>
                </div>
                <button
                  onClick={() => {
                    openEditPermissionModal('Client')
                  }}
                  className="text-sm text-brand-500 font-medium"
                >
                  Edit Role
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {formData.role.client.map(
                  (permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        {permission}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {createModal ? (
        <>
          <EditPermissionModal
              closeEvent={closeEditPermissionModal}
              permission={userPermissions}
              role={roleType}
          />
          <button
              id="modalOverlay"
              className="active modal-overlay fixed w-screen h-screen inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={closeEditPermissionModal}
          />
        </>
    ) : (
        <></>
    )}
    </div>
  );

  const BillingSection = () => (
    <div className={activeTab === 'billing' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Financial Settings
        </h2>

        {/* Payment Methods Configuration */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Payment Methods</h3>
            <button
              onClick={() => openModal()}
              className="px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors"
            >
              Add New Method
            </button>
          </div>
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <svg className="w-8 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">•••• {method.last4}</div>
                  <div className="text-sm text-gray-500">Expires {method.exp}</div>
                </div>
                {method.primary && (
                  <span className="px-2 py-1 text-xs font-medium bg-brand-50 text-brand-700 rounded-full ml-auto mr-2">
                Primary
              </span>
                )}
                <button
                  onClick={() => {
                    openModal(method);
                  }}
                  className="text-sm text-brand-500 font-medium"
                >
                  Edit
                </button>
                {!method.primary && (
                  <button
                    onClick={() => setPrimary(method.id)}
                    className="ml-2 text-sm text-blue-500 font-medium"
                  >
                    Set Primary
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-medium text-gray-900 mb-4">{modalData.id ? 'Edit Payment Method' : 'Add Payment Method'}</h2>
                <input
                  type="text"
                  placeholder="Last 4 digits"
                  value={modalData.last4}
                  onChange={(e) => setModalData({ ...modalData, last4: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Expiration (MM/YY)"
                  value={modalData.exp}
                  onChange={(e) => setModalData({ ...modalData, exp: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={closeModal} className="px-3 py-1.5 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Finance Preferences */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            Finance Preferences
          </h3>
          <div className="space-y-6">
            {/* Currency Settings */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Base Currency
              </div>
              <select
                name="base_currency"
                value={formData.base_currency}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
              >
                <option>GBP (£)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GHS (₵)</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Used for reporting and internal calculations
              </p>
            </div>

            {/* Accounting Preferences */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-3">
                Accounting Settings
              </div>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="accounting"
                    checked={formData.accounting}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Round up minutes to nearest hour for billing
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="round_billing"
                    checked={formData.round_billing}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Enable carryover hours for monthly packages
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="enable_carryover"
                    checked={formData.enable_carryover}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Auto-generate monthly invoices
                  </span>
                </label>
              </div>
            </div>

            {/* Financial Reports */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-3">
                Report Preferences
              </div>
              <div className="space-y-3">
                <div>
                  <div className="block text-sm text-gray-600 mb-1">
                    Default Report Currency
                  </div>
                  <select
                    name="report_currency"
                    value={formData.report_currency}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                  >
                    <option>Use client&apos;s currency</option>
                    <option>Use base currency</option>
                  </select>
                </div>
                <div>
                  <div className="block text-sm text-gray-600 mb-1">
                    Financial Year Start
                  </div>
                  <select
                    name="financial_year"
                    value={formData.financial_year}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                  >
                    <option>January</option>
                    <option>April</option>
                    <option>July</option>
                    <option>October</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Settings */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            Invoice Configuration
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Prefix
                </div>
                <input
                  type="text"
                  name="invoice_prefix"
                  value={formData.invoice_prefix}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                />
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Next Invoice Number
                </div>
                <input
                  type="number"
                  name="next_invoice_number"
                  value={formData.next_invoice_number}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                  placeholder="e.g., 1001"
                />
              </div>
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Default Payment Terms
              </div>
              <select
                name="default_payment_term"
                value={formData.default_payment_term}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                <option>Due on receipt</option>
                <option>Net 15</option>
                <option>Net 30</option>
                <option>Net 60</option>
              </select>
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Notes Template
              </div>
              <textarea
                name="invoice_notes_template"
                value={formData.invoice_notes_template}
                onChange={handleInputChange}
                placeholder="Enter default invoice notes"
                className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            Financial Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="financial_notifications"
                checked={formData.financial_notifications}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-600">
                Send invoice notifications
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="send_invoice_notifications"
                checked={formData.send_invoice_notifications}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-600">
                Send payment reminders
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="send_payment_reminders"
                checked={formData.send_payment_reminders}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-600">
                Notify on low package hours
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notify_package_hours"
                checked={formData.notify_package_hours}
                onChange={handleCheckboxChange}
                className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-600">
                Monthly financial reports
              </span>
            </label>
          </div>
        </div>

        {/* Payroll Settings */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            Payroll Configuration
          </h3>
          <div className="space-y-6">
            {/* Pay Period Settings */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-3">
                Pay Period
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="block text-sm text-gray-600 mb-1">
                    Pay Cycle
                  </div>
                  <select
                    name="pay_cycle"
                    value={formData.pay_cycle}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                    <option>Monthly</option>
                    <option>Bi-weekly</option>
                    <option>Weekly</option>
                  </select>
                </div>
                <div>
                  <div className="block text-sm text-gray-600 mb-1">
                    Payment Date
                  </div>
                  <select
                    name="payment_date"
                    value={formData.payment_date}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                    <option>Last day of month</option>
                    <option>1st of month</option>
                    <option>15th of month</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rate Configuration */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-3">
                Default Rate Settings
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      VA Base Rate
                    </div>
                    <input
                      type="number"
                      name="va_base_rate"
                      value={formData.va_base_rate}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                      placeholder="Enter hourly rate"
                    />
                  </div>
                  <div>
                    <div className="block text-sm text-gray-600 mb-1">
                      OBM Base Rate
                    </div>
                    <input
                      type="number"
                      name="obm_base_rate"
                      value={formData.obm_base_rate}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                      placeholder="Enter hourly rate"
                    />
                  </div>
                </div>
                <div>
                  <div className="block text-sm text-gray-600 mb-1">
                    Overtime Rate Multiplier
                  </div>
                  <select
                    name="overtime_rate_multi"
                    value={formData.overtime_rate_multi}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300">
                    <option>1.5x</option>
                    <option>2x</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tax Settings */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-3">
                Tax Configuration
              </div>
              <div className="space-y-3">
                <div>
                  <div className="block text-sm text-gray-600 mb-1">
                    Default Tax Rate (%)
                  </div>
                  <input
                    type="number"
                    name="default_tax_rate"
                    value={formData.default_tax_rate}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                    placeholder="Enter tax rate"
                  />
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="auto_calculate_tax_deduction"
                    checked={formData.auto_calculate_tax_deduction}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Auto-calculate tax deductions
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Deductions */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-4">
            Benefits & Deductions
          </h3>
          <div className="space-y-4">
            {/* Standard Deductions */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-3">
                Standard Deductions
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: 'Health Insurance',
                    id: 'health_insurance'
                  },
                  {
                    title: 'Pension Contribution',
                    id: 'pension_contribution'
                  },
                  {
                    title: 'Income Tax',
                    id: 'income_tax'
                  }].map(
                  (item) => (
                    <label key={item.title} className="flex items-center">
                      <input
                        type="checkbox"
                        name={item.id}
                        checked={!!formData[item.id as keyof FormData]}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-gray-600">{item.title}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Bonus Configuration */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-3">
                Bonus Settings
              </div>
              <div className="space-y-3">
                <div>
                  <div className="block text-sm text-gray-600 mb-1">
                    Performance Bonus Calculation
                  </div>
                  <select
                    name="bonus_setting"
                    value={formData.bonus_setting}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                  >
                    <option>Percentage of base salary</option>
                    <option>Fixed amount</option>
                    <option>Custom formula</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Management */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Expense Management</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Approval Threshold
                </div>
                <input
                  type="number"
                  name="approval_threshold"
                  value={formData.approval_threshold}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Default Category
                </div>
                <select
                  name="default_category"
                  value={formData.default_category}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                >
                  <option>Office Supplies</option>
                  <option>Travel</option>
                  <option>Software</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Expense Categories
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">
                  Configure expense categories in the finance section
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className={activeTab === 'notifications' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Notification Preferences
        </h2>

        {/* Email Notifications */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Email Notifications</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="email_notification"
                checked={formData.email_notification}
                onChange={handleCheckboxChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500">
                &nbsp;
              </div>
            </label>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Project Updates',
                description: 'Get notified when projects are updated',
                id: 'project_update',
              },
              {
                title: 'Task Assignments',
                description: "Get notified when you're assigned to a task",
                id: 'task_assignments',
              },
              {
                title: 'Team Updates',
                description: 'Get notified about team member changes',
                id: 'team_update',
              }
            ].map((notification) => (
              <label
                key={notification.title}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {notification.description}
                  </div>
                </div>
                <input
                  type="checkbox"
                  name={notification.id}
                  checked={!!formData[notification.id as keyof FormData]}
                  onChange={handleCheckboxChange}
                  disabled={!formData.email_notification}
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-gray-900">In-App Notifications</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name={'app_notification'}
                checked={formData.app_notification}
                onChange={handleCheckboxChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500">
                &nbsp;
              </div>
            </label>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Desktop Notifications',
                description: 'Show desktop push notifications',
                id: 'desktop_notifications',
              },
              {
                title: 'Sound Notifications',
                description: 'Play a sound for important notifications',
                id: 'sound_notifications',
              }
            ].map((notification) => (
              <label
                key={notification.title}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {notification.description}
                  </div>
                </div>
                <input
                  type="checkbox"
                  name={notification.id}
                  checked={!!formData[notification.id as keyof FormData]}
                  onChange={handleCheckboxChange}
                  disabled={!formData.app_notification}
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className={activeTab === 'security' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Security Settings
        </h2>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-medium text-gray-900">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              onClick={() => {
                setFormData({...formData, enable_2FA: !formData.enable_2FA})
              }}
              className="px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors"
            >
              {formData.enable_2FA ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Two-factor authentication is currently {formData.enable_2FA ? 'enabled' : 'disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Password Settings */}
        <form onSubmit={updatePassword}>
          <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </div>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                  required
                />
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                  required
                />
              </div>
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </div>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </form>

        {/* Active Sessions */}
        <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Active Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                 {/*<Desktop className="w-5 h-5 text-gray-400" />*/}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {formData.active_session_title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formData.active_session_detail}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                  {formData.active_session_state}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const IntegrationsSection = () => (
    <div className={activeTab === 'integrations' ? '' : 'hidden'}>
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Connected Apps & Integrations
        </h2>

        {/* Connected Apps */}
        <div className="grid grid-cols-2 gap-4">
          {/* Slack Integration */}
          <div className="p-6 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4A154B] flex items-center justify-center">
                  <Puzzle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Slack</div>
                  <div className="text-xs text-gray-500">Communication</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setFormData({...formData, connect_slack: !formData.connect_slack});
                }}
                className={
                  formData.connect_slack ?
                  "px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors"
                  : "px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700"
                }
              >
                {formData.connect_slack ? 'Connected' : 'Disconnected'}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Send notifications and updates to your Slack workspace.
            </div>
          </div>

          {/* Google Calendar */}
          <div className="p-6 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                  <Puzzle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Google Calendar
                  </div>
                  <div className="text-xs text-gray-500">Calendar</div>
                </div>
              </div>
              <button
                  onClick={() => {
                    setFormData({...formData, connect_google_calender: !formData.connect_google_calender});
                  }}
                  className={
                    formData.connect_google_calender ?
                        "px-3 py-1.5 text-sm font-medium text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors"
                        : "px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700"
                  }
                >
                {formData.connect_google_calender ? 'Connected' : 'Disconnected'}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Sync your calendar events and meetings.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="py-20 pl-64 pr-6 w-screen min-h-screen overflow-x-hidden">
      <ToastContainer />
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account and application preferences
            </p>
          </div>
          <button
            onClick={() => updateSettings()}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
          >
            Save Changes
          </button>
        </div>

        {/* Settings Navigation */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 divide-x divide-gray-100">
            {/* Settings Sidebar */}
            <div className="col-span-3 p-6 space-y-6">
              <nav className="space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  // biome-ignore lint/a11y/useButtonType: <explanation>
                  <button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === id
                        ? 'text-brand-500 bg-brand-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="col-span-9 p-6">
              <div className="space-y-6">
                {/* General Settings */}
                <div className={activeTab === 'general' ? '' : 'hidden'}>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    General Settings
                  </h2>
                  <div className="space-y-4">
                    {/* Company Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </div>
                        <input
                          // type="text"
                          name="company_title"
                          value={formData.company_title}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <div className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </div>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Business Hours
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="time"
                          name="business_start"
                          value={formData.business_start}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        />
                        <input
                          type="time"
                          name="business_end"
                          value={formData.business_end}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Timezone */}
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </div>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                      >
                        <option>GMT (UTC +0:00)</option>
                        <option>GMT+1 (West Africa Time)</option>
                      </select>
                    </div>

                    {/* Date Format */}
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Date Format
                      </div>
                      <select
                        name="date_format"
                        value={formData.date_format}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                      >
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>

                    {/* Currency */}
                    <div>
                      <div className="block text-sm font-medium text-gray-700 mb-1">
                        Default Currency
                      </div>
                      <select
                        name="default_currency"
                        value={formData.default_currency}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                      >
                        <option>USD ($)</option>
                        <option>GBP (£)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>

                    {/* Language and Region */}
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Language and Region
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="block text-sm font-medium text-gray-700 mb-1">
                            Language
                          </div>
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                          >
                            <option>English (US)</option>
                            <option>English (UK)</option>
                          </select>
                        </div>
                        <div>
                          <div className="block text-sm font-medium text-gray-700 mb-1">
                            Region
                          </div>
                          <select
                            name="region"
                            value={formData.region}
                            onChange={handleInputChange}
                            className="w-full h-10 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white transition-colors hover:border-gray-300"
                          >
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>Ghana</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <TeamSection />
                <BillingSection />
                <NotificationsSection />
                <SecuritySection />
                <IntegrationsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsContent;
