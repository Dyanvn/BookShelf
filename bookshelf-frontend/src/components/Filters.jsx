import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Filters = ({ onFilter }) => {
  const [genre, setGenre] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApply = () => {
    onFilter({ genre, startDate, endDate });
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl mb-2">Filters</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="genre">Genre</Label>
          <Select onValueChange={setGenre} value={genre}>
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Fiction">Fiction</SelectItem>
              <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
              <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
              <SelectItem value="Mystery">Mystery</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
      </div>
      <Button onClick={handleApply} className="mt-4">Apply Filters</Button>
    </div>
  );
};

export default Filters;