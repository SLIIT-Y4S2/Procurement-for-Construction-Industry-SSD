import UserManagementContextProvider from "@/context/UserManagement/UserManagementContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserManagementContextProvider>{children}</UserManagementContextProvider>
  );
}
