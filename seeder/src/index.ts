import { EntityManager, MikroORM } from "@mikro-orm/mysql";

const container = {} as {
    orm: MikroORM
    em: EntityManager
}

const main = async () => {
    container.orm = await MikroORM.init();
    
    console.log('Hello world!');
}

main();