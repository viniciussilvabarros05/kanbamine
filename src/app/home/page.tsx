"use client";

import { addUser } from "@/_actions/addUser";
import Header from "./_components/header";
const DashboardPage = () => {
  const handleAddUser = async () => {
    await addUser();
  };

  return (
    <div>
      <Header title="Pedidos"/>
    </div>
  );
};

export default DashboardPage;
