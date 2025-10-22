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

export default function ExamYears() {
  const { exam_years } = usePage().props; // recursive categories
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
      title: "ক্রমিক নং",
      key: "sn",
      width: 80,
      render: () => {
        serial += 1;
        return serial;
      },
    },
    {
      title: "পোস্টের নাম",
      dataIndex: "post_title",
      key: "post_title",
    },
    {
      title: "ইনস্টিটিউটের নাম",
      dataIndex: "institute_title",
      key: "institute_title",
    },
    {
      title: "সন",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "সম্মিলিত শিরোনাম বাংলা",
      dataIndex: "combined_title_bangla",
      key: "combined_title_bangla",
    },
    {
      title: "সম্মিলিত শিরোনাম ইংরেজি",
      dataIndex: "combined_title_english",
      key: "combined_title_english",
    },
    {
      title: "মন্তব্য",
      dataIndex: "comments",
      key: "comments",
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={route('admin.dashboard')}>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={route('admin.exam_years')}>Exam Years</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Categories Table */}
      <div className="container mx-auto p-4">
        <div className="w-full h-full flex justify-center items-center p-4">
          <Table
            scroll={{ x: "max-content" }}
            className="w-full"
            columns={columns}
            dataSource={exam_years}
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
