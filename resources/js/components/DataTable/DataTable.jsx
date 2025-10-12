import React, { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
}from "@/components/ui/table"

export default function DataTable({ columns, data }) {
  const [filter, setFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filter,
    },
    onGlobalFilterChange: setFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm">
      {/* 🔍 Search Bar */}
      <div className="flex items-center justify-between mb-3">
        <input
          value={filter ?? ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-md w-60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-700"
        />
      </div>

      {/* 📋 Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-gray-600 dark:text-gray-300"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-gray-800 dark:text-gray-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-6 text-gray-500 dark:text-gray-400"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 📑 Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="space-x-2">
          <button
            className="px-3 py-1 border rounded text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}