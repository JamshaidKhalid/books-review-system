import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/books.service';
import BookCard from '../components/BooksCard';
import ClipLoader from 'react-spinners/ClipLoader';
import Navbar from '../components/Navbar';
import { Book } from '../types';

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        setError("error");
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    getBooks();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color={"#4A90E2"} loading={loading} size={50} />
        </div>
      ) : error ? (
        <div className="container mx-auto p-4">Error: {error}</div>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Books</h1>
          <div className="flex flex-wrap justify-center">
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                coverImage={book.cover_image}
                title={book.title}
                author={book.author}
                publication_date={book.publication_date}
                genres={book.genres}
                reviews={book.reviews}
                price = {book.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
