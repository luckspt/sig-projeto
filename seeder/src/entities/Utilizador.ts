import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import type { Funcionario } from "./Funcionario";
import type { Cliente } from "./Cliente";

@Entity()
export class Utilizador {
  @PrimaryKey()
  public id!: number;

  @Property()
  public nome!: string;

  @Property()
  public dataNascimento!: Date;

  @Property()
  public email!: string;

  @Property()
  public telefone!: string;

  @Property()
  public username!: string;

  @Property()
  public password!: string;

  @OneToOne({ nullable: true })
  public cliente!: Cliente;

  @OneToOne({ nullable: true })
  public funcionario!: Funcionario;
}
