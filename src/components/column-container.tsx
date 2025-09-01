import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { TrashIcon } from '../assets/icons/trash-icon';
import type { Column, Id, Task } from '../types';
import { PlusIcon } from '../assets/icons/plus-icon';
import { TaskCard } from './task-card';

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (columnId: Id) => void;
  updateColumn: (columnId: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTaskContent: (id: Id, content: string) => void;
}

export const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTaskContent,
}: ColumnContainerProps) => {
  const [editMode, setEditMode] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        className='bg-column-background opacity-40 border-2 border-rose-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }

  return (
    <div
      className='bg-column-background w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'
      ref={setNodeRef}
      style={style}
    >
      {/* column title */}
      <div
        className='bg-main-background text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-column-background border-4 flex items-center justify-between'
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
      >
        <div className='flex gap-2 items-center'>
          <div className='flex justify-center items-center bg-column-background px-2 py-1 text-sm rounded-full'>
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className='bg-black focus:border-rose-500 border rounded outline-none px-2'
              autoFocus
              type='text'
              value={column.title}
              onChange={({ target }) => updateColumn(column.id, target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditMode(false);
                }
              }}
            />
          )}
        </div>
        <button
          className='stroke-gray-500 hover:stroke-white hover:bg-column-background rounded px-1 py-2 cursor-pointer'
          onClick={() => deleteColumn(column.id)}
        >
          <TrashIcon />
        </button>
      </div>

      {/* column task container */}
      <div className='flex flex-1 flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto'>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTaskContent={updateTaskContent}
          />
        ))}
      </div>
      {/* column footer */}
      <button
        className='flex gap-2 items-center border-column-background border-2 rounded-md p-4 border-x-column-background hover:bg-main-background hover:text-rose-500 active:bg-black cursor-pointer'
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon /> Add Task
      </button>
    </div>
  );
};
