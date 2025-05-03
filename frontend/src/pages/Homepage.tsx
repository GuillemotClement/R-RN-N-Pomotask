import { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import FormTask from "./tasks/FormTask";

// interface ITask {
//   id: string;
//   title: string;
//   describ: string;
// }

export default function Homepage() {
  const [listTask, setListTask] = useState({});

  // const user = useUserStore((state) => state.user);
  // const userId = user?.id;
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
  }, []); // on ajoute la dependance sur userId
  console.log(listTask);
  return (
    <div className=''>
      <h1>Homepage</h1>
      {isAuthenticated ? <FormTask /> : ""}
      {/* <ul>
        {listTask.map((task) => (
          <li>task.title</li>
        ))}
      </ul> */}
    </div>
  );
}
