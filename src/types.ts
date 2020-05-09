export enum Sizes {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum OrderStatus {
  New = 'new',
  Pending = 'pending',
  Paid = 'paid',
  Complete = 'complete',
}

export enum VanityColor {
  White = 'white',
  Black = 'black',
  Pink = 'pink',
}

export interface ICustomer {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface IVanity {
  color: string;
  mirrorSize: Sizes;
  tableSize: Sizes;
}

export interface IMeta {
  paidOn?: Date;
  dueOn?: Date;
  completedOn?: Date;
}

export interface IOrder {
  id: number;
  customer: ICustomer;
  vanity: IVanity;
  total: number;
  orderStatus: string;
  orderedOn: Date;
  meta: IMeta;
}
