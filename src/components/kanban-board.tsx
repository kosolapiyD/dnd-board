import { useState } from 'react';
import { PlusIcon } from '../assets/icons/plus-icon';
import type { Column } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { ColumnContainer } from './column-container';

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  console.log('columns :>> ', columns);

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  return (
    <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
      <div className='m-auto flex gap-2'>
        <div className='flex gap-4'>
          {columns.map((column) => (
            <ColumnContainer key={column.id} column={column} />
          ))}
        </div>
        <button
          className='h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-main-background border-2 border-column-background p-4 ring-rose-500 hover:ring-2 flex gap-2'
          onClick={() => handleAddColumn()}
        >
          <PlusIcon /> Add Column
        </button>
      </div>
    </div>
  );
};
