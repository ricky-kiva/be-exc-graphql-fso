import authors from '../../data/authors';
import books from '../../data/books';
import { Book } from '../../types/Book';

const allBooks = (): Book[] => {
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
  allBooks,
  authorCount,
  bookCount,
  dummy,
};

export default queryRsv;
