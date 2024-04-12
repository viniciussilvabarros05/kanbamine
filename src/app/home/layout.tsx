import SideNavigation from "@/components/sideNavigation";

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
