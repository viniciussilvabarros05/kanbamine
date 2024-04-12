"use client"

import { addUser } from "@/_actions/addUser";
const DashboardPage = () => {
 const handleAddUser = async ()=>{
  await addUser()
 }

  return (
    <div>
      <button onClick={handleAddUser}>Adicionar usuario</button>
    </div>
  );
};

export default DashboardPage;
