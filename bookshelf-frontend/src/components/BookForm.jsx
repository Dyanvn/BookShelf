import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../api/books';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BookForm = ({ book, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    readDate: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        readDate: new Date(book.readDate).toISOString().split('T')[0], // Format YYYY-MM-DD
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (value) => {
    setFormData({ ...formData, genre: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book) {
        await updateBook(book._id, formData);
      } else {
        await createBook(formData);
      }
      onSuccess();
      if (!book) {
        setFormData({ title: '', author: '', genre: '', readDate: '' }); // Reset form for add
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title (<span className="italic">Tên Sách</span>): </Label>
          <Input id="title" name="title" maxLength={50} value={formData.title} onChange={handleChange} required className="truncate" />
        </div>
        <div>
          <Label htmlFor="author">Author(Tên Tác Giả): </Label>
          <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="genre">Genre (Thể Loại)</Label>
          <Select onValueChange={handleGenreChange} value={formData.genre}>
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short Stories">Truyện ngắn</SelectItem>
              <SelectItem value="Novel">Tiểu thuyết</SelectItem>
              <SelectItem value="Poetry">Thơ</SelectItem>
              <SelectItem value="Science">Khoa học</SelectItem>
              <SelectItem value="History">Lịch sử</SelectItem>
              <SelectItem value="Self-help">Tâm lý / Kỹ năng sống</SelectItem>
              <SelectItem value="Business">Kinh doanh</SelectItem>
              <SelectItem value="Education">Học thuật</SelectItem>
              <SelectItem value="Comics">Truyện tranh</SelectItem>
              <SelectItem value="Other">Khác</SelectItem>
              
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="readDate">Ngày Đọc</Label>
          <Input id="readDate" name="readDate" type="date" value={formData.readDate} onChange={handleChange} required />
        </div>
      </div>
      <Button type="submit" className="mt-4">{book ? 'Cập Nhật' : 'Thêm Sách'}</Button>
    </form>
  );
};

export default BookForm;