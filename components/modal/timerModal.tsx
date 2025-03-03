import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

interface TimerModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, closeModal }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  useEffect(() => {
    if (isOpen) {
      setTime(0);
      setIsRunning(false);
      setIsPaused(false);
    }
  }, [isOpen]);
  
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      const newTimer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setTimer(newTimer);
    }
  };
  
  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer);
      setIsPaused(true);
    }
  };
  
  const stopTimer = () => {
    if (timer) clearInterval(timer);
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  };
  
  const handleCloseModal = () => {
    stopTimer();
    closeModal();
  };
  
  const roundTime = (timeInSeconds: number): number => {
    return Math.ceil(timeInSeconds / 900) * 900; // Round to nearest 15 minutes
  };
  
  return (
    <Dialog
      visible={isOpen}
      onHide={handleCloseModal}
      header="⏳ Task Timer"
      className="w-96 p-10 fixed sticky-xl-bottom"
    >
      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center py-4">
        <span className="text-3xl font-semibold text-gray-800">
          {new Date(time * 1000).toISOString().substr(11, 8)}
        </span>
      </div>
      
      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <Button
          label={isRunning && !isPaused ? "Pause" : "Start"}
          icon={isRunning && !isPaused ? "pi pi-pause" : "pi pi-play"}
          className={`${
            isRunning && !isPaused ? "p-button-warning" : "p-button-success"
          }`}
          onClick={isRunning && !isPaused ? pauseTimer : startTimer}
        />
        <Button
          label="Stop"
          icon="pi pi-stop"
          className="p-button-danger"
          onClick={stopTimer}
        />
      </div>
      
      {/* Rounded Time Display */}
      {isRunning && !isPaused && (
        <div className="mt-4 text-center text-gray-600 text-sm">
          Rounded Time:{" "}
          <span className="font-semibold">
            {new Date(roundTime(time) * 1000).toISOString().substr(11, 8)}
          </span>
        </div>
      )}
    </Dialog>
  );
};

export default TimerModal;
