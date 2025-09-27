import { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../api/books';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import BookForm from '../components/BookForm';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ genre: '', startDate: '', endDate: '' });

  useEffect(() => {
    fetchBooks();
  }, [currentPage, filters]);

  const fetchBooks = async () => {
    try {
      const { data } = await getBooks({ page: currentPage, limit: 10, ...filters });
      setBooks(data.books || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        fetchBooks();
      } catch (err) {
        console.error('Error deleting book:', err);
      }
    }
  };

  const handleEdit = (book) => {
    return book;
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          BookShelf – Quản lý Tủ sách Cá nhân
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Quản lý sách của bạn một cách dễ dàng và trực quan
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Thêm sách mới</h2>
        <BookForm onSuccess={fetchBooks} />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Bộ lọc</h2>
        <Filters onFilter={setFilters} />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Danh sách sách</h2>
        <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} onSuccess={fetchBooks} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default Home;