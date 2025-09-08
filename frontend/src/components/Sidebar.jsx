import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Bird } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers?.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Bird className="w-6 h-6 text-white" />
          </div>
          <div className="hidden lg:block">
            <h2 className="font-bold text-lg">ChirpChat</h2>
            <p className="text-blue-100 text-sm">Connect with friends</p>
          </div>
        </div>
        
        {/* Online filter toggle */}
        <div className="mt-4 hidden lg:flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 text-white/90 hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-200 focus:ring-blue-400 focus:ring-2 accent-blue-200"
            />
            <span className="text-sm font-medium">Show online only</span>
          </label>
          <span className="text-xs text-blue-200 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
            {(onlineUsers?.length || 0) - 1} online
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto flex-1 p-2">
        <div className="space-y-2">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                  : "hover:bg-white hover:shadow-md text-gray-700"
              }`}
            >
              <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-sm"
                />
                {onlineUsers?.includes(user._id) && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-semibold truncate text-sm">
                  {user.fullName}
                </div>
                <div className={`text-xs flex items-center gap-1 ${
                  selectedUser?._id === user._id ? "text-blue-100" : "text-gray-500"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    onlineUsers?.includes(user._id) ? "bg-green-400" : "bg-gray-400"
                  }`} />
                  {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm">No users found</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;