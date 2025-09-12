import authors from '../../data/authors';
import books from '../../data/books';
import { Author } from '../../types/Author';
import { Book } from '../../types/Book';
import { AllBooksArgs } from './args-types/queryRsvArgs';

const allAuthors = (): Author[] => {
  return authors;
};

const allBooks = (_: unknown, args: AllBooksArgs): Book[] => {
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
};

const authorCount = (): number => {
  return authors.length;
};

const bookCount = (): number => {
  return books.length;
};

const dummy = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};

const queryRsv = {
  allAuthors,
  allBooks,
  authorCount,
  bookCount,
  dummy,
};

export default queryRsv;
