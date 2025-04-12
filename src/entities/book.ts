export type Book = {
  [x: string]: string
  id: string
  name: string
  year: string
  author: string
  genre?: string
}

export type BookWithouID = Omit<Book, 'id'>

export function bookFactory(): Book {
  return {
    id: crypto.randomUUID(),
    name: '',
    year: '',
    author: '',
    genre: '',
  }
}
