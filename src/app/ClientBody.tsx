"use client";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="antialiased">{children}</div>;
}
