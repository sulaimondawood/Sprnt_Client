"use client";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  totalPages: number;
};

export const PaginationComponent = ({ totalPages }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "0");
  const pageSize = searchParams.get("pageSize") || "25";

  // Update URL params without refresh
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    navigate(`${pathname}?${params.toString()}`);
  };

  const updatePageSize = (value: string) => {
    // reset page to 1 when size changes
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", value);
    params.set("page", "1");
    navigate(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="border-t border-t-border lg:px-10 flex flex-wrap items-center justify-between">
      <Pagination className="my-5 lg:my-10 justify-start">
        <PaginationContent className="text-body flex-wrap gap-0">
          {/* PREVIOUS BUTTON */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) goToPage(currentPage - 1);
              }}
            />
          </PaginationItem>

          {/* PAGE NUMBERS */}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {/* NEXT BUTTON */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) goToPage(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-text text-nowrap">Rows per page:</p>

        <Select value={pageSize} onValueChange={updatePageSize}>
          <SelectTrigger className="w-[80px] ring-0 focus-visible:ring-0 outline-0">
            <SelectValue placeholder="25" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
