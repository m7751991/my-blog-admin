import React, { useState, useEffect } from "react";
import { Table, Switch, Button, Form, Input } from "antd";
import { BlogModelType } from "../../type";
import { fetchData } from "../../fetch";
import SearchBar from "../../components/searchBar";

const BlogCategory: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogModelType[]>([]);
  useEffect(() => {
    const fetchBlogData = async () => {
      const { data } = await fetchData<BlogModelType[], undefined>("/blogs");
      data && setBlogData(data);
    };
    fetchBlogData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id", // Changed from "key" to "id"
      key: "id", // Changed from "key" to "id"
    },
    {
      title: "博客名称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "发布日期",
      dataIndex: "createdAt", // Changed from "publishDate" to "createdAt"
      key: "createdAt", // Changed from "publishDate" to "createdAt"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => tags?.join(", "),
    },
    {
      title: "所属分类",
      dataIndex: "categoryId", // Changed from "category" to "categoryId"
      key: "categoryId", // Changed from "category" to "categoryId"
    },
    {
      title: "置顶",
      dataIndex: "isPinned",
      key: "isPinned",
      render: (isPinned: boolean) => <Switch checked={isPinned} />,
    },
    {
      title: "热门",
      dataIndex: "isPopular",
      key: "isPopular",
      render: (isPopular: boolean) => <Switch checked={isPopular} />,
    },
    {
      title: "推荐",
      dataIndex: "isRecommended",
      key: "isRecommended",
      render: (isRecommended: boolean) => <Switch checked={isRecommended} />,
    },
    {
      title: "访问模式",
      dataIndex: "accessMode",
      key: "accessMode",
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
  return (
    <div>
      <SearchBar
        handlerAction={() => {
          window.open("/createBlog", "_blank");
        }}
        onSearch={handlerSearch}
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
    </div>
  );
};

export default BlogCategory;
