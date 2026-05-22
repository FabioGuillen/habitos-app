import { Skeleton } from "../../components/ui/skeleton";

const StatsSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-[36px] p-6 md:p-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-10">
          {/* LEFT */}
          <div className="space-y-6 flex-1">
            <Skeleton className="h-10 w-44 rounded-full bg-white/5" />

            <div className="space-y-4">
              <Skeleton className="h-14 w-[400px] max-w-full bg-white/10" />

              <Skeleton className="h-5 w-full max-w-[600px] bg-white/5" />

              <Skeleton className="h-5 w-[80%] bg-white/5" />
            </div>
          </div>

          {/* CIRCLE */}
          <div className="flex justify-center">
            <Skeleton className="w-64 h-64 rounded-full bg-white/5" />
          </div>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6"
          >
            <div className="space-y-7">
              <Skeleton className="w-16 h-16 rounded-3xl bg-white/5" />

              <div className="space-y-3">
                <Skeleton className="h-4 w-28 bg-white/5" />

                <Skeleton className="h-10 w-32 bg-white/10" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* BIG CHART */}
        <div className="xl:col-span-2 bg-[#111827] border border-[#1F2937] rounded-[32px] p-6">
          <div className="flex justify-between mb-8">
            <div className="space-y-3">
              <Skeleton className="h-8 w-60 bg-white/10" />

              <Skeleton className="h-4 w-44 bg-white/5" />
            </div>

            <Skeleton className="h-10 w-24 rounded-full bg-white/5" />
          </div>

          <Skeleton className="h-[320px] w-full rounded-[24px] bg-white/5" />
        </div>

        {/* SIDE PANELS */}
        <div className="space-y-5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-[#111827] border border-[#1F2937] rounded-[32px] p-6"
            >
              <div className="space-y-7">
                <Skeleton className="w-16 h-16 rounded-3xl bg-white/5" />

                <div className="space-y-3">
                  <Skeleton className="h-4 w-24 bg-white/5" />

                  <Skeleton className="h-8 w-36 bg-white/10" />

                  <Skeleton className="h-4 w-full bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AREA CHART */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-[36px] p-6">
        <div className="flex justify-between mb-8">
          <div className="space-y-3">
            <Skeleton className="h-8 w-44 bg-white/10" />

            <Skeleton className="h-4 w-56 bg-white/5" />
          </div>

          <Skeleton className="h-6 w-32 bg-white/5" />
        </div>

        <Skeleton className="h-[320px] w-full rounded-[24px] bg-white/5" />
      </div>

      {/* MOTIVATION */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-[36px] p-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-6 flex-1">
            <Skeleton className="w-16 h-16 rounded-3xl bg-white/5" />

            <Skeleton className="h-10 w-[400px] max-w-full bg-white/10" />

            <Skeleton className="h-5 w-full bg-white/5" />

            <Skeleton className="h-5 w-[80%] bg-white/5" />
          </div>

          <Skeleton className="w-[250px] h-[180px] rounded-[28px] bg-white/5" />
        </div>
      </div>
    </div>
  );
};

export default StatsSkeleton;
