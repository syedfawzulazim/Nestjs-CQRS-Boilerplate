import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  autoLoadEntities: true,
  migrationsRun: process.env.DATABASE_MIGRATION === 'true',
  migrationsTableName: 'migration',
  migrations: [process.env.DATABASE_MIGRATION_FILES ?? 'dist/migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
  logging: process.env.DATABASE_MIGRATION === 'true',
  logger: 'advanced-console',
};

export default typeOrmConfig;
