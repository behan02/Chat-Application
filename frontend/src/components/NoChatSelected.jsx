import { Bird } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-md text-center space-y-6 p-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
            <Bird className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to ChirpChat!</h1>
          <p className="text-gray-600 text-lg">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;