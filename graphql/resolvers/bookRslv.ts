import { GraphQLError } from 'graphql';
import books from '../../data/books';
import { Book } from '../../types/Book';
import { AllBooksArgs } from './args-types/bookRslvArgs';
import { v1 } from 'uuid';
import authors from '../../data/authors';
import { Author } from '../../types/Author';

const bookQueryRslv = {
  allBooks(_: unknown, args: AllBooksArgs): Book[] {
    let filteredBooks = [...books];
  
    if (args.author) {
      const search = args.author.toLowerCase();
      filteredBooks = filteredBooks.filter((b) => b.author.toLowerCase().includes(search));
    }

    if (args.genre) {
      const search = args.genre.toLowerCase();
      filteredBooks = filteredBooks.filter((b) => b.genres.some((g) => g.toLowerCase() === search));
    }

    return filteredBooks;
  },
  bookCount(): number {
    return books.length;
  }
};

const bookMutationRslv = {
  addBook(_: unknown, args: Omit<Book, "id">): Book {
    if (books.some((b) => b.title.toLowerCase().trim() === args.title.toLowerCase().trim())) {
      throw new GraphQLError(
        `Book with title "${args.title}" already exists`,
        { extensions: { code: 'BAD_USER_INPUT' } }
      );
    }

    if (!(authors.some((a) => a.name.toLowerCase().trim() === args.author.toLowerCase().trim()))) {
      const newAuthor: Author = {
        id: v1(),
        name: args.author
      };

      authors.push(newAuthor);
    }

    const newBook: Book = {
      id: v1(),
      title: args.title,
      published: args.published,
      author: args.author,
      genres: args.genres
    };

    books.push(newBook);

    return newBook;
  }
};

export {
  bookQueryRslv,
  bookMutationRslv
};
