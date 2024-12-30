// 博客分类管理页面
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input } from "antd";
import { BlogModelType, CategoryType, CategorySearchDataType } from "../../type";
import SearchBar from "../../components/searchBar";
import AddBlogCategory from "../../components/AddBlogCategory";
import { createResource, fetchData, updateResource, deleteResource } from "../../fetch";
import dayjs from "dayjs";

const BlogCategory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [blogData, setBlogData] = useState<BlogModelType[]>([]);
  const [defaultValues, setDefaultValues] = useState<CategoryType | undefined>(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (searchData?: CategorySearchDataType) => {
    const { data } = await fetchData<BlogModelType[], CategorySearchDataType>("/category", searchData);
    if (data) {
      setBlogData(data);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "类别名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => {
        return text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-";
      },
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-"),
    },
    {
      title: "博客数目",
      dataIndex: "blogCount",
      key: "blogCount",
    },
    {
      title: "操作",
      key: "action",
      render: (text: string, record: any) => (
        <span>
          <Button type="primary" onClick={() => edit(record)}>
            编辑
          </Button>
          <Button type="primary" danger className="ml-8" onClick={() => deleteAction(record)}>
            删除
          </Button>
        </span>
      ),
    },
  ];
  const edit = (record: any) => {
    console.log("编辑", record);
    setOpen(true);
    setDefaultValues(record);
  };
  const deleteAction = async (record: any) => {
    console.log("删除", record);
    const { data, status } = await deleteResource(`/category/${record.id}`);
    if (status) {
      getData();
    }
  };
  const handlerSearch = (searchData?: CategorySearchDataType) => {
    console.log("搜索", searchData);
    getData(searchData);
  };
  const openBlogCategory = () => {
    setOpen(true);
  };
  const onSubmit = async (category: CategoryType) => {
    console.log(category, "category");
    if (defaultValues) {
      updateResource(`/category/${defaultValues.id}`, category);
    } else {
      createResource("/category", category);
    }
    getData();
  };
  const closeBlogCategory = () => {
    setOpen(false);
    setDefaultValues(undefined);
  };
  return (
    <div>
      <SearchBar
        handlerAction={openBlogCategory}
        onSearch={handlerSearch}
        Component={
          <>
            <Form.Item name="id" label="ID">
              <Input placeholder="Search by ID" />
            </Form.Item>
            <Form.Item name="name" label="类别名称">
              <Input placeholder="Search by Blog Name" />
            </Form.Item>
          </>
        }
      />
      <Table columns={columns} dataSource={blogData} />
      <AddBlogCategory open={open} onSubmit={onSubmit} defaultValues={defaultValues} onClose={closeBlogCategory} />
    </div>
  );
};

export default BlogCategory;
