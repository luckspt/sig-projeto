import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "@mikro-orm/core";
import type { Utilizador } from "./Utilizador";
import type { Zona } from "./Zona";
import { Encomenda } from "./Encomenda";

@Entity()
export class Funcionario {
  @OneToOne({ primary: true, joinColumn: "id_utilizador" })
  public utilizador!: Utilizador;

  @ManyToOne()
  public zona!: Zona;

  @OneToMany(() => Encomenda, (encomenda) => encomenda.funcionario)
  public encomendas = new Collection<Encomenda>(this);
}
