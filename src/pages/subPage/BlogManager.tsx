import React, { useState, useEffect } from "react";
import { Table, Switch, Button, Form, Input } from "antd";
import { BlogModelType, BlogSearchDataType } from "../../type";
import { deleteResource, fetchData } from "../../fetch";
import SearchBar from "../../components/searchBar";
import dayjs from "dayjs";

const BlogCategory: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogModelType[]>([]);
  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async (query?: BlogSearchDataType) => {
    const { data } = await fetchData<BlogModelType[], BlogSearchDataType>("/admin/blogs", query);
    data && setBlogData(data);
  };

  const deleteBlog = async (record: BlogModelType) => {
    await deleteResource(`/blogs/${record.id}`);
    fetchBlogData();
  };

  const editBlog = (record: BlogModelType) => {
    console.log(record, "record");
    window.open(`/createBlog/${record.id}`, "_blank");
  };

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
      render: (value: number) => dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "更新日期",
      dataIndex: "updatedAt", // Changed from "publishDate" to "createdAt"
      key: "updatedAt", // Changed from "publishDate" to "createdAt"
      render: (value: number) => (value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "-"),
    },
    {
      title: "状态",
      dataIndex: "statusText",
      key: "statusText",
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
    },
    {
      title: "所属分类",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "置顶",
      dataIndex: "isPinned",
      key: "isPinned",
      render: (value: boolean) => (value ? "是" : "否"),
    },
    {
      title: "是否公开",
      dataIndex: "isPublic",
      key: "isPublic",
      render: (value: boolean) => (value ? "是" : "否"),
    },
    {
      title: "是否允许评论",
      dataIndex: "allowComments",
      key: "allowComments",
      render: (value: boolean) => (value ? "是" : "否"),
    },
    {
      title: "操作",
      key: "action",
      render: (record: BlogModelType) => (
        <span>
          <Button type="primary" onClick={() => editBlog(record)}>
            编辑
          </Button>
          <Button type="primary" danger className="ml-8" onClick={() => deleteBlog(record)}>
            删除
          </Button>
        </span>
      ),
    },
  ];

  const handlerSearch = (query: BlogSearchDataType | undefined) => {
    console.log("搜索");
    fetchBlogData(query);
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
              <Input placeholder="请输入ID" />
            </Form.Item>
            <Form.Item name="title" label="博客名称">
              <Input placeholder="请输入博客名称" />
            </Form.Item>
          </>
        }
      />
      <Table columns={columns} dataSource={blogData} />
    </div>
  );
};

export default BlogCategory;
