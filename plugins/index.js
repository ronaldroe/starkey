import { readdirSync } from 'fs';

const dirContents = readdirSync('./', { withFileTypes: true });

const { directories, files } = dirContents.reduce((acc, cur) => {
  if (cur.isDirectory()) {
    return ({
      ...acc,
      directories: [ ...acc.directories, cur.name]
    });
  }

  return ({
    ...acc,
    files: [ ...acc.files, cur.name]
  });
}, {
  directories: [],
  files: []
});

console.log(directories, files);