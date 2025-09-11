import authors from '../../data/authors';
import books from '../../data/books';

const dummy = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};

const bookCount = (): number => {
  return books.length;
};

const authorCount = (): number => {
  return authors.length;
};

const queryRsv = {
  dummy,
  bookCount,
  authorCount
};

export default queryRsv;
