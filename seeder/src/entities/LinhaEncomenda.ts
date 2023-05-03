import { Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import type { Encomenda } from "./Encomenda";
import type { Produto } from "./Produto";
import { LinhaEntrega } from "./LinhaEntrega";

@Entity()
export class LinhaEncomenda {
  @ManyToOne({ primary: true, joinColumn: "id_produto" })
  public produto!: Produto;

  @ManyToOne({ primary: true, joinColumn: "id_encomenda" })
  public encomenda!: Encomenda;

  @Property()
  public quantidade!: number;

  @Property()
  public preco!: number;

  @OneToMany(() => LinhaEntrega, (linhaEntrega) => linhaEntrega.linhaEncomenda)
  public linhasEntrega = new Array<LinhaEntrega>();
}
