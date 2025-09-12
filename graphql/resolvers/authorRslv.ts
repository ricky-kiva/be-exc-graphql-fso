import { GraphQLError } from 'graphql';
import authors from '../../data/authors';
import books from '../../data/books';
import { Author } from '../../types/Author';
import { EditAuthorArgs } from './args-types/authorRslvArgs';

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

const authorMutationRslv = {
  editAuthor(_: unknown, args: EditAuthorArgs): Author {
    const author = authors.find(
      (a) => a.name.toLowerCase() === args.name.toLowerCase()
    );

    if (!author) {
      throw new GraphQLError(
        `Author with name "${args.name}" not found`,
        { extensions: { code: 'BAD_USER_INPUT' } }
      );
    }

    author.born = args.born;  
  
    return author;
  }
};

export {
  authorRslv,
  authorQueryRslv,
  authorMutationRslv
};
