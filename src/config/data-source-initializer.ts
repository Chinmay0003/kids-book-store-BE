import dataSource from "~src/config/ormconfig.pgap";

export const initializeDataSources = async () => {
  await dataSource
    .initialize()
    .then(() => console.log(`Default datasource has been initialized!`));
};
