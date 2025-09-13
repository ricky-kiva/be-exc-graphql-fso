import { GraphQLError } from 'graphql';
import { AddBookArgs, AllBooksArgs } from './args-types/bookRslvArgs';
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
  addBook: async (_: unknown, args: AddBookArgs): Promise<BookDocument> => {
    if (args.title.length < 5) {
      throw new GraphQLError('Book title must be at least 5 characters long', {
        extensions: { code: 'BAD_USER_INPUT' }
      });
    }

    if (args.author.length < 4) {
      throw new GraphQLError('Author name must be at least 4 characters long', {
        extensions: { code: 'BAD_USER_INPUT' }
      });
    }

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
