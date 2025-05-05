import { useEffect, useState } from "react";

export default function DisplayTime() {
  const [during, setDuring] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDuring((prev) => {
        const newTime = prev + 1;
        convertToTime(newTime); // mettre à jour h:m:s
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval); // nettoyage
  }, []);

  function convertToTime(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    setHour(hours);
    setMinute(minutes);
    setSecond(seconds);
  }

  return (
    <div className='border '>
      <form action='' onSubmit={handleSubmit}>
        <label htmlFor=''>Duree</label>
        <input
          type='number'
          value={during}
          onChange={(e) => setDuring(e.target.value)}
          className='input'
        />
        <button type='submit' className='btn btn-primary'>
          Add
        </button>
      </form>

      <p>DisplayTime</p>
      <p>{during}</p>
      <p>
        {hour}H{minute}'{second}
      </p>
    </div>
  );
}
