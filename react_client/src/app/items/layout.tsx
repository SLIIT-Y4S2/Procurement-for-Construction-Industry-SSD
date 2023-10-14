import ItemManagementContextProvider from "@/context/ItemManagement/ItemManagementContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ItemManagementContextProvider>{children}</ItemManagementContextProvider>
  );
}
