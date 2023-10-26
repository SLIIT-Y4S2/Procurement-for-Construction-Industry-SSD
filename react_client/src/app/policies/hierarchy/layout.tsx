import HierarchyManagementContextProvider from "@/context/HierarchyManagement/HierarchyManagementContext";
import UserManagementContextProvider from "@/context/UserManagement/UserManagementContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HierarchyManagementContextProvider>
      <UserManagementContextProvider>{children}</UserManagementContextProvider>
    </HierarchyManagementContextProvider>
  );
}
