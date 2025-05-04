import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { ITask } from "../Homepage";

type DetailTaskProps = {
  task: ITask;
  deleteTask: (taskId: string) => void;
  validateTask: (taskId: string) => void;
};

export default function DetailTask({ task, deleteTask, validateTask }: DetailTaskProps) {
  const handleValidTask = (taskId: string) => {
    validateTask(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <li className={`list-row flex ${task.isDone ? "bg-gray-400" : ""}`}>
      <div className='flex-1'>
        <h2 className='font-bolds text-xl mb-4'>{task.title}</h2>
        <p className='list-col-wrap text-xs'>{task.describ}</p>
      </div>
      <div className='flex flex-col justify-between gap-y-2'>
        <button className='btn btn-success' onClick={() => handleValidTask(task.id)}>
          <span>Valider</span>
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>

        <button className='btn btn-error' onClick={() => handleDeleteTask(task.id)}>
          <span className=''>Supprimer</span>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </li>
  );
}
