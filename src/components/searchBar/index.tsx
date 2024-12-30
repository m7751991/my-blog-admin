import React from "react";
import { Form, Button } from "antd";
interface PropsType<T> {
  handlerAction: () => void;
  onSearch: (searchData?: T) => void;
  Component: React.ReactNode;
  showRightButton?: boolean;
}
const SearchBar: <T>(props: PropsType<T>) => JSX.Element = ({ handlerAction, onSearch, Component, showRightButton = true }) => {
  const [form] = Form.useForm();
  console.log("showRightButton", showRightButton);

  const handleSearchSubmit = (values: any) => {
    console.log("Search values:", values);
    onSearch(values);
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
      {showRightButton && (
        <Form.Item className="ml-auto">
          <Button type="primary" onClick={action}>
            新增
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default SearchBar;
