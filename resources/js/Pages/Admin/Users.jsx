import React from "react"

import DataTable from "@/components/DataTable/DataTable"

export default function Dashboard() {
const columns = [
    {
      header: "ID",
      accessorKey: "id",
      cell: (info) => info.getValue(),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => info.getValue(),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: (info) => info.getValue(),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (info) => info.getValue(),
    },
  ]

  const data = [
    { id: 1, name: "Rasel Mahmud", email: "rasel@example.com", role: "Admin" },
    { id: 2, name: "Tanvir Ahmed", email: "tanvir@example.com", role: "User" },
    { id: 3, name: "Sabbir Khan", email: "sabbir@example.com", role: "Manager" },
    { id: 4, name: "Rahim Uddin", email: "rahim@example.com", role: "User" },
  ]

  return (
    <div>
        <DataTable columns={columns} data={data} />
    </div>
  )
}
