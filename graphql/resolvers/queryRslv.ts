import { authorQueryRslv } from './authorRslv';
import { bookQueryRslv } from './bookRslv';

const dummy = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};

const queryRslv = {
  ...authorQueryRslv,
  ...bookQueryRslv,
  dummy
};

export default queryRslv;
