import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
            />
            {onlineUsers?.includes(selectedUser._id) && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{selectedUser.fullName}</h3>
            <p className="text-sm flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                onlineUsers?.includes(selectedUser._id) ? "bg-green-400" : "bg-gray-400"
              }`} />
              <span className={onlineUsers?.includes(selectedUser._id) ? "text-green-600" : "text-gray-500"}>
                {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
              </span>
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 text-gray-600 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;