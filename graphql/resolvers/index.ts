import { authorMutationRslv, authorQueryRslv, authorRslv } from './authorRslv';
import { bookMutationRslv, bookQueryRslv } from './bookRslv';
import { userMutationRslv, userQueryRslv } from './UserRslv';

const dummy = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};

const queryRslv = {
  ...authorQueryRslv,
  ...bookQueryRslv,
  ...userQueryRslv,
  dummy
};

const mutationRslv = {
  ...bookMutationRslv,
  ...authorMutationRslv,
  ...userMutationRslv
};

const resolvers = {
  Query: queryRslv,
  Mutation: mutationRslv,
  Author: authorRslv
};

export default resolvers;
