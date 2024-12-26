import React, { useState } from "react";
import { Modal, Button, Input } from "antd";

const Register: React.FC<{ isModalVisible: boolean; setIsModalVisible: (visible: boolean) => void }> = ({ isModalVisible, setIsModalVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    console.log("Registering with:", { username, password });
    setIsModalVisible(false);
  };

  const cancel = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setIsModalVisible(false);
  };

  return (
    <Modal title="注册" open={isModalVisible} footer={null} onCancel={cancel}>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">
            用户名
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            密码
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
            确认密码
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <Button type="primary" htmlType="submit" className="w-full mt-4">
          注册
        </Button>
      </form>
    </Modal>
  );
};

export default Register;
