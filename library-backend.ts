import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './graphql/schemas';
import resolvers from './graphql/resolvers';
import connectToMongoDB from './db/connect';
import jwt from 'jsonwebtoken';
import User from './db/schemas/User';
import { JwtPayload } from './jwt/types/JwtPayload';
import { Context } from './graphql/types/Context';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

async function startServer() {
  await connectToMongoDB();
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<Context> => {
      const auth = req.headers.authorization || null;

      if (auth?.startsWith("Bearer ")) {
        try {
          const decodedToken = jwt.verify(
            auth.substring(7), 
            process.env.JWT_SECRET as string
          ) as JwtPayload;

          const currentUser = await User.findById(decodedToken.id);

          return { currentUser } as Context;
        } catch (e) {
          console.error(`Invalid token: ${e}`);
          return { currentUser: null } as Context;
        }
      }

      return { currentUser: null } as Context;
    }
  });

  console.log(`Server ready at ${url}`);
}

startServer().catch((e) => {
  console.error(e);
});
