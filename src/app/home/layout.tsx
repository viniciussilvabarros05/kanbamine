import SideNavigation from "@/components/sideNavigation";
import Header from "./_components/header";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pl-[200px] pt-[60px]">
      {children}
      <SideNavigation />
    </div>
  );
}
