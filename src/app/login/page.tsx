import { Card } from "@/components/ui/card";

const Login = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card>
        <input type="text" placeholder="Email"></input>
        <input placeholder="Senha" type="password"></input>
      </Card>
    </div>
  );
};

export default Login;
