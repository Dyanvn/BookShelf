import { Button } from '@/components/ui/button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Hiển thị tối đa 5 số trang
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? 'default' : 'outline'}
          onClick={() => onPageChange(i)}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="mx-1"
      >
        Previous
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="mx-1"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;