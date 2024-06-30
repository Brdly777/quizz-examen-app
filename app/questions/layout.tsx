export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="max-w-md w-full -mt-20 mx-auto text-center">
        {children}
      </div>
    </section>
  );
}
