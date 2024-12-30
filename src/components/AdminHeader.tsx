import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user, "RootStateRootState");
  const dispatch = useDispatch();

  return (
    <div className="h-56 py-12 px-8 bg-white flex justify-between items-center  shadow-md ">
      <div className="text-2xl font-bold">My-Blog-Admin</div>
      <div className="flex justify-between items-center gap-4">
        <Button icon={<img src="path/to/avatar.png" alt="Avatar" />} onClick={() => navigate("/admin/settings")}>
          你好 {user?.username}
        </Button>
        <Button onClick={() => dispatch(logout())}>登出</Button>
      </div>
    </div>
  );
};

export default AdminHeader;
