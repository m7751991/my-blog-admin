import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { AddBlogCategoryType } from "../../type";
import dayjs from "dayjs";

const AddBlogCategory: React.FC<AddBlogCategoryType> = ({ open, onSubmit, onClose, defaultValues }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      setIsEdit(true);
      form.setFieldsValue(defaultValues);
    }
  }, [defaultValues, form]);

  const handleAddCategory = async () => {
    try {
      await form.validateFields();
      const category = form.getFieldsValue();
      if (isEdit) {
        category.updatedAt = dayjs().toDate().getTime();
      }
      onSubmit({ ...defaultValues, ...category });
      onCancel();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const onCancel = () => {
    setIsEdit(false);
    form.resetFields();
    onClose();
  };

  return (
    <Modal open={open} onCancel={onCancel} title="新增分类" footer={null}>
      <Form form={form} onFinish={handleAddCategory}>
        <Form.Item required={true} name="name" rules={[{ required: true, message: "请输入分类名称!" }]}>
          <Input placeholder="请输入分类名称" maxLength={10} />
        </Form.Item>
        <Form.Item name="description" rules={[{ required: true, message: "请输入分类描述!" }]}>
          <Input placeholder="请输入分类描述" maxLength={10} />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" className="mr-8">
            {isEdit ? "修改" : "添加"}
          </Button>
          <Button type="default" onClick={onCancel}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBlogCategory;
