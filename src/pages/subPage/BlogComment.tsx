import React, { useState } from "react";
import { Table, Button, Form, Input } from "antd"; // Importing Ant Design components for the table
import SearchBar from "../../components/searchBar"; // Assuming SearchBar is the custom search component

const BlogComment: React.FC = () => {
  const commentsData = [
    {
      key: 1,
      createdAt: "2023-01-01",
      blogId: 101,
      status: "Approved",
      user: "User1",
      email: "user1@example.com",
      url: "http://example.com/comment1",
      content: "This is a comment.",
    },
    {
      key: 2,
      createdAt: "2023-02-01",
      blogId: 102,
      status: "Pending",
      user: "User2",
      email: "user2@example.com",
      url: "http://example.com/comment2",
      content: "This is another comment.",
    },
    // Add more comment data as needed
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "博客ID",
      dataIndex: "blogId",
      key: "blogId",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "用户",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => console.log("Editing comment:", record.key)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => console.log("Deleting comment:", record.key)}>
            删除
          </Button>
        </>
      ),
    },
  ];
  const handlerAction = () => {
    console.log("搜索");
  };
  const onSearch = () => {
    console.log("搜索");
  };

  return (
    <div>
      <SearchBar
        handlerAction={handlerAction}
        onSearch={onSearch}
        showRightButton={false}
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
      <Table dataSource={commentsData} columns={columns} rowKey="key" />
    </div>
  );
};

export default BlogComment;
