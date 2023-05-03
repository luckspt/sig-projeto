import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Funcionario } from "./Funcionario";
import { Estado } from "./Estado";

@Entity()
export class Zona {
  @PrimaryKey()
  public id!: number;

  @Property()
  public nome!: string;

  @OneToMany(() => Estado, (estado) => estado.zona)
  public estados = new Collection<Estado>(this);

  @OneToMany(() => Funcionario, (funcionario) => funcionario.zona)
  public funcionarios = new Collection<Funcionario>(this);
}
