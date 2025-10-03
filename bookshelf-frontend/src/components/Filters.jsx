// src/components/Filters.jsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';

const Filters = ({ onFilter }) => {
  const [genre, setGenre] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');

  const handleApply = () => {
    onFilter({ genre, startDate, endDate, search });
  };

  const handleReset = () => {
    setGenre('');
    setStartDate('');
    setEndDate('');
    setSearch('');
    onFilter({ genre: '', startDate: '', endDate: '', search: '' });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {/* Thể loại */}
      <div>
        <Label htmlFor="genre" className="text-[var(--foreground)] font-medium">Thể loại</Label>
        <Select onValueChange={setGenre} value={genre}>
          <SelectTrigger className="border-[var(--border)] focus:ring-2 focus:ring-[var(--ring)]">
            <SelectValue placeholder="Chọn thể loại" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--card)]">
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

      {/* Ngày bắt đầu */}
      <div>
        <Label htmlFor="startDate" className="text-[var(--foreground)] font-medium">Ngày bắt đầu</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border-[var(--border)] focus:ring-2 focus:ring-[var(--ring)]"
        />
      </div>

      {/* Ngày kết thúc */}
      <div>
        <Label htmlFor="endDate" className="text-[var(--foreground)] font-medium">Ngày kết thúc</Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border-[var(--border)] focus:ring-2 focus:ring-[var(--ring)]"
        />
      </div>

      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-[var(--foreground)] font-medium">Tên sách / Tác giả</Label>
        <Input
          id="search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Nhập tên sách hoặc tác giả"
          className="border-[var(--border)] focus:ring-2 focus:ring-[var(--ring)]"
        />
      </div>

      {/* Nút Apply & Reset */}
      <div className="flex gap-4 mt-4 sm:col-span-4">
        <Button
          onClick={handleApply}
          className="bg-[var(--primary)] hover:bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center"
        >
          <Filter className="w-4 h-4 mr-1" /> Áp dụng
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] flex items-center"
        >
          <X className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>
    </div>
  );
};

export default Filters;
