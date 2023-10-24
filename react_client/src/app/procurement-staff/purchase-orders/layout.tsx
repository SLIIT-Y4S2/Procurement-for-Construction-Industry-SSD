import OrderPlacementContextProvider from "@/context/OrderPlacement/OrderPlacementContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderPlacementContextProvider>{children}</OrderPlacementContextProvider>
  );
}
