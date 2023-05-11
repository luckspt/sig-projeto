import { PrioridadeEncomenda } from '../../entities';
import type { EntityManager } from '@mikro-orm/mysql';

const basePrioridadeEncomendas = [{ nome: 'Crítica' }, { nome: 'Alta' }, { nome: 'Média' }, { nome: 'Baixa' }] as Omit<PrioridadeEncomenda, 'id'>[];

export const createPrioridadeEncomendas = (em: EntityManager) =>
	basePrioridadeEncomendas.map((prioridadeEncomenda) => em.create(PrioridadeEncomenda, prioridadeEncomenda));
