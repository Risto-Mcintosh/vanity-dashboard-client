import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { kanbanOrderDetail } from "../../../types";
import { makeStyles, Card } from "@material-ui/core";
import { useHistory } from "react-router-dom";

type props = {
  order: kanbanOrderDetail;
  provided: DraggableProvided;
  isDragging: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`
  },
  dragging: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.main
  }
}));

export default function KanbanItem({ order, provided, isDragging }: props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card
      onDoubleClick={() => history.push(`/orders/${order.orderId}`)}
      className={`${classes.root} ${isDragging && classes.dragging}`}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
    >
      {order.customerName}
    </Card>
  );
}
