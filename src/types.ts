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

export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

type VanityComponent = {
  id?: number;
  size: string;
  price: number;
};

export type Vanity = {
  color: string;
  mirror: VanityComponent;
  table: VanityComponent;
  baseMaterial: VanityComponent;
};

export type Meta = {
  paidOn?: Date;
  dueOn?: Date;
  completedOn?: Date;
};

export type Order = {
  id: number;
  customer: Customer;
  vanity: Vanity;
  total: number;
  orderStatus: string;
  orderedOn: Date;
  meta: Meta;
};
