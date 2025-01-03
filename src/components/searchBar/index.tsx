import React, { useState } from "react";
import { Form, Input, Button } from "antd";
interface PropsType {
  handlerAction: () => void;
  onSearch: () => void;
  Component: React.ReactNode;
}

const SearchBar: React.FC<PropsType> = ({ handlerAction, onSearch, Component }) => {
  const [form] = Form.useForm();

  const handleSearchSubmit = (values: { id: string; blogName: string }) => {
    console.log("Search values:", values);
    onSearch();
  };

  const handleReset = () => {
    form.resetFields();
    onSearch();
  };

  const action = () => {
    handlerAction();
  };
  return (
    <Form form={form} onFinish={handleSearchSubmit} layout="inline" className="mb-16">
      {Component}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button type="default" className="ml-8" onClick={handleReset}>
          重置
        </Button>
      </Form.Item>
      <Form.Item className="ml-auto">
        <Button type="primary" onClick={action}>
          新增
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchBar;
