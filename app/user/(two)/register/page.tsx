'use client'

import React, { useState, type ChangeEvent, useEffect, useRef } from 'react';
import { ChevronRight, CheckCircle, Clock, Users } from 'lucide-react';
import {toast, ToastContainer} from "react-toastify"; // Add this import
import Link from "next/link";
import Image from 'next/image';
import timezones from 'timezones-list';
import { clientMockData } from "@/mockData/clientData";
import type {TypeUser} from "@/lib/types";
import {userMockData} from "@/mockData/userData";
import {useRouter} from "next/navigation";

export type FormData = {
  // Section 1: Client Information
  firstName: string;
  lastName: string;
  fullName: string;
  businessName: string;
  personalAddress: string;
  businessAddress: string;
  position: string;
  email: string;
  phone: string;
  preferredContact: string;
  timezone: string;
  
  // Section 2: Services & Goals
  services: string[];
  deadlines: string;
  hoursNeeded: string;
  otherServices: string;
  
  // Section 3: Tools and Access
  currentTools: string;
  needAccess: string;
  toolsSpecify: string;
  fileSharing: string;
  
  // Section 4: Communication Preferences
  updateFrequency: string;
  updateMethod: string;
  stakeholders: string;
  
  // Section 5: Additional Information
  workflows: string;
  priorities: string;
  specialInstructions: string;
  startDate: string;
  
  // Section 6: Billing & Agreements
  billingMethod: string;
  billingCycle: string;
  billingEmail: string;
  
  // Section 7: Emergency Contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  
  // Agreement
  signature: string;
  date: string;
  messagingApp: string;
};


