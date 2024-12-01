import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Button from "@/components/Button/Button";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
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
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum pages to display
    const ellipsis = <MoreHorizontal className="mx-1 h-4 w-4" />;
  
    if (totalPages <= maxVisiblePages) {
      // If total pages are within the max visible range
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      if (currentPage <= 2) {
        // Current page is at the start
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(ellipsis);
        pageNumbers.push(renderPageButton(totalPages));
      } else if (currentPage >= totalPages - 1) {
        // Current page is at the end
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(ellipsis);
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(renderPageButton(i));
        }
      } else {
        // Current page is in the middle
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(ellipsis);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(ellipsis);
        pageNumbers.push(renderPageButton(totalPages));
      }
    }
  
    return pageNumbers;
  };

  const renderPageButton = (pageNumber: number) => (
    <Button
      key={pageNumber}
      variant={pageNumber === currentPage ? "primary" : "secondary"}
      onClick={() => onPageChange(pageNumber)}
      className="mx-1 w-8"
    >
      {pageNumber}
    </Button>
  );

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>
      {renderPageNumbers()}
      <Button
        variant="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );
};
