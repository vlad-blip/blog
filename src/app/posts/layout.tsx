export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-[80%] m-auto py-20">{children}</div>;
}
