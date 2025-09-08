import { Bird } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Bird className="w-6 h-6 text-white" />
          </div>
          <div className="hidden lg:block">
            <div className="h-5 w-24 bg-white/20 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="mt-4 hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white/20 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
          </div>
          <div className="h-6 w-16 bg-white/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto flex-1 p-2">
        <div className="space-y-2">
          {skeletonContacts.map((_, idx) => (
            <div key={idx} className="w-full p-3 flex items-center gap-3 rounded-xl">
              {/* Avatar skeleton */}
              <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
              </div>

              {/* User info skeleton - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse mb-2" />
                <div className="h-3 w-16 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;