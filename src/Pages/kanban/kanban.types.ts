export type kanbanOrderDetail = {
  orderId: number;
  customerName: string;
  dueOn: Date | string;
  orderStatus: string;
  kanbanColumnId: number;
  priority: number;
};
