import "rsuite/dist/rsuite-no-reset.min.css";
import ptBR from 'rsuite/locales/pt_BR';
import { CustomProvider } from "rsuite";
import SideNavigation from "@/components/sideNavigation";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-8 pl-[240px] pt-[100px] pb-8 flex min-h-[100vh] w-full items-center justify-center ">
      <CustomProvider locale={ptBR}>{children}</CustomProvider>
      <SideNavigation />
    </div>
  );
}
