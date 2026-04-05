"use client";

import Sidebar from "./sidebar";
import Topbar from "./topbar";

type AdminShellProps = {
  children: React.ReactNode;
  userEmail?: string | null;
};

export default function AdminShell({
  children,
  userEmail,
}: AdminShellProps) {
  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="main-area">
        <div className="content-wrap">
          <Topbar userEmail={userEmail} />
          {children}
        </div>
      </main>
    </div>
  );
}
