import { Collection, Entity, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import type { Funcionario } from './Funcionario';
import type { Cliente } from './Cliente';
import type { TipoEmbalagem } from './TipoEmbalagem';
import { Pagamento } from './Pagamento';
import type { PrioridadeEncomenda } from './PrioridadeEncomenda';
import { EstadoEncomenda } from './EstadoEncomenda';
import { Entrega } from './Entrega';
import { LinhaEncomenda } from './LinhaEncomenda';
import { Devolucao } from './Devolucao';

@Entity()
export class Encomenda {
	@PrimaryKey()
	public id!: number;

	@Property()
	public valorTotal!: number;

	@Property()
	public dataCriacao!: Date;

	@OneToOne(() => Devolucao, (devolucao) => devolucao.encomenda, { nullable: true })
	public devolucao!: Devolucao;

	@ManyToOne()
	public funcionario!: Funcionario;

	@ManyToOne()
	public cliente!: Cliente;

	@ManyToOne()
	public tipoEmbalagem!: TipoEmbalagem;

	@OneToOne(() => Pagamento, (pagamento) => pagamento.encomenda, { nullable: true })
	public pagamento!: Pagamento;

	@ManyToOne()
	public prioridade!: PrioridadeEncomenda;

	@OneToMany(() => EstadoEncomenda, (estado) => estado.encomenda)
	public estados = new Collection<EstadoEncomenda>(this);

	@OneToMany(() => Entrega, (entrega) => entrega.encomenda)
	public entregas = new Collection<Entrega>(this);

	@OneToMany(() => LinhaEncomenda, (linha) => linha.encomenda)
	public linhasEncomenda = new Collection<LinhaEncomenda>(this);
}
