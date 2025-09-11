import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Query {
    dummy: Int
  }
`;

const resolvers = {
  Query: {
    dummy: (): number => Math.floor(Math.random() * 100) + 1,
  }
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
