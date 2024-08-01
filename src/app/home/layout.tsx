import "rsuite/dist/rsuite-no-reset.min.css";
import ptBR from "rsuite/locales/pt_BR";
import { CustomProvider } from "rsuite";
import SideNavigation from "@/components/sideNavigation";
import { UserContextProvider } from "@/providers/userContext";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="px-8 pl-[220px] pb-8 flex min-h-[100vh] w-full items-center justify-center ">
        <UserContextProvider>   
          <CustomProvider locale={ptBR}>{children}</CustomProvider>
          <SideNavigation />
        </UserContextProvider>
    </div>
  );
}
