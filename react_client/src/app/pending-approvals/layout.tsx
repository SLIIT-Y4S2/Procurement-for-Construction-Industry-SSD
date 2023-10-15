import OrderApprovalContextProvider from "@/context/OrderApproval/OrderApprovalContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderApprovalContextProvider>{children}</OrderApprovalContextProvider>
  );
}
