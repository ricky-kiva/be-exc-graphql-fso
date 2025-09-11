import authors from '../../data/authors';
import books from '../../data/books';
import { Author } from '../../types/Author';
import { Book } from '../../types/Book';
import { AllBooksArgs } from './args-types/queryRsvArgs';

const allAuthors = (): Author[] => {
  return authors;
};

const allBooks = (_: unknown, args: AllBooksArgs): Book[] => {
  if (args.author) {
    const search = args.author.toLowerCase();
    return books.filter((book) => book.author.toLowerCase().includes(search));
  }

  return books;
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
