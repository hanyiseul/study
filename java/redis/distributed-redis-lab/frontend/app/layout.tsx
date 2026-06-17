import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distributed Redis State Demo",
  description: "Distributed Redis State Demo"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
