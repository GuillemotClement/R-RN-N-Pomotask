import { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import FormTask from "./tasks/FormTask";
import DetailTask from "./tasks/DetailTask";

export interface ITask {
  id: string;
  title: string;
  describ?: string;
  createdat: string;
  updatedAt: string;
  isDone: boolean;
  userId: string;
}

export default function Homepage() {
  const [listTask, setListTask] = useState<ITask[]>([]);

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const tokenJWT = localStorage.getItem("token") ?? "";

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fullURL = `http://localhost:8080/tasks`;
        const response = await fetch(fullURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: tokenJWT,
          },
        });

        if (!response.ok) {
          throw new Error("Echec requete");
        }

        const { tasks } = await response.json();
        setListTask(tasks); // on viens stocker dans le state
      } catch (err) {
        console.error(err);
      }
    };

    fetchTask(); // on lance la fonction pour recperer les donnees.
  }, [tokenJWT]);
  console.log(listTask);
  return (
    <div className='my-12'>
      {isAuthenticated ? <FormTask /> : ""}

      <ul>
        {listTask.map((task) => (
          <DetailTask key={task.id} task={task} />
        ))}
      </ul>
      {/* {listTask ? <ListTask listTask={listTask} /> : <p>Pas encore de taches disponible</p>} */}
    </div>
  );
}
