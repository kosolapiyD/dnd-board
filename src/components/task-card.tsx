import { useState } from 'react';
import { TrashIcon } from '../assets/icons/trash-icon';
import type { Id, Task } from '../types';

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
}

export const TaskCard = ({ task, deleteTask }: TaskCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  return (
    <div
      className='bg-main-background p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative'
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {task.content}
      {mouseIsOver && (
        <button
          className='stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-column-background p-2 rounded opacity-60 hover:opacity-100 cursor-pointer'
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};
