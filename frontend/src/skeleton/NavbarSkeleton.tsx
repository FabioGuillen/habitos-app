import { Skeleton } from "../../components/ui/skeleton";

const NavbarSkeleton = () => {
  return (
    <header className="sticky md:relative top-1 z-40 mb-5">
      <div className="rounded-[32px] border border-[#1F2937] bg-[#0F1722]/75 backdrop-blur-2xl px-4 md:px-7 py-4">
        <div className="flex items-center md:justify-between justify-end">
          {/* Lado izquierdo */}
          <div className="hidden md:block space-y-2">
            <Skeleton className="h-7 w-48 bg-gray-800" />
            <Skeleton className="h-4 w-40 bg-gray-800" />
          </div>

          {/* Botón usuario */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-2xl bg-gray-800" />
            <div className="hidden md:block space-y-2">
              <Skeleton className="h-4 w-24 bg-gray-800" />
              <Skeleton className="h-3 w-16 bg-gray-800" />
            </div>
            <Skeleton className="w-4 h-4 rounded-full bg-gray-800" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarSkeleton;
