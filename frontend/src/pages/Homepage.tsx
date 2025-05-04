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

export interface INewTask {
  title: string;
  describ?: string;
}

export default function Homepage() {
  const baseURL = "http://localhost:8080";

  const [listTask, setListTask] = useState<ITask[]>([]);

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const tokenJWT = localStorage.getItem("token") ?? "";

  async function handleNewTask(task: INewTask) {
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenJWT,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const newTask: ITask = await response.json();

      setListTask((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Erreur lors de la création : ", err);
    }
  }

  function deleteTask(data: string) {
    console.log(data);
  }

  async function validateTask(taskId: string) {
    const data = {
      taskId,
    };
    try {
      const response = await fetch(`${baseURL}/tasks/status/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokenJWT,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const updatedTask = await response.json(); //récupération de la réponse backend
      console.log("Le retour du update");
      console.log(updatedTask);
      // mise à jour de l'état local
      setListTask((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }
          return task;
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

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
    <div className='my-12 container mx-auto'>
      {isAuthenticated ? <FormTask handleNewTask={handleNewTask} /> : ""}

      <ul className='list bg-base-100 rounded-box shadow-md'>
        <li className='p-4 pb-2 text-xs opacity-60 tracking-wide'>Mes dernière tâches en cours</li>
        {listTask.map((task) => (
          <DetailTask
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            validateTask={validateTask}
          />
        ))}
      </ul>
    </div>
  );
}
