import Sidebar from "@/components/Sidebar";
import ThreeBackground from "@/components/ThreeBackground";
import { QueueProvider } from "@/context/QueueContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueueProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-[240px] z-10 relative overflow-y-auto">
          {children}
        </main>
      </div>
    </QueueProvider>
  );
}
