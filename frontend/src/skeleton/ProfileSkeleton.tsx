const ProfileSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* HEADER */}
      <div className="space-y-2">
        <div className="h-10 w-48 bg-gray-800 rounded-lg" />
        <div className="h-5 w-64 bg-gray-800 rounded" />
      </div>

      {/* HERO PROFILE SKELETON */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-[36px] p-10">
        <div className="flex flex-col xl:flex-row justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Avatar skeleton */}
            <div className="w-32 h-32 rounded-[30px] bg-gray-800" />

            <div className="space-y-4">
              <div className="h-10 w-64 bg-gray-800 rounded-lg" />
              <div className="h-4 w-48 bg-gray-800 rounded" />
              <div className="h-16 w-full max-w-lg bg-gray-800 rounded-xl" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-24 bg-gray-800 rounded-2xl" />
            <div className="h-12 w-12 bg-gray-800 rounded-2xl" />
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#0B0F14] border border-[#1F2937] rounded-3xl p-5 h-24"
            />
          ))}
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-[#111827] border border-[#1F2937] rounded-[36px] p-7 space-y-5"
          >
            <div className="h-8 w-32 bg-gray-800 rounded-lg" />
            <div className="h-20 bg-[#0B0F14] rounded-2xl border border-[#1F2937]" />
            <div className="h-20 bg-[#0B0F14] rounded-2xl border border-[#1F2937]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
