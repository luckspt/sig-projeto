import type { EntityManager } from '@mikro-orm/mysql';
import { faker, Seeder } from '@mikro-orm/seeder';
import {
	CategoriaFactory,
	CidadeFactory,
	ClienteFactory,
	createEstadoEncomendaSpecs,
	createEstadoPagamentos,
	createModoEntregas,
	createPrioridadeEncomendas,
	createSegmentos,
	createTipoEmbalagems,
	createZonas,
	DevolucaoFactory,
	EncomendaFactory,
	EntregaFactory,
	EstadoEncomendaFactory,
	EstadoFactory,
	FuncionarioFactory,
	LinhaEncomendaFactory,
	LinhaEntregaFactory,
	PagamentoFactory,
	PrecoFactory,
	ProdutoFactory,
	UtilizadorFactory
} from './factories';
import type { Entrega } from '../entities';

export class MainSeeder extends Seeder {
	public async run(em: EntityManager): Promise<void> {
		faker.setLocale('pt_PT');

		const categoryFactory = new CategoriaFactory(em);
		const productFactory = new ProdutoFactory(em);
		const precoFactory = new PrecoFactory(em);
		const utilizadorFactory = new UtilizadorFactory(em);
		const funcionarioFactory = new FuncionarioFactory(em);
		const clienteFactory = new ClienteFactory(em);
		const estadoFactory = new EstadoFactory(em);
		const cidadeFactory = new CidadeFactory(em);
		const encomendaFactory = new EncomendaFactory(em);
		const linhaEncomendaFactory = new LinhaEncomendaFactory(em);
		const devolucaoFactory = new DevolucaoFactory(em);
		const pagamentoFactory = new PagamentoFactory(em);
		const estadoEncomendaFactory = new EstadoEncomendaFactory(em);
		const entregaFactory = new EntregaFactory(em);
		const linhaEntregaFactory = new LinhaEntregaFactory(em);

		console.log('Generating categorias...');
		// We create some Categories
		const categorias = await categoryFactory.create(500);

		console.log('Setting some categorias with parents...');
		categorias.forEach((category) => {
			// 5% being root category
			if (faker.datatype.number({ min: 1, max: 100 }) <= 5) return;

			// The remaining 95% get a random parent
			const parent = faker.helpers.arrayElement(categorias);
			if (parent.id !== category.id) category.categoriaPai = parent;
		});

		// We persist the changes
		await em.persistAndFlush(categorias);

		console.log('Generating utilizadores...');
		const utilizadores = await utilizadorFactory.create(1000);

		// Zonas
		console.log('Generating zonas...');
		const zonas = await createZonas(em);
		zonas.map((zona) => {
			zona.estados.set(
				estadoFactory
					.each((estado) => {
						estado.cidades.set(cidadeFactory.make(faker.datatype.number({ min: 1, max: 10 })));
					})
					.make(faker.datatype.number({ min: 1, max: 10 }))
			);
			return zona;
		});
		await em.persistAndFlush(zonas);

		// Utilizadores
		// Half of the utilizadores are Funcionario
		console.log('Generating funcionarios...');
		const utilizadoresFuncionarios = utilizadores.slice(0, utilizadores.length / 2);
		const funcionarios = utilizadoresFuncionarios.map((utilizador) =>
			funcionarioFactory.makeOne({ utilizador, zona: faker.helpers.arrayElement(zonas) })
		);
		await em.persistAndFlush(funcionarios);

		console.log('Generating segmentos...');
		const segmentos = createSegmentos(em);
		await em.persistAndFlush(segmentos);

		// The other half are Clientes
		console.log('Generating clientes...');
		const utilizadoresClientes = utilizadores.slice(utilizadores.length / 2);
		const clientes = utilizadoresClientes.map((utilizador) =>
			clienteFactory.makeOne({ utilizador, segmento: faker.helpers.arrayElement(segmentos) })
		);
		await em.persistAndFlush(clientes);

		console.log('Generating produtos...');
		// We create some Products from some Categories
		const produtos = await productFactory
			.each((product) => {
				product.categoria = faker.helpers.arrayElement(categorias);
				product.precos.set(precoFactory.make(faker.datatype.number({ min: 1, max: 10 })));
			})
			.create(1000);

		console.log('Generating tipos de embalagem...');
		const tiposEmbalagem = createTipoEmbalagems(em);
		await em.persistAndFlush(tiposEmbalagem);

		console.log('Generating prioridades...');
		const prioridades = createPrioridadeEncomendas(em);
		await em.persistAndFlush(prioridades);

		console.log('Generating estados pagamento...');
		const estadosPagamento = createEstadoPagamentos(em);
		await em.persistAndFlush(estadosPagamento);

		console.log('Generating estados encomenda spec...');
		const estadosEncomendaSpec = createEstadoEncomendaSpecs(em);
		await em.persistAndFlush(estadosEncomendaSpec);

		console.log('Generating encomendas...');
		// We create some Orders from some Products
		const encomendas = await encomendaFactory
			.each((encomenda) => {
				encomenda.cliente = faker.helpers.arrayElement(clientes);
				encomenda.funcionario = faker.helpers.arrayElement(funcionarios);

				encomenda.tipoEmbalagem = faker.helpers.arrayElement(tiposEmbalagem);
				encomenda.prioridade = faker.helpers.arrayElement(prioridades);

				encomenda.valorTotal = 1;

				// 15% chance of being returned
				if (faker.datatype.number({ min: 1, max: 100 }) <= 15) {
					encomenda.devolucao = devolucaoFactory
						.each((devolucao) => {
							devolucao.valor = faker.datatype.number({ min: 1, max: encomenda.valorTotal });
						})
						.makeOne({
							encomenda
						});
				}

				// 90% chance of being paid
				if (faker.datatype.number({ min: 1, max: 100 }) <= 90) {
					encomenda.pagamento = pagamentoFactory
						.each((pagamento) => {
							pagamento.estadoPagamento = faker.helpers.arrayElement(estadosPagamento);
						})
						.makeOne({
							encomenda
						});
				}

				// 80& chance of being accepted
				if (faker.datatype.number({ min: 1, max: 100 }) <= 80) {
					encomenda.estados.add(
						estadoEncomendaFactory
							.each((estadoEncomenda) => {
								estadoEncomenda.spec = estadosEncomendaSpec.find((spec) => spec.nome === 'Aceite')!;
							})
							.makeOne({
								encomenda
							})
					);

					// 15% (of the 80%, in total 12%) chance of being cancelled
					if (faker.datatype.number({ min: 1, max: 100 }) <= 15) {
						encomenda.estados.add(
							estadoEncomendaFactory
								.each((estadoEncomenda) => {
									estadoEncomenda.spec = estadosEncomendaSpec.find((spec) => spec.nome === 'Cancelada')!;
								})
								.makeOne({
									encomenda
								})
						);
					}
				}
			})
			.create(5000);

		console.log('Generating modos entrega...');
		const modosEntrega = createModoEntregas(em);
		await em.persistAndFlush(modosEntrega);

		// Add linhasEncomenda to encomendas
		encomendas.forEach((encomenda) => {
			// Random number of produtos, in a random place of produtos
			// !PERFORMANCE shuffling isn't optimal, but it's fine for now
			const produtosWithEncomendas = faker.helpers.shuffle(produtos).slice(0, faker.datatype.number({ min: 1, max: 20 }));

			// let entregas: Entrega[] = [];
			// // 70% chance of having a delivery
			// if (faker.datatype.number({ min: 1, max: 100 }) <= 70) {
			// 	// Create some entregas
			// 	const entregasCount = faker.datatype.number({ min: 1, max: 5 });
			// 	entregas = entregaFactory
			// 		.each((entrega) => {
			// 			entrega.modoEntrega = faker.helpers.arrayElement(modosEntrega);
			// 		})
			// 		.make(entregasCount, { encomenda });
			// }

			encomenda.linhasEncomenda.set(
				linhaEncomendaFactory
					.each((linhaEncomenda) => {
						[linhaEncomenda.produto] = produtosWithEncomendas.splice(0, 1);
						// !THIS IS NOT COHERENT => PRECO SHOULD BE THE PRICE AT THE TIME OF THE ORDER, NOT A RANDOM ONE
						linhaEncomenda.preco = faker.helpers.arrayElement(linhaEncomenda.produto.precos.getItems()).valor;

						// // 25% chance of being in a entrega
						// if (entregas.length && faker.datatype.number({ min: 1, max: 100 }) <= 25) {
						// 	const entrega = faker.helpers.arrayElement(entregas);
						// 	entrega.linhasEntrega.add(
						// 		linhaEntregaFactory
						// 			.each((linhaEntrega) => {
						// 				linhaEntrega.quantidade = faker.datatype.number({ min: 1, max: linhaEncomenda.quantidade });
						// 			})
						// 			.makeOne({
						// 				entrega,
						// 				linhaEncomenda
						// 			})
						// 	);
						// }
					})
					.make(produtosWithEncomendas.length)
			);

			// // Add entregas
			// encomenda.entregas.add(entregas.filter((entrega) => entrega.linhasEntrega.count() > 0));

			// Compute total value
			encomenda.valorTotal = encomenda.linhasEncomenda.getItems().reduce((acc, linhaEncomenda) => linhaEncomenda.preco + acc, 0);
		});

		// We persist the changes
		await em.persistAndFlush(encomendas);

		console.log('Generating entregas...');
		encomendas.forEach((encomenda) => {
			let entregas: Entrega[] = [];
			// 70% chance of having a delivery
			if (faker.datatype.number({ min: 1, max: 100 }) <= 70) {
				// Create some entregas
				const entregasCount = faker.datatype.number({ min: 1, max: 5 });
				entregas = entregaFactory
					.each((entrega) => {
						entrega.modoEntrega = faker.helpers.arrayElement(modosEntrega);
					})
					.make(entregasCount, { encomenda });

				encomenda.linhasEncomenda.getItems().forEach((linhaEncomenda) => {
					// 25% chance of being in a entrega
					if (entregas.length && faker.datatype.number({ min: 1, max: 100 }) <= 25) {
						const entrega = faker.helpers.arrayElement(entregas);
						entrega.linhasEntrega.add(
							linhaEntregaFactory
								.each((linhaEntrega) => {
									linhaEntrega.quantidade = faker.datatype.number({ min: 1, max: linhaEncomenda.quantidade });
								})
								.makeOne({
									entrega,
									linhaEncomenda
								})
						);
					}
				});
			}
		});

		await em.persistAndFlush(encomendas);
	}
}
