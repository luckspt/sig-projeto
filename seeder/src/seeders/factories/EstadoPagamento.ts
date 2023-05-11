import { EstadoPagamento } from '../../entities';
import type { EntityManager } from '@mikro-orm/mysql';

const baseEstadoPagamentos = [{ nome: 'Pendente' }, { nome: 'Quitado' }, { nome: 'Cancelado' }] as Omit<EstadoPagamento, 'id'>[];

export const createEstadoPagamentos = (em: EntityManager) =>
	baseEstadoPagamentos.map((estadoPagamento) => em.create(EstadoPagamento, estadoPagamento));
