import OrderDeliveryContextProvider from "@/context/OrderDelivery/OrderDeliveryContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <OrderDeliveryContextProvider>{children}</OrderDeliveryContextProvider>
  );
}
