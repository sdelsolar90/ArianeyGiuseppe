import { redirect } from "next/navigation";
import { isAuthenticated, isConfigured } from "@/lib/admin-auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isConfigured()) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display italic text-3xl text-marron mb-3">Admin no configurado</h1>
        <p className="text-marron/70">
          Define <code className="bg-marron/5 px-2 py-0.5 rounded">ADMIN_PASSWORD</code> y{" "}
          <code className="bg-marron/5 px-2 py-0.5 rounded">ADMIN_SECRET</code> en{" "}
          <code className="bg-marron/5 px-2 py-0.5 rounded">.env.local</code> y reinicia el dev server.
        </p>
      </main>
    );
  }
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
  return <AdminDashboard />;
}
