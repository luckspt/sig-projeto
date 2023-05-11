import { TipoEmbalagem } from '../../entities';
import type { EntityManager } from '@mikro-orm/mysql';

const baseTipoEmbalagems = [
	{ nome: 'Caixa Grande' },
	{ nome: 'Caixa Média' },
	{ nome: 'Caixa Pequena' },
	{ nome: 'Tambor' },
	{ nome: 'Saco' }
] as Omit<TipoEmbalagem, 'id'>[];

export const createTipoEmbalagems = (em: EntityManager) => baseTipoEmbalagems.map((tipoEmbalagem) => em.create(TipoEmbalagem, tipoEmbalagem));
