import { AggregateRoot } from '@nestjs/cqrs';

export interface IProductProperties {
  id: string;
  title: string;
  description: string;
  price: number;
}

export class Products extends AggregateRoot {
  public readonly id: string;
  public title: string;
  public description: string;
  public price: number;

  constructor(props: IProductProperties) {
    super();
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.price = props.price;
  }
}


