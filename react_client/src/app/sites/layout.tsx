import SiteContextProvider from "@/Context/Site/SiteContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteContextProvider>{children}</SiteContextProvider>;
}
