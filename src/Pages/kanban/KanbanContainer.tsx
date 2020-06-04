import React from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import DragNDrop from './dndUtil';
import { RootRef, styled } from '@material-ui/core';
import { useKanbanUpdate } from '../../utils/kanban';
import { kanbanDataMap } from '../../types';


type props = {
  kanbanData: kanbanDataMap;
  children: React.ReactNode;
};

const Container = styled('div')(({ theme }) => ({
  // display: 'grid',
  // gridTemplateColumns: 'repeat(auto-fit, 200px)',
  // gridColumnGap: '25px',
  // gridAutoFlow: 'column',
  display: 'flex',
  alignItems: 'flex-start',
  overflowX: 'auto',
  paddingBottom: theme.spacing(3),
}));

export default function KanbanContainer({ kanbanData, children }: props) {
  const [mutate] = useKanbanUpdate();

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const _DragNDrop = new DragNDrop({
      updateDataFn: mutate,
      ...result,
      ...kanbanData,
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
          <RootRef rootRef={provided.innerRef}>
            <Container {...provided.droppableProps}>
              {children}
              {provided.placeholder}
            </Container>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  );
}
