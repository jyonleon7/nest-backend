module.exports = {
  type: 'postgres',
  // host: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  // 通常は、Entityを追加するごとにそのEntityをTypeOrmの設定に追加する必要があるが、true の場合、必要なしになる。
  autoLoadEntities: true,
  // migration ファイルを作成する際に、どのentities を読み込むか
  entities: ['dist/entities/*.entity.js'],
  // どのmigration ファイルを使用して、migrationするか
  migrations: ['dist/migrations/*.js'],
  // cli によって作成された、「entities」「migrations」の出力場所
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};
