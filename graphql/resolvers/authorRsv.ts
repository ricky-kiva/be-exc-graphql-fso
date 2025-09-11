import books from '../../data/books';
import { Author } from '../../types/Author';

const bookCount = (root: Author) => {
  return books.filter((book) => (book.author === root.name)).length;
};

const authorRsv = {
  bookCount
};

export default authorRsv;
