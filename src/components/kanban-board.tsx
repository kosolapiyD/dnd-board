import { useMemo, useState } from 'react';
import { PlusIcon } from '../assets/icons/plus-icon';
import type { Column } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { ColumnContainer } from './column-container';
import { DndContext, DragOverlay, type DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

export const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const addColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      // todo -> refactor the col title
      title: `Column ${columns.length + 1}`,
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    setColumns((prevColumns) =>
      prevColumns.filter((col) => col.id !== columnId)
    );
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };

  return (
    <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]'>
      <DndContext onDragStart={onDragStart}>
        <div className='m-auto flex gap-2'>
          <div className='flex gap-4'>
            <SortableContext items={columnsIds}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className='h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-main-background border-2 border-column-background p-4 ring-rose-500 hover:ring-2 flex gap-2'
            onClick={() => addColumn()}
          >
            <PlusIcon /> Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn ? (
              <ColumnContainer
                key={activeColumn.id}
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
