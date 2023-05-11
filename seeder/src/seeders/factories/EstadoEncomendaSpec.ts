import { EstadoEncomendaSpec } from '../../entities';
import type { EntityManager } from '@mikro-orm/mysql';

const baseEstadoEncomendaSpecs = [{ nome: 'Aceite' }, { nome: 'Cancelada' }] as Omit<EstadoEncomendaSpec, 'id'>[];

export const createEstadoEncomendaSpecs = (em: EntityManager) =>
	baseEstadoEncomendaSpecs.map((estadoEncomendaSpec) => em.create(EstadoEncomendaSpec, estadoEncomendaSpec));
