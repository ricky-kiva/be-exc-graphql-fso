import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/schemas';
import resolvers from './graphql/resolvers';
import connectToMongoDB from './db/connect';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await connectToMongoDB();
  
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
