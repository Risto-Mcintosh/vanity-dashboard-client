import React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import DragNDrop from './dndUtil';
import { styled } from '@material-ui/core';
import { useKanbanUpdate } from '../../utils/kanban';
import { kanbanDataMap } from '../../types';
import AddNewColumn from './AddNewColumn';

type props = {
  kanbanData: kanbanDataMap;
  children: React.ReactNode;
};

const Container = styled('div')(({ theme }) => ({
  // display: 'grid',
  // gridTemplateColumns: 'repeat(auto-fit, 200px)',
  // gridColumnGap: '25px',
  // gridAutoFlow: 'column',
  overflowX: 'auto',
  display: 'flex',
  alignItems: 'flex-start',
  paddingBottom: theme.spacing(3)
}));

export default function KanbanContainer({ kanbanData, children }: props) {
  const [mutate] = useKanbanUpdate();

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    // TODO add updateColumnOrder and updateOrder functions
    const _DragNDrop = new DragNDrop({
      updateDataFn: mutate,
      ...result,
      ...kanbanData
    });

    if (_DragNDrop.inSamePosition()) return;

    if (result.type === 'column') {
      _DragNDrop.updateColumnOrder();
      return;
    }

    if (_DragNDrop.inSameColumn()) {
      _DragNDrop.reorderWithinColumn();
      return;
    }

    _DragNDrop.moveToNewColumn();
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
            <AddNewColumn />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}
