"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Search,
  Download,
  Eye
} from "lucide-react";

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface TableAction {
  label: string;
  icon: React.ReactNode;
  onClick: (row: Record<string, unknown>) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export interface TableLayoutProps {
  title: string;
  description?: string;
  columns: TableColumn[];
  data: Record<string, unknown>[];
  actions?: TableAction[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  showExport?: boolean;
  onExport?: () => void;
  onSearch?: (query: string) => void;
  className?: string;
}

export function TableLayout({
  title,
  description,
  columns,
  data,
  actions = [],
  searchPlaceholder = "Cari...",
  showSearch = true,
  showExport = false,
  onExport,
  onSearch,
  className = "",
}: TableLayoutProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header - Only show if title is provided */}
      {title && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#C40503]">{title}</h2>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            )}
            {showExport && onExport && (
              <Button
                onClick={onExport}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Ekspor Data
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Search and Export - Show inline when no title */}
      {!title && (showSearch || showExport) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          )}
          {showExport && onExport && (
            <Button
              onClick={onExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Ekspor Data
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-16 text-center font-semibold text-gray-700">
                  No
                </TableHead>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className="font-semibold text-gray-700"
                  >
                    {column.label}
                  </TableHead>
                ))}
                {actions.length > 0 && (
                  <TableHead className="w-20 text-center font-semibold text-gray-700">
                    Aksi
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions.length > 0 ? 2 : 1)}
                    className="text-center py-8 text-gray-500"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((row, index) => (
                  <TableRow
                    key={(row.id as string) || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-center text-sm text-gray-600">
                      {index + 1}
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.key} className="text-sm">
                        {column.render
                          ? column.render(row[column.key], row)
                          : String(row[column.key] || '')}
                      </TableCell>
                    ))}
                    {actions.length > 0 && (
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {actions.map((action, actionIndex) => (
                              <DropdownMenuItem
                                key={actionIndex}
                                onClick={() => action.onClick(row)}
                                className={`flex items-center gap-2 ${
                                  action.variant === "destructive"
                                    ? "text-red-600 focus:text-red-600"
                                    : ""
                                }`}
                              >
                                {action.icon}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Menampilkan {filteredData.length} dari {data.length} data
        </span>
      </div>
    </div>
  );
}

// Predefined action buttons for common operations
export const commonActions = {
  edit: (onClick: (row: Record<string, unknown>) => void): TableAction => ({
    label: "Edit",
    icon: <Edit className="h-4 w-4" />,
    onClick,
    variant: "default",
  }),
  delete: (onClick: (row: Record<string, unknown>) => void): TableAction => ({
    label: "Hapus",
    icon: <Trash2 className="h-4 w-4" />,
    onClick,
    variant: "destructive",
  }),
  view: (onClick: (row: Record<string, unknown>) => void): TableAction => ({
    label: "Lihat",
    icon: <Eye className="h-4 w-4" />,
    onClick,
    variant: "outline",
  }),
  download: (onClick: (row: Record<string, unknown>) => void): TableAction => ({
    label: "Download",
    icon: <Download className="h-4 w-4" />,
    onClick,
    variant: "outline",
  }),
};
