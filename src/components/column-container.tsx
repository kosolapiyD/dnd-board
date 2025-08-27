import { TrashIcon } from '../assets/icons/trash-icon';
import type { Column } from '../types';

interface ColumnContainerProps {
  column: Column;
}

export const ColumnContainer = ({ column }: ColumnContainerProps) => {
  return (
    <div className='bg-column-background w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col'>
      {/* column title */}
      <div className='bg-main-background text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-column-background border-4 flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <div className='flex justify-center items-center bg-column-background px-2 py-1 text-sm rounded-full'>
            0
          </div>
          {column.title}
        </div>
        <button className='stroke-gray-500 hover:stroke-white hover:bg-column-background rounded px-1 py-2'>
          <TrashIcon />
        </button>
      </div>

      {/* column task container */}
      <div className='flex-1 flex-grow'>CONTENT</div>
      {/* column footer */}
      <div className='p-2 border-t border-t-gray-200'>FOOTER</div>
    </div>
  );
};
