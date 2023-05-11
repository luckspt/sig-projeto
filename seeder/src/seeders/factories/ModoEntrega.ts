import { ModoEntrega } from '../../entities';
import type { EntityManager } from '@mikro-orm/mysql';

const baseModoEntregas = [
	{ nome: 'Aéreo Expresso' },
	{ nome: 'Aéreo Normal' },
	{ nome: 'Terrestre' },
	{ nome: 'Ferroviário' },
	{ nome: 'Marítimo' }
] as Omit<ModoEntrega, 'id'>[];

export const createModoEntregas = (em: EntityManager) => baseModoEntregas.map((modoEntrega) => em.create(ModoEntrega, modoEntrega));
