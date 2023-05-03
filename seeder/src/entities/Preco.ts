import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import type { Produto } from "./Produto";

@Entity()
export class Preco {
  @PrimaryKey()
  public id!: number;

  @Property()
  public dataInicio!: Date;

  @Property()
  public dataFim!: Date;

  @Property()
  public valor!: number;

  @ManyToOne()
  public produto!: Produto;
}
