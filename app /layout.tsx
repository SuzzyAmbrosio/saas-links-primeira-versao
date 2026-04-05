import "./globals.css";

export const metadata = {
  title: "SaaS Links",
  description: "Plataforma de links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
