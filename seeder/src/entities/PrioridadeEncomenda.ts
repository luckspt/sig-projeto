import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Encomenda } from "./Encomenda";

@Entity()
export class PrioridadeEncomenda {
  @PrimaryKey()
  public id!: number;

  @Property()
  public nome!: string;

  @OneToMany(() => Encomenda, (encomenda) => encomenda.prioridade)
  public encomendas = new Collection<Encomenda>(this);
}
