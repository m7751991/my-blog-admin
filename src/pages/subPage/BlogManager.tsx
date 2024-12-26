import React from "react";
import { Table, Switch, Button, Form, Input } from "antd";
import { Blog } from "../../type";

import SearchBar from "../../components/searchBar";

const BlogCategory: React.FC = () => {
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
      title: "博客名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "发布日期",
      dataIndex: "publishDate",
      key: "publishDate",
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
      render: (tags: string[]) => tags.join(", "),
    },
    {
      title: "所属分类",
      dataIndex: "category",
      key: "category",
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
    </div>
  );
};

export default BlogCategory;
