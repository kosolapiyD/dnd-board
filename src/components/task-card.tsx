import { useState } from 'react';
import { TrashIcon } from '../assets/icons/trash-icon';
import type { Id, Task } from '../types';

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTaskContent: (id: Id, content: string) => void;
}

export const TaskCard = ({
  task,
  deleteTask,
  updateTaskContent,
}: TaskCardProps) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (editMode) {
    return (
      <div className='bg-main-background p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative'>
        <textarea
          className='h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none'
          value={task.content}
          autoFocus
          placeholder='Task content here'
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              // e.preventDefault();
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTaskContent(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      className='bg-main-background p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task'
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className='my-auto h-[90%] w-full overflow-auto overflow-x-hidden whitespace-pre-wrap'>
        {' '}
        {task.content}
      </p>
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
