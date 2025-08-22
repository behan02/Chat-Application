import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    // subscribeToMessages,
    // unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    // subscribeToMessages();

    // return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, /*subscribeToMessages, unsubscribeFromMessages*/]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"} mb-4`}
            ref={messageEndRef}
          >
            <div className={`flex max-w-xs lg:max-w-md ${
              message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"
            } items-end gap-3`}>
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              
              {/* Message */}
              <div className={`flex flex-col ${
                message.senderId === authUser._id ? "items-end" : "items-start"
              }`}>
                <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.senderId === authUser._id
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-xl mb-2 shadow-sm"
                    />
                  )}
                  {message.text && (
                    <p className={`text-sm ${
                      message.senderId === authUser._id ? "text-white" : "text-gray-800"
                    }`}>
                      {message.text}
                    </p>
                  )}
                </div>
                <time className={`text-xs mt-1 ${
                  message.senderId === authUser._id ? "text-gray-500" : "text-gray-500"
                }`}>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;