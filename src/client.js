import * as fs from 'node:fs';
import { parse } from 'csv-parse';

(async () => {
 const parser = fs.ReadStream('src/arq.csv').pipe(parse());

 let task = {};
 let i = 0;

 for await (const line of parser) {
  if (i == 0) {
    i++;
  } else {
      task = {
        title: line[0],
        description: line[1],
      };
      await fetch('http://localhost:3333/tasks', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
      });
    }
  }
})();