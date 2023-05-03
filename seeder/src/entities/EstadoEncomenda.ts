import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import type { Encomenda } from "./Encomenda";

@Entity()
export class EstadoEncomenda {
  @PrimaryKey()
  public id!: number;

  @Property()
  public nome!: string;

  @Property()
  public data!: Date;

  @ManyToOne()
  public encomenda!: Encomenda;
}
