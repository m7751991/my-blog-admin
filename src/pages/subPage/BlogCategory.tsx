// 博客分类管理页面
import React, { useState } from "react";
import { Table, Button, Form, Input } from "antd";
import { Blog } from "../../type";
import SearchBar from "../../components/searchBar";
import AddBlogCategory from "../../components/AddBlogCategory";

const BlogCategory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const blogData: Blog[] = [
    {
      key: 1,
      name: "Blog Post 1",
      publishDate: "2023-01-01",
      status: "Published",
      tags: ["React", "JavaScript"],
      category: "Tech",
      isPinned: true,
      isPopular: false,
      isRecommended: true,
      accessMode: "Public",
    },
    {
      key: 2,
      name: "Blog Post 2",
      publishDate: "2023-02-01",
      status: "Draft",
      tags: ["CSS", "Design"],
      category: "Design",
      isPinned: false,
      isPopular: true,
      isRecommended: false,
      accessMode: "Private",
    },
    // Add more blog data as needed
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "类别名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "发布日期",
      dataIndex: "publishDate",
      key: "publishDate",
    },
    {
      title: "博客数目",
      dataIndex: "blogCount",
      key: "blogCount",
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <span>
          <Button type="primary">编辑</Button>
          <Button type="primary" danger className="ml-8">
            删除
          </Button>
        </span>
      ),
    },
  ];
  const handlerSearch = () => {
    console.log("搜索");
  };
  const openBlogCategory = () => {
    setOpen(true);
  };
  const onSubmit = () => {};
  const closeBlogCategory = () => {
    setOpen(false);
  };
  return (
    <div>
      <SearchBar
        handlerAction={openBlogCategory}
        onSearch={() => handlerSearch()}
        Component={
          <>
            <Form.Item name="id" label="ID">
              <Input placeholder="Search by ID" />
            </Form.Item>
            <Form.Item name="blogName" label="博客名称">
              <Input placeholder="Search by Blog Name" />
            </Form.Item>
          </>
        }
      />
      <Table columns={columns} dataSource={blogData} />
      <AddBlogCategory open={open} onSubmit={onSubmit} onClose={closeBlogCategory} />
    </div>
  );
};

export default BlogCategory;
