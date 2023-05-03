import { Migration } from '@mikro-orm/migrations';

export class Migration20230503182155 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `categoria` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `descricao` varchar(255) not null, `categoria_pai_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `categoria` add index `categoria_categoria_pai_id_index`(`categoria_pai_id`);');

    this.addSql('create table `estado_encomenda_spec` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `modo_entrega` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `prioridade_encomenda` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `produto` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `data_registro` datetime not null, `descricao` varchar(255) not null, `desconto` int not null, `stock` int not null, `peso` int not null, `categoria_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `produto` add index `produto_categoria_id_index`(`categoria_id`);');

    this.addSql('create table `preco` (`id` int unsigned not null auto_increment primary key, `data_inicio` datetime not null, `data_fim` datetime not null, `valor` int not null, `produto_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `preco` add index `preco_produto_id_index`(`produto_id`);');

    this.addSql('create table `segmento` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `tipo_embalagem` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `zona` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `utilizador` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `data_nascimento` datetime not null, `email` varchar(255) not null, `telefone` varchar(255) not null, `username` varchar(255) not null, `password` varchar(255) not null, `cliente_id_utilizador` int unsigned null, `funcionario_id_utilizador` int unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `utilizador` add unique `utilizador_cliente_id_utilizador_unique`(`cliente_id_utilizador`);');
    this.addSql('alter table `utilizador` add unique `utilizador_funcionario_id_utilizador_unique`(`funcionario_id_utilizador`);');

    this.addSql('create table `funcionario` (`id_utilizador` int unsigned not null, `zona_id` int unsigned not null, primary key (`id_utilizador`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `funcionario` add index `funcionario_zona_id_index`(`zona_id`);');

    this.addSql('create table `cliente` (`id_utilizador` int unsigned not null, `morada_entrega` varchar(255) not null, `segmento_id` int unsigned not null, primary key (`id_utilizador`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `cliente` add index `cliente_segmento_id_index`(`segmento_id`);');

    this.addSql('create table `encomenda` (`id` int unsigned not null auto_increment primary key, `valor_total` int not null, `data_criacao` datetime not null, `devolucao_id_encomenda` int unsigned null, `funcionario_id_utilizador` int unsigned not null, `cliente_id_utilizador` int unsigned not null, `tipo_embalagem_id` int unsigned not null, `pagamento_id_encomenda` int unsigned not null, `prioridade_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `encomenda` add unique `encomenda_devolucao_id_encomenda_unique`(`devolucao_id_encomenda`);');
    this.addSql('alter table `encomenda` add index `encomenda_funcionario_id_utilizador_index`(`funcionario_id_utilizador`);');
    this.addSql('alter table `encomenda` add index `encomenda_cliente_id_utilizador_index`(`cliente_id_utilizador`);');
    this.addSql('alter table `encomenda` add index `encomenda_tipo_embalagem_id_index`(`tipo_embalagem_id`);');
    this.addSql('alter table `encomenda` add unique `encomenda_pagamento_id_encomenda_unique`(`pagamento_id_encomenda`);');
    this.addSql('alter table `encomenda` add index `encomenda_prioridade_id_index`(`prioridade_id`);');

    this.addSql('create table `pagamento` (`id_encomenda` int unsigned not null, `data` datetime not null, `modo_pagamento` varchar(255) not null, `estado_pagamento_id` int unsigned not null, primary key (`id_encomenda`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `pagamento` add index `pagamento_estado_pagamento_id_index`(`estado_pagamento_id`);');

    this.addSql('create table `estado_pagamento` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `pagamento_id_encomenda` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `estado_pagamento` add index `estado_pagamento_pagamento_id_encomenda_index`(`pagamento_id_encomenda`);');

    this.addSql('create table `linha_encomenda` (`id_produto` int unsigned not null, `id_encomenda` int unsigned not null, `quantidade` int not null, `preco` int not null, primary key (`id_produto`, `id_encomenda`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `linha_encomenda` add index `linha_encomenda_id_produto_index`(`id_produto`);');
    this.addSql('alter table `linha_encomenda` add index `linha_encomenda_id_encomenda_index`(`id_encomenda`);');

    this.addSql('create table `estado_encomenda` (`id_encomenda` int unsigned not null, `id_estado_encomenda_spec` int unsigned not null, `data` datetime not null, primary key (`id_encomenda`, `id_estado_encomenda_spec`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `estado_encomenda` add index `estado_encomenda_id_encomenda_index`(`id_encomenda`);');
    this.addSql('alter table `estado_encomenda` add index `estado_encomenda_id_estado_encomenda_spec_index`(`id_estado_encomenda_spec`);');

    this.addSql('create table `entrega` (`id` int unsigned not null auto_increment primary key, `data` datetime not null, `encomenda_id` int unsigned not null, `modo_entrega_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `entrega` add index `entrega_encomenda_id_index`(`encomenda_id`);');
    this.addSql('alter table `entrega` add index `entrega_modo_entrega_id_index`(`modo_entrega_id`);');

    this.addSql('create table `linha_entrega` (`id_linha_encomenda_produto` int unsigned not null, `id_linha_encomenda` int unsigned not null, `id_entrega` int unsigned not null, `quantidade` int not null, primary key (`id_linha_encomenda_produto`, `id_linha_encomenda`, `id_entrega`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `linha_entrega` add index `linha_entrega_id_entrega_index`(`id_entrega`);');
    this.addSql('alter table `linha_entrega` add index `linha_entrega_id_linha_encomenda_produto_id_linha_e_d7ffc_index`(`id_linha_encomenda_produto`, `id_linha_encomenda`);');

    this.addSql('create table `devolucao` (`id_encomenda` int unsigned not null, `motivo` varchar(255) not null, `data` datetime not null, `valor` int not null, primary key (`id_encomenda`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `estado` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `zona_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `estado` add index `estado_zona_id_index`(`zona_id`);');

    this.addSql('create table `cidade` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `estado_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `cidade` add index `cidade_estado_id_index`(`estado_id`);');

    this.addSql('alter table `categoria` add constraint `categoria_categoria_pai_id_foreign` foreign key (`categoria_pai_id`) references `categoria` (`id`) on update cascade;');

    this.addSql('alter table `produto` add constraint `produto_categoria_id_foreign` foreign key (`categoria_id`) references `categoria` (`id`) on update cascade;');

    this.addSql('alter table `preco` add constraint `preco_produto_id_foreign` foreign key (`produto_id`) references `produto` (`id`) on update cascade;');

    this.addSql('alter table `utilizador` add constraint `utilizador_cliente_id_utilizador_foreign` foreign key (`cliente_id_utilizador`) references `cliente` (`id_utilizador`) on update cascade on delete set null;');
    this.addSql('alter table `utilizador` add constraint `utilizador_funcionario_id_utilizador_foreign` foreign key (`funcionario_id_utilizador`) references `funcionario` (`id_utilizador`) on update cascade on delete set null;');

    this.addSql('alter table `funcionario` add constraint `funcionario_id_utilizador_foreign` foreign key (`id_utilizador`) references `utilizador` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `funcionario` add constraint `funcionario_zona_id_foreign` foreign key (`zona_id`) references `zona` (`id`) on update cascade;');

    this.addSql('alter table `cliente` add constraint `cliente_id_utilizador_foreign` foreign key (`id_utilizador`) references `utilizador` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `cliente` add constraint `cliente_segmento_id_foreign` foreign key (`segmento_id`) references `segmento` (`id`) on update cascade;');

    this.addSql('alter table `encomenda` add constraint `encomenda_devolucao_id_encomenda_foreign` foreign key (`devolucao_id_encomenda`) references `devolucao` (`id_encomenda`) on update cascade on delete set null;');
    this.addSql('alter table `encomenda` add constraint `encomenda_funcionario_id_utilizador_foreign` foreign key (`funcionario_id_utilizador`) references `funcionario` (`id_utilizador`) on update cascade;');
    this.addSql('alter table `encomenda` add constraint `encomenda_cliente_id_utilizador_foreign` foreign key (`cliente_id_utilizador`) references `cliente` (`id_utilizador`) on update cascade;');
    this.addSql('alter table `encomenda` add constraint `encomenda_tipo_embalagem_id_foreign` foreign key (`tipo_embalagem_id`) references `tipo_embalagem` (`id`) on update cascade;');
    this.addSql('alter table `encomenda` add constraint `encomenda_pagamento_id_encomenda_foreign` foreign key (`pagamento_id_encomenda`) references `pagamento` (`id_encomenda`) on update cascade;');
    this.addSql('alter table `encomenda` add constraint `encomenda_prioridade_id_foreign` foreign key (`prioridade_id`) references `prioridade_encomenda` (`id`) on update cascade;');

    this.addSql('alter table `pagamento` add constraint `pagamento_id_encomenda_foreign` foreign key (`id_encomenda`) references `encomenda` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `pagamento` add constraint `pagamento_estado_pagamento_id_foreign` foreign key (`estado_pagamento_id`) references `estado_pagamento` (`id`) on update cascade;');

    this.addSql('alter table `estado_pagamento` add constraint `estado_pagamento_pagamento_id_encomenda_foreign` foreign key (`pagamento_id_encomenda`) references `pagamento` (`id_encomenda`) on update cascade;');

    this.addSql('alter table `linha_encomenda` add constraint `linha_encomenda_id_produto_foreign` foreign key (`id_produto`) references `produto` (`id`) on update cascade;');
    this.addSql('alter table `linha_encomenda` add constraint `linha_encomenda_id_encomenda_foreign` foreign key (`id_encomenda`) references `encomenda` (`id`) on update cascade;');

    this.addSql('alter table `estado_encomenda` add constraint `estado_encomenda_id_encomenda_foreign` foreign key (`id_encomenda`) references `encomenda` (`id`) on update cascade;');
    this.addSql('alter table `estado_encomenda` add constraint `estado_encomenda_id_estado_encomenda_spec_foreign` foreign key (`id_estado_encomenda_spec`) references `estado_encomenda_spec` (`id`) on update cascade;');

    this.addSql('alter table `entrega` add constraint `entrega_encomenda_id_foreign` foreign key (`encomenda_id`) references `encomenda` (`id`) on update cascade;');
    this.addSql('alter table `entrega` add constraint `entrega_modo_entrega_id_foreign` foreign key (`modo_entrega_id`) references `modo_entrega` (`id`) on update cascade;');

    this.addSql('alter table `linha_entrega` add constraint `linha_entrega_id_linha_encomenda_produto_id_linha_34405_foreign` foreign key (`id_linha_encomenda_produto`, `id_linha_encomenda`) references `linha_encomenda` (`id_produto`, `id_encomenda`) on update cascade;');
    this.addSql('alter table `linha_entrega` add constraint `linha_entrega_id_entrega_foreign` foreign key (`id_entrega`) references `entrega` (`id`) on update cascade;');

    this.addSql('alter table `devolucao` add constraint `devolucao_id_encomenda_foreign` foreign key (`id_encomenda`) references `encomenda` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `estado` add constraint `estado_zona_id_foreign` foreign key (`zona_id`) references `zona` (`id`) on update cascade;');

    this.addSql('alter table `cidade` add constraint `cidade_estado_id_foreign` foreign key (`estado_id`) references `estado` (`id`) on update cascade;');
  }

}
