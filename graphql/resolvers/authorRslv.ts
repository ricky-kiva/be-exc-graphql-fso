import authors from '../../data/authors';
import books from '../../data/books';
import { Author } from '../../types/Author';

const authorRslv = {
  bookCount(root: Author): number {
    return books.filter((book) => (book.author === root.name)).length;
  }
};

const authorQueryRslv = {
  allAuthors(): Author[] {
    return authors;
  },
  authorCount(): number {
    return authors.length;
  }
};

export {
  authorRslv,
  authorQueryRslv
};
