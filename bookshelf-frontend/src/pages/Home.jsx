import { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../api/books';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';
import BookForm from '../components/BookForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const Home = () => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 filters mới: genre + startDate + search
  const [filters, setFilters] = useState({ genre: '', startDate: '', search: '' });

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
    if (window.confirm('Bạn có chắc muốn xóa cuốn sách này?')) {
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
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          BookShelf – Quản lý Tủ sách Cá nhân
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Quản lý sách của bạn một cách dễ dàng và trực quan
        </p>
        <div className="mt-4">
          <Link to="/stats">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
              Xem biểu đồ thống kê
            </Button>
          </Link>
        </div>
      </div>

      {/* Form thêm sách */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Thêm sách mới</h2>
        <BookForm onSuccess={fetchBooks} />
      </div>

      {/* Bộ lọc */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Bộ lọc</h2>
        <Filters onFilter={setFilters} />
      </div>

      {/* Danh sách sách */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Danh sách sách</h2>
        <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} onSuccess={fetchBooks} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default Home;
