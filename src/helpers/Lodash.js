// lodash doesn't support destructured imports, so we'll just import the whole thing once here,
// and export only what we need.
import lodash from 'lodash';

const {
  merge,
  intersection
} = lodash;

export {
  merge,
  intersection
};
