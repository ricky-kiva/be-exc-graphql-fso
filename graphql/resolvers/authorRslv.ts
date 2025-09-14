import { EditAuthorArgs } from './args-types/authorRslvArgs';
import Author, { AuthorDocument } from '../../db/schemas/Author';
import Book from '../../db/schemas/Book';
import { throwBadUserInput } from '../exception/exception';

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
    if (args.name.length < 4) throwBadUserInput("Author name must be at least 4 characters long");

    const author: (AuthorDocument | null) = await Author.findOne({
      name: new RegExp(`^${args.name}$`, 'i')
    });

    if (!author) throwBadUserInput(`Author with name "${args.name}" not found`);   

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
