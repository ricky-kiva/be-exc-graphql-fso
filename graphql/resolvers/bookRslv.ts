import books from '../../data/books';
import { Book } from '../../types/Book';
import { AllBooksArgs } from './args-types/queryRslvArgs';

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

export {
  bookQueryRslv
};
