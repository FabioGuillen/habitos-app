import { Skeleton } from "../../components/ui/skeleton";

const EditProfileSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-48 bg-gray-800" />
        <Skeleton className="h-5 w-64 bg-gray-800" />
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-[36px] p-7 h-fit">
          <div className="flex flex-col items-center">
            <Skeleton className="w-36 h-36 rounded-[30px] bg-gray-800" />
            <Skeleton className="h-8 w-40 mt-5 bg-gray-800" />
            <Skeleton className="h-4 w-32 mt-2 bg-gray-800" />
          </div>
        </div>

        {/* Form */}
        <div className="xl:col-span-2 bg-[#111827] border border-[#1F2937] rounded-[36px] p-8 space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20 bg-gray-800" />
              <Skeleton className="h-14 w-full bg-gray-800" />
            </div>
          ))}
          <Skeleton className="h-14 w-44 bg-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default EditProfileSkeleton;
