import React, { useState, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"

export default function DataTable({
  columns,
  data,
  total,
  pageIndex,
  pageSize,
  onPaginationChange,
  onSortingChange,
  onGlobalFilterChange,
}) {
  const [filter, setFilter] = useState("")
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      globalFilter: filter,
    },
    manualPagination: true, // server-side
    manualSorting: true, // server-side
    manualFiltering: true, // server-side
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater
      setSorting(newSorting)
      if (newSorting.length) {
        onSortingChange(newSorting[0].id, newSorting[0].desc ? "desc" : "asc")
      } else {
        onSortingChange(null, null)
      }
    },
    onPaginationChange: (updater) => {
      const newState = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater
      onPaginationChange(newState.pageIndex, newState.pageSize)
    },
    onGlobalFilterChange: (value) => {
      setFilter(value)
      onGlobalFilterChange?.(value)
    },
    getCoreRowModel: getCoreRowModel(),
  })

  // Search input debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      onGlobalFilterChange?.(filter)
    }, 300)
    return () => clearTimeout(timeout)
  }, [filter])

  return (
    <div className="p-4 border rounded-xl bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm">
      {/* 🔍 Search Bar */}
      <div className="flex items-center justify-between mb-3">
        <input
          value={filter}
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
              {headerGroup.headers.map((header) => {
                const sortingState = sorting.find((s) => s.id === header.id)
                const sortArrow = sortingState ? (sortingState.desc ? " 🔽" : " 🔼") : ""
                return (
                  <TableHead
                    key={header.id}
                    className="text-gray-600 dark:text-gray-300 cursor-pointer select-none"
                    onClick={() => {
                      const isAsc = sortingState?.desc === false
                      const newSorting = [{ id: header.id, desc: !isAsc }]
                      setSorting(newSorting)
                      onSortingChange(header.id, !isAsc ? "desc" : "asc")
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {sortArrow}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
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
          Page {pageIndex + 1} of {Math.ceil(total / pageSize)}
        </p>
        <div className="space-x-2">
          <button
            className="px-3 py-1 border rounded text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={() => onPaginationChange(pageIndex - 1, pageSize)}
            disabled={pageIndex === 0}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded text-gray-700 dark:text-gray-200 border-gray-300 dark:border-neutral-700 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={() => onPaginationChange(pageIndex + 1, pageSize)}
            disabled={(pageIndex + 1) * pageSize >= total}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
