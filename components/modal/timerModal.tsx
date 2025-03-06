'use client';

import React, { useState, useEffect } from "react";
import { AlarmClock, Pause, Play, Square } from 'lucide-react';

import {toast, ToastContainer} from 'react-toastify';
export interface TimerModalProps {
  closeEvent: () => void;
  id: number;
}

const TimerModal: React.FC<TimerModalProps> = ({
  closeEvent,
  id
}) => {
  
  const [time, setTime] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeDuration, setTimeDuration] = useState<number>(0);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);
  
  useEffect(() => {
    const getTimerTrack = async () => {
      const token = localStorage.getItem('access_token');
      const role = localStorage.getItem('role');
      const status = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/${role}/getTimerTrack`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: id
          })
        }
      );
      if(status.status === 200) {
        const responseData = await status.json();
        const { isRunning, timeDuration } = responseData;
        console.log(isRunning);
        if(responseData) {
          setIsRunning(isRunning);
          setTimeDuration(timeDuration);
        }
        else {
          setIsRunning(false);
          setTimeDuration(0);
        }
      }
      else {
        console.log('Error in getSettings');
      }
    }
    getTimerTrack();
  }, []);
  
  const formatTime = (seconds: number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return { hrs, mins, secs };
  };
  
  const { hrs, mins, secs } = formatTime(time);
  
  const handleCloseModal = () => {
    closeEvent();
  };
  
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
                Time Tacker
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
        
        {/* <!-- Body --> */}
        <div className="flex flex-col items-center justify-center bg-white p-10 shadow-lg rounded-b-md rounded-bl-md">
          <div className="flex justify-center space-x-10 mb-6 text-4xl font-bold">
            <div className="text-center bg-gray-300 p-6 rounded-md w-24">{hrs}</div>
            <div className="text-center bg-gray-300 p-6 rounded-md w-24">{mins}</div>
            <div className="text-center bg-gray-300 p-6 rounded-md w-24">{secs}</div>
          </div>
          <div className="flex justify-center space-x-28 mb-6">
            <button onClick={() => setIsRunning(true)} className="rounded-full text-white">
              <Play size={25} color="green" />
            </button>
            <button onClick={() => { setIsRunning(false); setTime(0); }} className="rounded-full">
              <Square size={25} />
            </button>
            <button onClick={() => setIsRunning(false)} className="rounded-full">
              <Pause size={25} />
            </button>
          </div>
          <textarea
            className="w-full border p-3 rounded mb-6"
            placeholder="Please enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className="w-1/2 bg-green-600 text-white py-3 rounded flex items-center justify-center mb-10">
            <AlarmClock size={25} className="mr-2" /> View timesheet
          </button>
          <div className="w-full flex items-center justify-end">
            <button className="w-1/4 bg-gray-300 py-3 rounded flex justify-center items-center" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TimerModal;