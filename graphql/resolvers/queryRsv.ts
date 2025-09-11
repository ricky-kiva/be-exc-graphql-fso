import authors from '../../data/authors';
import books from '../../data/books';
import { Author } from '../../types/Author';
import { Book } from '../../types/Book';

const allAuthors = (): Author[] => {
  return authors;
};

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
  allAuthors,
  allBooks,
  authorCount,
  bookCount,
  dummy,
};

export default queryRsv;
