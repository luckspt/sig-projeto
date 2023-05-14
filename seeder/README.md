# Seeder

## Dependências
Para executar o seeder, necessita de ter o [*Node.js*](https://nodejs.org/en/) instalado.

Além disso, necessita de um servidor de bases de dados (DBMS). Neste projeto, foi usado [*MySQL*](https://www.mysql.com/). Se pretende usar outro, algum código aplicacional terá de ser alterado.

## Variáveis de ambiente
Para executar o seeder, necessita de definir as seguintes variáveis de ambiente:
 - `MIKRO_ORM_HOST`=localhost
 - `MIKRO_ORM_PORT`=3306
 - `MIKRO_ORM_USER`=root
 - `MIKRO_ORM_PASSWORD`=hello
 - `MIKRO_ORM_DB_NAME`=sig
 - `MIKRO_ORM_DEBUG`=true
 
> Os valores são meros exemplos, e devem ser alterados para os valores que pretende.

## Execução

Damos preferência a `yarn`, mas pode usar `npm` se preferir.

1. Instalar dependências
```bash
yarn install
```

2. Executar as migrações
```bash
yarn mikro-orm migration:up
```

3. Executar o seeder
```bash
yarn mikro-orm seeder:run
```

Para facilitar, existe um ficheiro SQL que contém o esquema relacional e alguns dados. Pode importá-lo para o seu DBMS, e depois executar o seeder para adicionar os restantes dados.
Esse script foi gerado com `mysqldump`, e está disponível em [dump.sql](dump.sql).
