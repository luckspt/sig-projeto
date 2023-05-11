import { Zona } from '../../entities';
import type { EntityManager } from '@mikro-orm/mysql';

const baseZonas = [{ nome: 'Centro' }, { nome: 'Sul' }, { nome: 'Este' }, { nome: 'Oeste' }] as Omit<Zona, 'id'>[];

export const createZonas = (em: EntityManager) => baseZonas.map((zona) => em.create(Zona, zona));
