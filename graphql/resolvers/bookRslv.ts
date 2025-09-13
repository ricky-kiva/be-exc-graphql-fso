import { GraphQLError } from 'graphql';
import { AllBooksArgs } from './args-types/bookRslvArgs';
import Book, { BookDocument } from '../../db/schemas/Book';
import Author, { AuthorDocument } from '../../db/schemas/Author';

const bookQueryRslv = {
  allBooks: async (_: unknown, args: AllBooksArgs): Promise<BookDocument[]> => {
    const query: Record<string, unknown> = {};
  
    if (args.author) {
      const authors: AuthorDocument[] = await Author.find({ name: new RegExp(args.author, 'i')});

      if (authors.length === 0) return [];

      const authorIds = authors.map((a) => a._id);

      query.author = { $in: authorIds };
    }

    if (args.genre) {
      query.genres = {
        $elemMatch: {
          $regex: new RegExp(args.genre, 'i')
        } 
      };
    }

    return Book.find(query).populate('author');
  },
  bookCount: async (): Promise<number> => {
    return Book.countDocuments();
  }
};

const bookMutationRslv = {
  addBook: async (_: unknown, args: Omit<BookDocument, "id">): Promise<BookDocument> => {
    const existingBook = await Book.findOne({ title: new RegExp(args.title, 'i') });
    
    if (existingBook) {
      throw new GraphQLError(
        `Book with title "${args.title}" already exists`,
        { extensions: { code: 'BAD_USER_INPUT' } }
      );
    }

    let author = await Author.findOne({ name: args.author });

    if (!author) {
      author = new Author({ name: args.author });
      await author.save();
    }

    const newBook = new Book({
      title: args.title,
      published: args.published,
      author: author._id,
      genres: args.genres
    });

    await newBook.save();

    return newBook.populate('author');
  }
};

export {
  bookQueryRslv,
  bookMutationRslv
};
