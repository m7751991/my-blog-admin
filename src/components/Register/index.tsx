import React from "react";
import { Modal, Button, Input, Form, message as Message } from "antd";

import { createResource } from "../../fetch";

const Register: React.FC<{ isModalVisible: boolean; setIsModalVisible: (visible: boolean) => void }> = ({ isModalVisible, setIsModalVisible }) => {
  const [api, contextHolder] = Message.useMessage();
  const [form] = Form.useForm(); // 创建表单实例
  const onFinish = async (values: any) => {
    const { username, password } = values;
    console.log("Registering with:", { username, password });
    const { status, message, error } = await createResource("/users", { username, password, isAdmin: true });
    if (status) {
      setIsModalVisible(false);
      api.success(message, 10);
    } else {
      api.error(error, 10);
      form.resetFields();
    }
  };

  const cancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal title="注册" open={isModalVisible} footer={null} onCancel={cancel}>
      {contextHolder}
      <Form form={form} initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
        <Form.Item name="username" rules={[{ required: true, message: "请输入用户名!" }]}>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="确认密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full mt-4">
            注册
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Register;
