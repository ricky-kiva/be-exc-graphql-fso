import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/schemas';
import queryRslv from './graphql/resolvers/queryRslv';
import { authorRslv } from './graphql/resolvers/authorRslv';
import mutationRslv from './graphql/resolvers/mutationRslv';

const resolvers = {
  Query: queryRslv,
  Author: authorRslv,
  Mutation: mutationRslv
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
