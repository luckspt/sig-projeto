import { Segmento } from '../../entities';
import type { EntityManager } from '@mikro-orm/mysql';

const baseSegmentos = [{ nome: 'Consumidor Final' }, { nome: 'Corporate' }, { nome: 'Pequena Empresa' }, { nome: 'Home Office' }] as Omit<
	Segmento,
	'id'
>[];

export const createSegmentos = (em: EntityManager) => baseSegmentos.map((segmento) => em.create(Segmento, segmento));
