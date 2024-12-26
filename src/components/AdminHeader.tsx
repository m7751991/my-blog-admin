import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-56 py-12 px-8 bg-white flex justify-between items-center  shadow-md ">
      <div className="text-2xl font-bold">My-Blog-Admin</div>
      <div className="flex justify-between items-center gap-4">
        <Button icon={<img src="path/to/avatar.png" alt="Avatar" />} onClick={() => navigate("/admin/settings")}>
          Settings
        </Button>
        <Button>Logout</Button>
      </div>
    </div>
  );
};

export default AdminHeader;
