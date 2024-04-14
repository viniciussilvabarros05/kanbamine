import SideNavigation from "@/components/sideNavigation";
import Header from "./_components/header";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SideNavigation />
    </>
  );
}
