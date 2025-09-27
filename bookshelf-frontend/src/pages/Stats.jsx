import { useState, useEffect } from 'react';
import { getStats } from '../api/books';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Stats = () => {
  const [booksRead, setBooksRead] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, [month, year]);

  const fetchStats = async () => {
    const { data } = await getStats({ month, year });
    setBooksRead(data.booksRead);
    // Để biểu đồ, giả sử chỉ một cột cho tháng hiện tại
    setChartData([{ name: `Month ${month}/${year}`, books: data.booksRead }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Thống kê</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="month">Tháng</Label>
          <Input id="month" type="number" value={month} onChange={e => setMonth(e.target.value)} min="1" max="12" />
        </div>
        <div>
          <Label htmlFor="year">Năm</Label>
          <Input id="year" type="number" value={year} onChange={e => setYear(e.target.value)} />
        </div>
      </div>
      <Button onClick={fetchStats}>Áp dụng</Button>
      <p className="mt-4">Số sách đã đọc trong tháng: {booksRead}</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="books" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Stats;