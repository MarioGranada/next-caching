// Both cache from 'react' and unstable_cache from 'next/cache' helps you to manage the cache by your own and allows you to revalidated it on demand (in a more imperative way).
// They both cache the result of the given function.
// The only difference is that 'cache' from react returns a synchronous function whilst unstable_cache returns an async function, so for the latter you need to use async/await strategy to use it.
// They can be used separately, here we use it in conjunction (combined) for learning purposes.
import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';
import sql from 'better-sqlite3';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY,
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// React cache function caches the result of the function and stores it for every call in the function. So it is executed twice or as many times it needs but the result is stored in the cache and so retuned as a return value.
// This solves the function deduplication.
export const getMessages = nextCache(
  cache(function getMessages() {
    console.log('Fetching messages from db');
    return db.prepare('SELECT * FROM messages').all();
  }),
  ['messages'],
  {
    tags: ['msg'],
  }
);
