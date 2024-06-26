export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-[60px] flex-1">
      <main className="container mx-auto flex min-h-screen flex-col gap-8 px-8 py-6 ">
        {children}
      </main>
    </div>
  );
}