const OnboardingFlow = () => {
  
  
  const [showForm, setShowForm] = useState(false);
  const [selectType, setSelectType] = useState<boolean>(false);
  const [auth2FA, setAuth2FA] = useState<boolean>(true);
  const router = useRouter();
  // switch type
  const switchType = (type: string) => {
    if(type === "user") setSelectType(true);
    else setSelectType(false);
    setShowForm(true);
  }
  
  useEffect(() => {
    const getSettings = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/settings`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify(formData)
        }
      );
      const data = await response.json();
      const { message } = data;
      if(response.status === 200) {
        setAuth2FA(data.auth2FA);
      } else {
        setAuth2FA(true);
      }
    }
    getSettings();
  }, []);
  
  // welcome page
  const WelcomePage = () => (
    <div className="min-h-screen flex">
      <ToastContainer />
      
      {/* Left: Image Side */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0">
          <div className="relative h-full">
            <Image
              src="/images/loginImg.png"
              alt="image"
              layout="fill" // Fills the container
              objectFit="cover" // Ensures the image covers the container without distortion
              objectPosition="center" // Centers the image
              className="rounded-br-[80px]"
            />
            
            {/* Base Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#84b894]/70 via-[#84b894]/50 to-[#a8cbb4]/30 rounded-br-[80px]" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-br-[80px]">
              <div className="absolute bottom-12 left-12 right-12">
                <h2 className="text-4xl font-semibold mb-4 text-white">
                  Welcome to QPA Virtual Assistants
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  Let us help streamline your business operations with our
                  comprehensive virtual assistant services.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2.5 rounded-full">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-white">Quick 5-minute setup</span>
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2.5 rounded-full">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="text-white">Dedicated support team</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right: Welcome Content */}
      <div className="w-full md:w-1/2 bg-white px-8 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto py-12">
          <div className="w-64 mb-12">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt="Logo"
              className="w-full"
            />
          </div>
          
          <div className="space-y-8 mb-12">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Start Your Journey
              </h1>
              <p className="text-gray-600">
                Complete our simple onboarding process to get started with your
                personal virtual assistant.
              </p>
            </div>
            
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#84b894]/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#84b894]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Personalized Support
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get matched with the perfect virtual assistant for your
                    needs
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#84b894]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#84b894]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Efficient Onboarding
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quick and easy setup process, start delegating tasks today
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#84b894]/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-[#84b894]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    Satisfaction Guaranteed
                  </h3>
                  <p className="text-sm text-gray-600">
                    100% satisfaction guarantee with our virtual assistant
                    services
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => switchType("client")}
              className="w-full bg-[#84b894] text-white py-3 rounded-lg hover:bg-[#6a9377] transition-colors flex items-center justify-center gap-2"
            > Client</button>
            <button
              onClick={ () => switchType("user")}
              className="w-full bg-[#84b894] text-white py-3 rounded-lg hover:bg-[#6a9377] transition-colors flex items-center justify-center gap-2"
            > User</button>
            <p className="text-center text-sm text-gray-500">
              Estimated time: 5-10 minutes <Link href="/user/login" className="text-gray-900 hover: underline"> back to login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  // client login page
  const OnClientForm = () => {
    
    const totalSteps = 7;
    
    const [currentStep, setCurrentStep] = useState(1);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [formData, setFormData] = useState<FormData>({
      // Section 1: Client Information
      firstName: "",
      lastName: "",
      fullName: '',
      businessName: '',
      personalAddress: '',
      businessAddress: '',
      position: '',
      email: '',
      phone: '',
      preferredContact: '',
      timezone: '',
      
      // Section 2: Services & Goals
      services: [],
      deadlines: '',
      hoursNeeded: '',
      otherServices: '',
      
      // Section 3: Tools and Access
      currentTools: '',
      needAccess: 'no',
      toolsSpecify: '',
      fileSharing: '',
      
      // Section 4: Communication Preferences
      updateFrequency: '',
      updateMethod: '',
      stakeholders: '',
      
      // Section 5: Additional Information
      workflows: '',
      priorities: '',
      specialInstructions: '',
      startDate: '',
      
      // Section 6: Billing & Agreements
      billingMethod: '',
      billingCycle: '',
      billingEmail: '',
      
      // Section 7: Emergency Contact
      emergencyName: '',
      emergencyPhone: '',
      emergencyRelation: '',
      
      // Agreement
      signature: '',
      date: '',
      messagingApp: ''
    });
    const formContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setFormData((prev) => ({
        ...prev,
        timezone: userTimezone
      }));
      if (formContainerRef.current) {
        const handleScroll = () => {
          setScrollPosition(formContainerRef.current?.scrollTop || 0);
        };
        
        const container = formContainerRef.current;
        container.addEventListener('scroll', handleScroll);
        
        return () => {
          container.removeEventListener('scroll', handleScroll);
        };
      }
    }, []);
    
    useEffect(() => {
      if (formContainerRef.current) {
        formContainerRef.current.scrollTop = scrollPosition;
      }
    }, [scrollPosition]);
    
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
        services: checked
          ? [...prev.services, name]
          : prev.services.filter((service) => service !== name)
      }));
    };
    
    const handleInputBlur = (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      e.target.focus();
    };
    
    const handleSubmitClient = () => {
      const fetchRegister = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/register/client`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientMockData),
            // body: JSON.stringify(formData)
          }
        );
        const data = await response.json();
        const { message } = data;
        if(response.status === 200) {
          toast.success(message);
          if (auth2FA) router.push("/user/opt");
        } else {
          toast.error(message);
        }
      }
      fetchRegister();
    }
    
    return (
      <div className="min-h-screen flex">
        <ToastContainer />
        {/* Left: Image Side - Remove fixed positioning */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="sticky top-0 h-screen">
            <div className="relative h-full">
              <Image
                src="/images/loginImg.png"
                alt="Furniture"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-br-[80px]"
              />
              
              {/* Base Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#84b894]/70 via-[#84b894]/50 to-[#a8cbb4]/30 rounded-br-[80px]" />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-br-[80px]">
                <div className="absolute bottom-12 left-12 right-12">
                  <h2 className="text-4xl font-semibold mb-4 text-white">
                    Getting Started
                  </h2>
                  <p className="text-white/90 mb-8 text-lg">
                    Tell us about yourself and your needs so we can provide the
                    best possible service.
                  </p>
                  
                  <div className="w-full bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-white transition-all duration-500 rounded-full"
                        style={{
                          width: `${(currentStep / totalSteps) * 100}%`
                        }}
                      />
                    </div>
                    <div className="mt-2 text-white/90 text-sm text-center">
                      Step {currentStep} of {totalSteps}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right: Form Side */}
        <div
          // ref={formContainerRef}
          className="w-full md:w-1/2 min-h-screen bg-white"
        >
          <div className="px-8">
            <div className="w-full max-w-md mx-auto py-12">
              <div className="w-64 mb-12">
                <Image
                  src="/images/logo.svg"
                  width={100}
                  height={100}
                  alt="Logo"
                  className="w-full"
                />
              </div>
              {currentStep === 1 &&
                  <div className="space-y-6">
                      <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                              Client Information
                          </h2>
                          <p className="text-gray-600 mb-8">
                              Please provide your basic contact information.
                          </p>
                      </div>

                      <div className="space-y-4">
                          <div>
                              <div className="block text-gray-700 mb-2">Full Name*</div>
                              <input
                                  type="text"
                                  name="fullName"
                                  value={String(formData.fullName)}
                                  onChange={handleInputChange}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                                  required
                              />
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2">Business Name</div>
                              <input
                                  type="text"
                                  name="businessName"
                                  value={formData.businessName}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Enter business name (if applicable)"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>
                        
                        {/* Add both address fields */}
                          <div>
                              <div className="block text-gray-700 mb-2">
                                  Personal Address*
                              </div>
                              <input
                                  type="text"
                                  name="personalAddress"
                                  value={formData.personalAddress}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Enter your personal address"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                                  required
                              />
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2">Business Address</div>
                              <input
                                  type="text"
                                  name="businessAddress"
                                  value={formData.businessAddress}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Enter business address (if applicable)"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2">Position/Title*</div>
                              <input
                                  type="text"
                                  name="position"
                                  value={formData.position}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Enter your position or title"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2">Email Address*</div>
                              <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Enter your email address"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2">Phone Number*</div>
                              <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Enter your phone number"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2">
                                  Preferred Contact Method
                              </div>
                              <select
                                  name="preferredContact"
                                  value={formData.preferredContact}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              >
                                  <option value="">Select method</option>
                                  <option value="Email">Email</option>
                                  <option value="Phone">Phone</option>
                                  <option value="Messaging">Messaging App</option>
                              </select>
                          </div>
                        
                        {formData.preferredContact === 'Messaging' && (
                          <div>
                            <div className="block text-gray-700 mb-2">
                              Specify Messaging App
                            </div>
                            <input
                              type="text"
                              name="messagingApp"
                              value={formData.messagingApp}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              placeholder="Enter messaging app name"
                              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                            />
                          </div>
                        )}

                          <div>
                              <div className="block text-gray-700 mb-2">Timezone*</div>
                              <select
                                  name="timezone"
                                  value={formData.timezone}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              >
                                {timezones.map((tz) => (
                                  <option key={tz.tzCode} value={tz.tzCode}>
                                    {tz.label}
                                  </option>
                                ))}
                              </select>
                          </div>
                      </div>
                  </div>
              } {currentStep === 2 &&
                  <div className="space-y-6">
                      <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                              Services & Goals
                          </h2>
                          <p className="text-gray-600 mb-8">
                              Select the services you need and tell us about your
                              requirements.
                          </p>
                      </div>
                      <div className="space-y-4">
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Which services do you require? (Check all that apply)
                              </div>
                              <div className="space-y-2">
                                {[
                                  'Virtual Assistant (Personal / Lifestyle)',
                                  'Virtual Assistant (Business Admin)',
                                  'Social Media Management',
                                  'Online Business Management',
                                  'Content Creation (Videography / Photography)',
                                  'Brand Kit (Logo etc)',
                                  'Legal VA',
                                  'Website Creation / Management',
                                  'Event Planning / Coordination'
                                ].map((service) => (
                                  <div key={service} className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      name={service}
                                      checked={formData.services.includes(service)}
                                      onChange={handleCheckboxChange}
                                      className="rounded text-[#84b894] focus:ring-[#84b894]"
                                    />
                                    <span className="text-gray-700">{service}</span>
                                  </div>
                                ))}
                              </div>
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-bold">
                                  Other (please specify)
                              </div>
                              <input
                                  type="text"
                                  name="otherServices"
                                  value={formData.otherServices}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Specify other services needed"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Do you have any upcoming deadlines or priorities we should be
                                  aware of?
                              </div>
                              <textarea
                                  name="deadlines"
                                  value={formData.deadlines}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Enter any upcoming deadlines or priorities"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                                  rows={3}
                              />
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  How many hours per week or month do you anticipate needing
                                  support?
                              </div>
                              <input
                                  type="text"
                                  name="hoursNeeded"
                                  value={formData.hoursNeeded}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="Enter estimated hours needed"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>
                      </div>
                  </div>
              } {currentStep === 3 &&
                  <div className="space-y-6">
                      <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                              Tools and Access
                          </h2>
                          <p className="text-gray-600 mb-8">
                              Tell us about the tools and platforms you use.
                          </p>
                      </div>
                      <div className="space-y-4">
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  What tools/software/platforms do you currently use? (e.g.,
                                  Google Workspace, Slack, Asana, Canva, etc.)
                              </div>
                              <input
                                  type="text"
                                  name="currentTools"
                                  value={formData.currentTools}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="List tools you currently use"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Do we need access to any specific tools or accounts?
                              </div>
                              <select
                                  name="needAccess"
                                  value={formData.needAccess}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              >
                                  <option value="no">No</option>
                                  <option value="yes">Yes</option>
                              </select>
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  What is your preferred file-sharing method?
                              </div>
                              <select
                                  name="fileSharing"
                                  value={formData.fileSharing}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              >
                                  <option value="">Select option</option>
                                  <option value="Google Drive">Google Drive</option>
                                  <option value="Dropbox">Dropbox</option>
                                  <option value="OneDrive">OneDrive</option>
                                  <option value="Other">Other</option>
                              </select>
                          </div>
                        {formData.needAccess === 'yes' && (
                          <div>
                            <div className="block text-gray-700 mb-2">
                              Specify Required Access
                            </div>
                            <textarea
                              name="toolsSpecify"
                              value={formData.toolsSpecify}
                              onChange={handleInputChange}
                              onBlur={handleInputBlur}
                              placeholder="Specify which tools need access"
                              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              rows={3}
                            />
                          </div>
                        )}
                      </div>
                  </div>
              }
              {currentStep === 4 &&
                  <div className="space-y-6">
                      <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                              Communication Preferences
                          </h2>
                          <p className="text-gray-600 mb-8">
                              Let us know how you prefer to communicate.
                          </p>
                      </div>
                      <div className="space-y-4">
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  How often would you like updates or check-ins?
                              </div>
                              <select
                                  name="updateFrequency"
                                  value={formData.updateFrequency}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              >
                                  <option value="">Select update frequency</option>
                                  <option value="Daily">Daily</option>
                                  <option value="Weekly">Weekly</option>
                                  <option value="Other">Other</option>
                              </select>
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  What is your preferred method for receiving updates?
                              </div>
                              <select
                                  name="updateMethod"
                                  value={formData.updateMethod}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              >
                                  <option value="">Select method</option>
                                  <option value="Email">Email</option>
                                  <option value="Video Call">Video Call</option>
                                  <option value="Messaging App">Messaging App</option>
                                  <option value="Project Management Tool">
                                      Project Management Tool
                                  </option>
                              </select>
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Who are the key stakeholders / team members we should keep in
                                  the loop?
                              </div>
                              <textarea
                                  name="stakeholders"
                                  value={formData.stakeholders}
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  placeholder="List key team members to keep informed"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                                  rows={3}
                              />
                          </div>
                      </div>
                  </div>
              }
              {currentStep === 5 &&
                  <div className="space-y-6">
                      <div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Are there any particular tasks you would like us to
                                  prioritize?
                              </div>
                              <textarea
                                  name="priorities"
                                  value={formData.priorities}
                                  onChange={handleInputChange}
                                  placeholder="List tasks to prioritize"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                                  rows={3}
                              />
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  What is your onboarding timeline or ideal start date?
                              </div>
                              <input
                                  type="date"
                                  name="startDate"
                                  value={formData.startDate}
                                  onChange={handleInputChange}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>
                      </div>
                  </div>
                
              }
              {currentStep === 6 &&
                  <div className="space-y-6">
                      <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                              Billing & Agreements
                          </h2>
                          <p className="text-gray-600 mb-8">
                              Set up your billing preferences.
                          </p>
                      </div>
                      <div className="space-y-4">
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Preferred Billing Method
                              </div>
                              <select
                                  name="billingMethod"
                                  value={formData.billingMethod}
                                  onChange={handleInputChange}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              >
                                  <option value="">Select method</option>
                                  <option value="Credit/Debit Card">Credit/Debit Card</option>
                                  <option value="Bank Transfer">Bank Transfer</option>
                              </select>
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Billing Cycle Preference
                              </div>
                              <select
                                  name="billingCycle"
                                  value={formData.billingCycle}
                                  onChange={handleInputChange}
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              >
                                  <option value="">Select cycle</option>
                                  <option value="Weekly">Weekly</option>
                                  <option value="Monthly">Monthly</option>
                              </select>
                          </div>
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Invoice Email Address (if different from above)
                              </div>
                              <input
                                  type="email"
                                  name="billingEmail"
                                  value={formData.billingEmail}
                                  onChange={handleInputChange}
                                  placeholder="Enter billing email if different"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>
                      </div>
                  </div>
              } {currentStep === 7 &&
                  <div className="space-y-6">
                      <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                              Emergency Contact (Optional)
                          </h2>
                          <p className="text-gray-600 mb-8">
                              Please provide emergency contact information and review the
                              agreement.
                          </p>
                      </div>

                      <div className="space-y-4">
                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Emergency Contact Name
                              </div>
                              <input
                                  type="text"
                                  name="emergencyName"
                                  value={formData.emergencyName}
                                  onChange={handleInputChange}
                                  placeholder="Enter emergency contact name"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Emergency Contact Phone
                              </div>
                              <input
                                  type="tel"
                                  name="emergencyPhone"
                                  value={formData.emergencyPhone}
                                  onChange={handleInputChange}
                                  placeholder="Enter emergency contact phone"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>

                          <div>
                              <div className="block text-gray-700 mb-2 font-semibold">
                                  Relationship to You/Your Business
                              </div>
                              <input
                                  type="text"
                                  name="emergencyRelation"
                                  value={formData.emergencyRelation}
                                  onChange={handleInputChange}
                                  placeholder="Enter relationship"
                                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                              />
                          </div>

                          <div className="pt-6 border-t border-gray-200">
                              <h3 className="font-medium text-gray-900 mb-4">Agreement</h3>
                              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                  <p className="text-sm text-gray-600">
                                      By submitting this form, you agree to the terms and
                                      conditions of working with QPA Virtual Assistants and
                                      confirm that all provided information is accurate to the
                                      best of your knowledge.
                                  </p>
                              </div>

                              <div className="space-y-4">
                                  <div>
                                      <div className="block text-gray-700 mb-2 font-semibold">
                                          Digital Signature (Type Full Name)*
                                      </div>
                                      <input
                                          type="text"
                                          name="signature"
                                          value={formData.signature}
                                          onChange={handleInputChange}
                                          placeholder="Type your full name as signature"
                                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                                          required
                                      />
                                  </div>

                                  <div>
                                      <div className="block text-gray-700 mb-2 font-semibold">
                                          Date*
                                      </div>
                                      <input
                                          type="date"
                                          name="date"
                                          value={formData.date}
                                          onChange={handleInputChange}
                                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                                          required
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              }
              <div className="flex justify-between mt-8 mb-8">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  onClick={() =>
                    currentStep === 1
                      ? setShowForm(false)
                      : setCurrentStep((prev) => prev - 1)
                  }
                  className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {currentStep === 1 ? 'Back' : 'Previous'}
                </button>
                
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  onClick={() => {
                    if (currentStep === totalSteps) {
                      console.log('Form client:', formData);
                      handleSubmitClient();
                    } else {
                      setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
                    }
                  }}
                  className="px-6 py-3 bg-[#84b894] text-white rounded-lg hover:bg-[#6a9377] transition-colors flex items-center gap-2"
                >
                  {currentStep === totalSteps ? 'Submit' : 'Next'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // user register page
  const OnUserForm = () => {
    
    /*
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
                Toast('success', 'User Created Successfully.');
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
    */
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
      role: '',
      dob: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zip_code: ''
    });
    
    const handleInputChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmitUser = () => {
      const fetchRegister = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/register/user`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userMockData),
            // body: JSON.stringify(formData)
          }
        );
        const data = await response.json();
        const { message } = data;
        if(response.status === 200) {
          toast.success(message);
          if(auth2FA) router.push("user/opt");
        } else {
          toast.error(message);
        }
      }
      fetchRegister();
    }
    
    return (
      <form className="min-h-screen flex" onSubmit={() => {}}>
        <ToastContainer />
        <div className="hidden md:block md:w-1/2 relative">
          <div className="sticky top-0 h-screen">
            <div className="relative h-full">
              <Image
                src="/images/loginImg.png"
                alt="Furniture"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-br-[80px]"
              />
              
              {/* Base Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#84b894]/70 via-[#84b894]/50 to-[#a8cbb4]/30 rounded-br-[80px]" />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-br-[80px]">
                <div className="absolute bottom-12 left-12 right-12">
                  <h2 className="text-4xl font-semibold mb-4 text-white">
                    Getting Started
                  </h2>
                  <p className="text-white/90 mb-8 text-lg">
                    Tell us about yourself and your needs so we can provide the
                    best possible service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 min-h-screen bg-white">
          <div className="px-8">
            <div className="w-full max-w-md mx-auto py-12">
              <div className="w-64 mb-12">
                <Image
                  src="/images/logo.svg"
                  width={100}
                  height={100}
                  alt="Logo"
                  className="w-full"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    User Information
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Please provide your basic contact information.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="block text-gray-700 mb-2">Full Name*</div>
                    <input
                      type="text"
                      name="first_name"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.first_name)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Last Name*</div>
                    <input
                      type="text"
                      name="last_name"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.last_name)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Email*</div>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.email)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Phone Number*</div>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.phone)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Password*</div>
                    <input
                      type="password"
                      name="password"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      minLength={8}
                      value={String(formData.password)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Confirm Password*</div>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordError ? (
                      <p className="text-xs text-red-500 mt-1">
                        Minimum 8 characters
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Position*</div>
                    <input
                      type="text"
                      name="position"
                      placeholder="e.g. Product Manager, Frontend Developer"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.position)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Role*</div>
                    <select
                      name="role"
                      // className="w-full h-11 px-3 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow appearance-none bg-white"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.role)}
                      onChange={handleInputChange}
                    >
                      <option value="">Please select</option>
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                      <option value="manager">Manager</option>
                      <option value="client">Client</option>
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
                  <div>
                    <div className="block text-gray-700 mb-2">Date of Birth*</div>
                    <input
                      type="date"
                      name="dob"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.dob)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Address*</div>
                    <textarea
                      name="address"
                      rows={2}
                      // className="w-full px-3 py-2 rounded-xl border-2 border-gray-100 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-shadow resize-none"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.address)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">City*</div>
                    <input
                      type="text"
                      name="city"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.city)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">State*</div>
                    <input
                      type="text"
                      name="state"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.state)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Country*</div>
                    <input
                      type="text"
                      name="country"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.country)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="block text-gray-700 mb-2">Zip code*</div>
                    <input
                      type="text"
                      name="zip_code"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84b894]/20"
                      required
                      value={String(formData.zip_code)}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8 mb-8">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                > Back </button>
                
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  onClick={() => {
                      handleSubmitUser();
                      console.log(formData);
                  }}
                  className="px-6 py-3 bg-[#84b894] text-white rounded-lg hover:bg-[#6a9377] transition-colors flex items-center gap-2"
                >
                  Submit
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
  
  
  return (
    showForm ? (selectType ? <OnUserForm /> : <OnClientForm />) : <WelcomePage />
  )
};

export default OnboardingFlow;
