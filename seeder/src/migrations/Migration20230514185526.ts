import { Migration } from '@mikro-orm/migrations';

export class Migration20230514185526 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `categoria` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `descricao` varchar(255) not null, `categoria_pai_id` int unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `categoria` add index `categoria_categoria_pai_id_index`(`categoria_pai_id`);');

    this.addSql('create table `estado_encomenda_spec` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `estado_pagamento` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `modo_entrega` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `prioridade_encomenda` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `produto` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `data_registro` datetime not null, `descricao` varchar(255) not null, `desconto` int not null, `stock` int not null, `peso` int not null, `categoria_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `produto` add index `produto_categoria_id_index`(`categoria_id`);');

    this.addSql('create table `preco` (`id` int unsigned not null auto_increment primary key, `data_inicio` datetime not null, `data_fim` datetime not null, `valor` int not null, `produto_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `preco` add index `preco_produto_id_index`(`produto_id`);');

    this.addSql('create table `segmento` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `tipo_embalagem` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `utilizador` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `data_nascimento` datetime not null, `email` varchar(255) not null, `telefone` varchar(255) not null, `username` varchar(255) not null, `password` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `cliente` (`utilizador_id` int unsigned not null, `morada_entrega` varchar(255) not null, `segmento_id` int unsigned not null, primary key (`utilizador_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `cliente` add index `cliente_segmento_id_index`(`segmento_id`);');

    this.addSql('create table `zona` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `funcionario` (`utilizador_id` int unsigned not null, `zona_id` int unsigned not null, primary key (`utilizador_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `funcionario` add index `funcionario_zona_id_index`(`zona_id`);');

    this.addSql('create table `encomenda` (`id` int unsigned not null auto_increment primary key, `valor_total` int not null, `data_criacao` datetime not null, `funcionario_utilizador_id` int unsigned not null, `cliente_utilizador_id` int unsigned not null, `tipo_embalagem_id` int unsigned not null, `prioridade_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `encomenda` add index `encomenda_funcionario_utilizador_id_index`(`funcionario_utilizador_id`);');
    this.addSql('alter table `encomenda` add index `encomenda_cliente_utilizador_id_index`(`cliente_utilizador_id`);');
    this.addSql('alter table `encomenda` add index `encomenda_tipo_embalagem_id_index`(`tipo_embalagem_id`);');
    this.addSql('alter table `encomenda` add index `encomenda_prioridade_id_index`(`prioridade_id`);');

    this.addSql('create table `pagamento` (`encomenda_id` int unsigned not null, `data` datetime not null, `modo_pagamento` varchar(255) not null, `estado_pagamento_id` int unsigned not null, primary key (`encomenda_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `pagamento` add index `pagamento_estado_pagamento_id_index`(`estado_pagamento_id`);');

    this.addSql('create table `linha_encomenda` (`produto_id` int unsigned not null, `encomenda_id` int unsigned not null, `quantidade` int not null, `preco` int not null, primary key (`produto_id`, `encomenda_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `linha_encomenda` add index `linha_encomenda_produto_id_index`(`produto_id`);');
    this.addSql('alter table `linha_encomenda` add index `linha_encomenda_encomenda_id_index`(`encomenda_id`);');

    this.addSql('create table `estado_encomenda` (`encomenda_id` int unsigned not null, `spec_id` int unsigned not null, `data` datetime not null, primary key (`encomenda_id`, `spec_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `estado_encomenda` add index `estado_encomenda_encomenda_id_index`(`encomenda_id`);');
    this.addSql('alter table `estado_encomenda` add index `estado_encomenda_spec_id_index`(`spec_id`);');

    this.addSql('create table `entrega` (`id` int unsigned not null auto_increment primary key, `data` datetime not null, `encomenda_id` int unsigned not null, `modo_entrega_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `entrega` add index `entrega_encomenda_id_index`(`encomenda_id`);');
    this.addSql('alter table `entrega` add index `entrega_modo_entrega_id_index`(`modo_entrega_id`);');

    this.addSql('create table `linha_entrega` (`linha_encomenda_produto_id` int unsigned not null, `linha_encomenda_encomenda_id` int unsigned not null, `entrega_id` int unsigned not null, `quantidade` int not null, primary key (`linha_encomenda_produto_id`, `linha_encomenda_encomenda_id`, `entrega_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `linha_entrega` add index `linha_entrega_entrega_id_index`(`entrega_id`);');
    this.addSql('alter table `linha_entrega` add index `linha_entrega_linha_encomenda_produto_id_linha_enco_62adc_index`(`linha_encomenda_produto_id`, `linha_encomenda_encomenda_id`);');

    this.addSql('create table `devolucao` (`encomenda_id` int unsigned not null, `motivo` varchar(255) not null, `data` datetime not null, `valor` int not null, primary key (`encomenda_id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `estado` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `zona_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `estado` add index `estado_zona_id_index`(`zona_id`);');

    this.addSql('create table `cidade` (`id` int unsigned not null auto_increment primary key, `nome` varchar(255) not null, `estado_id` int unsigned not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `cidade` add index `cidade_estado_id_index`(`estado_id`);');

    this.addSql('alter table `categoria` add constraint `categoria_categoria_pai_id_foreign` foreign key (`categoria_pai_id`) references `categoria` (`id`) on update cascade on delete set null;');

    this.addSql('alter table `produto` add constraint `produto_categoria_id_foreign` foreign key (`categoria_id`) references `categoria` (`id`) on update cascade;');

    this.addSql('alter table `preco` add constraint `preco_produto_id_foreign` foreign key (`produto_id`) references `produto` (`id`) on update cascade;');

    this.addSql('alter table `cliente` add constraint `cliente_utilizador_id_foreign` foreign key (`utilizador_id`) references `utilizador` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `cliente` add constraint `cliente_segmento_id_foreign` foreign key (`segmento_id`) references `segmento` (`id`) on update cascade;');

    this.addSql('alter table `funcionario` add constraint `funcionario_utilizador_id_foreign` foreign key (`utilizador_id`) references `utilizador` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `funcionario` add constraint `funcionario_zona_id_foreign` foreign key (`zona_id`) references `zona` (`id`) on update cascade;');

    this.addSql('alter table `encomenda` add constraint `encomenda_funcionario_utilizador_id_foreign` foreign key (`funcionario_utilizador_id`) references `funcionario` (`utilizador_id`) on update cascade;');
    this.addSql('alter table `encomenda` add constraint `encomenda_cliente_utilizador_id_foreign` foreign key (`cliente_utilizador_id`) references `cliente` (`utilizador_id`) on update cascade;');
    this.addSql('alter table `encomenda` add constraint `encomenda_tipo_embalagem_id_foreign` foreign key (`tipo_embalagem_id`) references `tipo_embalagem` (`id`) on update cascade;');
    this.addSql('alter table `encomenda` add constraint `encomenda_prioridade_id_foreign` foreign key (`prioridade_id`) references `prioridade_encomenda` (`id`) on update cascade;');

    this.addSql('alter table `pagamento` add constraint `pagamento_encomenda_id_foreign` foreign key (`encomenda_id`) references `encomenda` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `pagamento` add constraint `pagamento_estado_pagamento_id_foreign` foreign key (`estado_pagamento_id`) references `estado_pagamento` (`id`) on update cascade;');

    this.addSql('alter table `linha_encomenda` add constraint `linha_encomenda_produto_id_foreign` foreign key (`produto_id`) references `produto` (`id`) on update cascade;');
    this.addSql('alter table `linha_encomenda` add constraint `linha_encomenda_encomenda_id_foreign` foreign key (`encomenda_id`) references `encomenda` (`id`) on update cascade;');

    this.addSql('alter table `estado_encomenda` add constraint `estado_encomenda_encomenda_id_foreign` foreign key (`encomenda_id`) references `encomenda` (`id`) on update cascade;');
    this.addSql('alter table `estado_encomenda` add constraint `estado_encomenda_spec_id_foreign` foreign key (`spec_id`) references `estado_encomenda_spec` (`id`) on update cascade;');

    this.addSql('alter table `entrega` add constraint `entrega_encomenda_id_foreign` foreign key (`encomenda_id`) references `encomenda` (`id`) on update cascade;');
    this.addSql('alter table `entrega` add constraint `entrega_modo_entrega_id_foreign` foreign key (`modo_entrega_id`) references `modo_entrega` (`id`) on update cascade;');

    this.addSql('alter table `linha_entrega` add constraint `linha_entrega_linha_encomenda_produto_id_linha_en_0905a_foreign` foreign key (`linha_encomenda_produto_id`, `linha_encomenda_encomenda_id`) references `linha_encomenda` (`produto_id`, `encomenda_id`) on update cascade;');
    this.addSql('alter table `linha_entrega` add constraint `linha_entrega_entrega_id_foreign` foreign key (`entrega_id`) references `entrega` (`id`) on update cascade;');

    this.addSql('alter table `devolucao` add constraint `devolucao_encomenda_id_foreign` foreign key (`encomenda_id`) references `encomenda` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `estado` add constraint `estado_zona_id_foreign` foreign key (`zona_id`) references `zona` (`id`) on update cascade;');

    this.addSql('alter table `cidade` add constraint `cidade_estado_id_foreign` foreign key (`estado_id`) references `estado` (`id`) on update cascade;');
  }

}
