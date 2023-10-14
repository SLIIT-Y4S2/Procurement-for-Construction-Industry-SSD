import UserManagementContextProvider from "@/Context/UserManagement/UserManagementContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserManagementContextProvider>{children}</UserManagementContextProvider>
  );
}
