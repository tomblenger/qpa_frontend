import {TypeTask, TypeUser} from '@/lib/types';
import {type ChangeEvent, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Toast from '../toast';
import {Dialog} from "primereact/dialog";

interface AddMemberModalProps {
  closeModal: (params: boolean) => void;
  visible: boolean;
  id: number;
  editable: boolean;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ closeModal, visible, editable, id }) => {
  
  const token = localStorage.getItem('access_token');
  const { handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const   roles: string[] = ['Please select user\'s role', 'Admin', 'Manager', 'Member', 'Client'];
  const [passwordError, setPasswordError] = useState(false);
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState<TypeUser>({
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    password: '',
    phone: '',
    position: '',
    role: 0,
    dob: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: ''
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    if(!editable) {
      const token = localStorage.getItem('access_token');
      const fetchUsers = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/team/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        setFormData(data);
      };
      fetchUsers();
    }
  }, []);
  
  const resetPassword = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/admin/team/resetpassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({id: 2})
      }
    );
    const data = await response.json();
    if(data.status === 200) {
      const {message} = data;
      toast.success(message);
    }
  }
  
  const onSubmit = async () => {
    if (formData.password !== confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      formData.full_name = `${formData.first_name} ${formData.last_name}`;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/register/user`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ ...formData })
          }
        );
        console.log(res);

        console.log(formData);
        toast.success('User Created Successfully.');
        closeModal(false);
        setFormData({
          first_name: '',
          last_name: '',
          full_name: '',
          email: '',
          password: '',
          phone: '',
          position: '',
          role: '',
          dob: '',
          address: '',
          city: '',
          state: '',
          country: '',
          zip_code: ''
        });
      } catch (error) {
        Toast('error', String(error));
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let index;
    const { name, value } = e.target;
    console.log(name, value);
    if(name === "role") {
      setFormData((prev) => ({
        ...prev,
        role: roles.findIndex(role => role == value)
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: '50rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      modal
      onHide={() => closeModal(false)}
    >
      <ToastContainer />
      <div className="fixed inset-0 z-50 active">
        {/* <!-- Improved Backdrop with more blur --> */}
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={() => closeModal(false)}
        />

        {/* <!-- Modal Content --> */}
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[50rem] max-h-[90vh] overflow-auto">
          <div className="bg-white rounded-2xl shadow-xl">
            {/* <!-- Enhanced Header with gradient background --> */}
            <div className="p-6 sticky top-0 bg-white z-10 border-b border-gray-100">
              <div className="flex items-center justify-between">
                {editable ?
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Add New Team Member
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Fill in the information below to create a new team member
                    </p>
                  </div>
                  :
                  <h2 className="text-xl font-semibold text-gray-900">
                    User Profile
                  </h2>
                }
                <button
                  onClick={() => closeModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
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

            {/* <!-- Modal Body with sections --> */}
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* <!-- Personal Information Section --> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-100">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <!-- First Name --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        value={String(formData.first_name)}
                        onChange={handleInputChange}
                        disabled={!editable}
                      />
                    </div>

                    {/* <!-- Last Name --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        value={String(formData.last_name)}
                        onChange={handleInputChange}
                        disabled={!editable}
                      />
                    </div>

                    {/* <!-- Email --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        value={String(formData.email)}
                        onChange={handleInputChange}
                        disabled={!editable}
                      />
                    </div>

                    {/* <!-- Phone --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        value={String(formData.phone)}
                        onChange={handleInputChange}
                        disabled={!editable}
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Account Settings Section --> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-100">
                    Account Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* <!-- Password --> */}
                    {editable?
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        minLength={8}
                        value={String(formData.password)}
                        onChange={handleInputChange}
                        disabled={!editable}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum 8 characters
                      </p>
                    </div>
                    : <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <br />
                      <button
                        onClick={resetPassword}
                        className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition-colors shadow-lg shadow-brand-500/25"
                      >
                        Reset Password
                      </button>
                    </div>}

                    {/* <!-- Confirm Password --> */}
                    {editable?
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={!editable}
                      />
                      {passwordError ? (
                        <p className="text-xs text-red-500 mt-1">
                          Minimum 8 characters
                        </p>
                      ) : (
                        <></>
                      )}
                    </div> : <></>
                    }

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="position"
                        placeholder="e.g. Product Manager, Frontend Developer"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        value={String(formData.position)}
                        onChange={handleInputChange}
                        disabled={!editable}
                      />
                    </div>

                    {/* <!-- Role with enhanced select --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="role"
                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow appearance-none bg-white"
                          required
                          value={roles[Number(formData.role)]}
                          onChange={handleInputChange}
                        >
                          {roles.map((role: string) => <option value={role}>{role}</option>)}
                        </select>
                        <svg
                          className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none"
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
                    </div>

                    {/* <!-- Date of Birth --> */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                        required
                        value={formData.dob ? String(formData.dob) : ""}
                        onChange={handleInputChange}
                        disabled={!editable}
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Address Section --> */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-100">
                    Address Information
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        rows={2}
                        className="w-full px-3 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow resize-none"
                        required
                        value={formData.address ? String(formData.address) : ""}
                        onChange={handleInputChange}
                        disabled={!editable}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* <!-- City --> */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                          required
                          value={formData.city ? String(formData.city) : ""}
                          onChange={handleInputChange}
                          disabled={!editable}
                        />
                      </div>

                      {/* <!-- State --> */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                          required
                          value={formData.state ? String(formData.state) : ""}
                          onChange={handleInputChange}
                          disabled={!editable}
                        />
                      </div>

                      {/* <!-- Country --> */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                          required
                          value={formData.country ? String(formData.country) : ""}
                          onChange={handleInputChange}
                          disabled={!editable}
                        />
                      </div>

                      {/* <!-- Zip Code --> */}
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="zip_code"
                          className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow"
                          required
                          value={formData.zip_code ? String(formData.zip_code) : ""}
                          onChange={handleInputChange}
                          disabled={!editable}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-6 border-t border-gray-100 sticky bottom-0 bg-white backdrop-blur-xl">
                  {editable?
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => closeModal(false)}
                      className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition-colors shadow-lg shadow-brand-500/25"
                    >
                      Add Member
                    </button>
                  </div>
                  : <></>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddMemberModal;
