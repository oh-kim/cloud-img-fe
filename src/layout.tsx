export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='max-w-screen-2xl h-screen m-auto bg-slate-400 p-2'>
      <div className='grid grid-cols-[7fr_3fr] grid-rows-[1fr_8fr] h-full gap-1'>
        {children}
      </div>
    </div>
  );
}
