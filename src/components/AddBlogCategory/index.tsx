import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { AddBlogCategoryType } from "../../type";

const AddBlogCategory: React.FC<AddBlogCategoryType> = ({ open, onSubmit, onClose }) => {
  const [category, setCategory] = useState("");
  const handleAddCategory = () => {
    if (category) {
      onSubmit(category);
      setCategory("");
    }
  };
  const onCancel = () => {
    setCategory("");
    onClose();
  };

  return (
    <Modal open={open} onCancel={onCancel} title="新增分类">
      <Form layout="inline" onFinish={handleAddCategory}>
        <Form.Item>
          <Input placeholder="请输入分类名称" value={category} onChange={(e) => setCategory(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={() => onSubmit(category)}>
            添加
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBlogCategory;
