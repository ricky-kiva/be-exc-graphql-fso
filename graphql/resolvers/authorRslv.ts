import { GraphQLError } from 'graphql';
import { EditAuthorArgs } from './args-types/authorRslvArgs';
import Author, { AuthorDocument } from '../../db/schemas/Author';
import Book from '../../db/schemas/Book';

const authorRslv = {
  bookCount: async (root: AuthorDocument): Promise<number> => {
    return Book.countDocuments({ author: root._id });
  }
};

const authorQueryRslv = {
  allAuthors: async (): Promise<AuthorDocument[]> => {
    return Author.find({});
  },
  authorCount: async (): Promise<number> => {
    return Author.countDocuments({});
  }
};

const authorMutationRslv = {
  editAuthor: async (_: unknown, args: EditAuthorArgs): Promise<AuthorDocument> => {
    const author: (AuthorDocument | null) = await Author.findOne({
      name: new RegExp(`^${args.name}$`, 'i')
    });

    if (!author) {
      throw new GraphQLError(
        `Author with name "${args.name}" not found`,
        { extensions: { code: 'BAD_USER_INPUT' } }
      );
    }

    author.born = args.born;

    await author.save();
  
    return author;
  }
};

export {
  authorRslv,
  authorQueryRslv,
  authorMutationRslv
};
