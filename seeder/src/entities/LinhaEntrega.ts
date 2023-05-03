import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import type { LinhaEncomenda } from "./LinhaEncomenda";
import type { Entrega } from "./Entrega";

@Entity()
export class LinhaEntrega {
  @ManyToOne({ primary: true, joinColumn: "id_linha_encomenda" })
  public linhaEncomenda!: LinhaEncomenda;

  @ManyToOne({ primary: true, joinColumn: "id_entrega" })
  public entrega!: Entrega;

  @Property()
  public quantidade!: number;
}
