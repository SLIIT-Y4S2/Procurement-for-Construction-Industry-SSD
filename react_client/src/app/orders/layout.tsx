import OrderManagementContextProvider from "@/context/OrderManagement/OrderManagementContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderManagementContextProvider>{children}</OrderManagementContextProvider>
  );
}
