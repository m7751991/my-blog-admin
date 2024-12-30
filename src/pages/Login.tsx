import React, { useState } from "react";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import CryptoJS from "crypto-js";
import { createResource } from "../fetch";
import { login } from "../store/authSlice";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
    const { code, data, error } = await createResource<{ token: string; user: { username: string; password: string; id: string } }, { username: string; password: string }>("/login", {
      username,
      password,
    });
    console.log(data);
    if (code === 200 && data) {
      localStorage.setItem("authorization", data?.token);
      dispatch(login({ user: data.user }));
      navigate("/admin", { replace: true });
    } else {
      // message.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white p-16 rounded-lg shadow-md w-380 ">
        <h2 className="text-2xl font-bold mb-6 text-center">登录</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="username">
              用户名
            </label>
            <input
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
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-4 mt-8 rounded hover:bg-blue-600 transition duration-200">
            登录
          </button>
          <button type="button" className="w-full bg-green-500 text-white font-bold py-4 mt-4 rounded hover:bg-green-600 transition duration-200" onClick={() => setIsModalVisible(true)}>
            注册
          </button>
        </form>
      </div>
      <Register isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};

export default Login;
