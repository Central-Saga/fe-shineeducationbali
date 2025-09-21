"use client";

import React, { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TableLayoutProps<T> {
  // Header props
  title: string;
  description?: string;
  headerActions?: Array<{
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: ReactNode;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  }>;

  // Data props
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;

  // Search and filter props
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  filters?: Array<{
    key: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
  }>;

  // Pagination props
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];

  // Statistics props
  stats?: Array<{
    title: string;
    value: string | number;
    description?: string;
    icon?: ReactNode;
    color?: string;
    bgColor?: string;
  }>;

  // Additional props
  showStats?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  className?: string;
}

export function TableLayout<T>({
  title,
  description,
  headerActions = [],
  data,
  columns,
  loading = false,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  stats = [],
  showStats = true,
  showSearch = true,
  showFilters = true,
  showPagination = true,
  className = "",
}: TableLayoutProps<T>) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Statistics Cards */}
      {showStats && stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md">
              <div className={`h-1 w-full ${stat.color || "bg-[#C40001]"}`}></div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  {stat.description && (
                    <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                      <span className={`inline-block h-2 w-2 rounded-full ${stat.color || "bg-[#C40001]"}`}></span>
                      {stat.description}
                    </div>
                  )}
                </div>
                {stat.icon && (
                  <div className={`p-3 rounded-full ${stat.bgColor || "bg-red-50"}`}>
                    {stat.icon}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Main Table Section */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="h-1 w-full bg-[#C40001]"></div>
        
        {/* Header */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#C40001]">{title}</h2>
              {description && (
                <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C40001]"></span>
                  {description}
                </div>
              )}
            </div>
            
            {/* Header Actions */}
            {headerActions.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {headerActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    onClick={action.onClick}
                    className={action.variant === "default" ? "bg-[#C40503] hover:bg-[#A30402]" : ""}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Search and Filters */}
          {(showSearch || showFilters) && (
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              {showSearch && (
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                  />
                </div>
              )}

              {/* Filters */}
              {showFilters && filters.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {filters.map((filter) => (
                    <Select
                      key={filter.key}
                      value={filter.value}
                      onValueChange={filter.onChange}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder={filter.label} />
                      </SelectTrigger>
                      <SelectContent>
                        {filter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Table Content */}
        <div className="px-6 pb-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C40503]"></div>
            </div>
          ) : (
            <>
              <DataTable columns={columns} data={data} />
              
              {/* Pagination */}
              {showPagination && totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      Menampilkan {startIndex + 1} sampai {Math.min(endIndex, totalItems)} dari {totalItems} data
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Tampilkan:</span>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          onItemsPerPageChange(Number(value));
                          onPageChange(1);
                        }}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {itemsPerPageOptions.map((option) => (
                            <SelectItem key={option} value={option.toString()}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(page)}
                            className={
                              currentPage === page
                                ? "bg-[#C40001] hover:bg-[#a30300] text-white"
                                : "text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                            }
                          >
                            {page}
                          </Button>
                        );
                      })}
                      
                      {totalPages > 5 && (
                        <>
                          <span className="text-gray-500">...</span>
                          <Button
                            variant={currentPage === totalPages ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(totalPages)}
                            className={
                              currentPage === totalPages
                                ? "bg-[#C40001] hover:bg-[#a30300] text-white"
                                : "text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                            }
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default TableLayout;
