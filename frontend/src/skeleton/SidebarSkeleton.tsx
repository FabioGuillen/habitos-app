import { Skeleton } from "../../components/ui/skeleton";

const SidebarSkeleton = () => {
  return (
    <>
      {/* MOBILE SKELETON (Hidden on desktop) */}
      <aside className="md:hidden fixed top-0 left-0 h-full w-[320px] bg-[#0B0F14]/95 border-r border-[#1F2937] p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-2xl bg-gray-800" />
          <Skeleton className="h-6 w-28 bg-gray-800" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-3xl bg-gray-800" />
          ))}
        </div>
      </aside>

      {/* DESKTOP SKELETON (Hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-[310px] min-h-screen bg-[#0B0F14] border-r border-[#1F2937] p-6 space-y-8">
        <div className="flex items-center gap-4 px-3">
          <Skeleton className="w-16 h-16 rounded-[22px] bg-gray-800" />
          <Skeleton className="h-7 w-32 bg-gray-800" />
        </div>

        <div className="h-px bg-[#1F2937] w-full" />

        <div className="space-y-4 px-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              className="h-[72px] w-full rounded-[28px] bg-gray-800"
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default SidebarSkeleton;
