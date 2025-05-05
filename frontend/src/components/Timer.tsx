import { faPauseCircle, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [period, setPeriode] = useState(0);

  const [duration, setDuration] = useState(0); // saisis user de temps souhaiter
  const [second, setSecond] = useState(0); // contient la duree
  const [isRunning, setIsRunning] = useState(false); // lance le compteur

  const notify = () => toast("Periode terminer");

  const handlePerdiode = (formData: any) => {
    const duringTimer = formData.get("duration");
    const convertToMinute = duringTimer * 60;
    setDuration(convertToMinute);
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setSecond((prev) => {
          // Si on atteint la durée maximale, on arrête le timer
          if (prev + 1 >= duration) {
            clearInterval(interval);
            setIsRunning(false); // Stoppe le timer
            notify();
            return duration; // Fixe la durée maximale
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, duration]);

  const handleStartTimer = () => {
    console.log("start timer");
    setIsRunning(true);
  };

  const handleStopTimer = () => {
    console.log("pause timer");
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    console.log("reset timer");
    setIsRunning(false);
    setSecond(0);
  };

  return (
    <div className='border w-96'>
      <ToastContainer />
      <h2 className='text-center font-bold uppercase'>Timer</h2>
      <p>Duree du timer: {duration}</p>
      <p>Temps ecoule :{second}</p>
      <div className='flex justify-center gap-x-2'>
        <button className='btn btn-primary' onClick={handleStartTimer}>
          <FontAwesomeIcon icon={faPlayCircle} />
        </button>
        <button className='btn btn-warning' onClick={handleStopTimer}>
          <FontAwesomeIcon icon={faPauseCircle} />
        </button>
        <button className='btn btn-error' onClick={handleResetTimer}>
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>

      <form action={handlePerdiode}>
        <input type='number' placeholder='Duree en minutes' name='duration' />
        <button>Soumettre</button>
      </form>
      {/* <button onClick={}>Start</button> */}
    </div>
  );
}
