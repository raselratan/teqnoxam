import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePage } from "@inertiajs/react";
import { Table, Button, Popconfirm, Space } from "antd";
import { CaretRightOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { route } from "ziggy-js";

export default function Categories() {
  const { categoris } = usePage().props; // recursive categories

  // Serial counter
  let serial = 0;

  const handleEdit = (record) => {
    console.log("Edit", record);
    // Redirect to edit page or open modal
    // e.g., route('admin.categories.edit', record.id)
  };

  const handleDelete = (record) => {
    console.log("Delete", record);
    // Call delete API
  };

  const columns = [
    {
      title: "",
      key: "expand",
      width: 50,
      render: () => null, // expand button handled by expandIcon
    },
    {
      title: "SL No",
      key: "sn",
      width: 80,
      render: () => {
        serial += 1;
        return serial;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Creator",
      key: "name",
      render: (value) => {
        return value?.creator?.name;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          > </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} style={{ color: "red" }} size="small"></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Manage expanded rows
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const onExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([...expandedRowKeys, record.id]);
    } else {
      setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record.id));
    }
  };

  // Reset serial on each render
  serial = 0;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b-1 w-full h-12">
        <div className="w-full h-full px-4 flex justify-start items-center">
          <Breadcrumb
            items={[
              { title: <a href={route("admin.dashboard")}>Dashboard</a> },
              { title: <a href={route("admin.categories")}>Categories</a> },
            ]}
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={route("admin.dashboard")}>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={route("admin.categories")}>Categories</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Categories Table */}
      <div className="container mx-auto p-4">
        <div className="w-full h-full flex justify-center items-center p-4">
          <Table
            className="w-full"
            columns={columns}
            dataSource={categoris}
            rowKey="id"
            pagination={false}
            expandable={{
              expandedRowKeys: expandedRowKeys,
              onExpand: onExpand,
              childrenColumnName: "children",
              expandIcon: ({ expanded, onExpand, record }) => {
                if (!record.children || record.children.length === 0) return null;
                return (
                  <CaretRightOutlined
                    rotate={expanded ? 90 : 0}
                    onClick={(e) => onExpand(record, e)}
                    style={{ cursor: "pointer" }}
                  />
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
