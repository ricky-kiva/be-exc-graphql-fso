import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/schemas';
import queryRsv from './graphql/resolvers/queryRsv';
import authorRsv from './graphql/resolvers/authorRsv';

const resolvers = {
  Query: queryRsv,
  Author: authorRsv
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000
    }
  });

  console.log(`Server ready at ${url}`);
}

startServer().catch((e) => {
  console.error(e);
});
