import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Bird, Calendar, CheckCircle } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12">
            <div className="flex flex-col items-center text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                <Bird className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-blue-100 mt-2">Manage your ChirpChat account</p>
            </div>
          </div>

          <div className="p-8">
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <div className="text-sm text-gray-500 text-center">
                {isUpdatingProfile ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    Uploading photo...
                  </span>
                ) : (
                  "Click the camera icon to update your photo"
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold">Full Name</span>
                </div>
                <div className="pl-13">
                  <p className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 font-medium">
                    {authUser?.fullName}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold">Email Address</span>
                </div>
                <div className="pl-13">
                  <p className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 font-medium">
                    {authUser?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bird className="w-5 h-5 text-white" />
                </div>
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-700">Member Since</span>
                  </div>
                  <span className="text-gray-900 font-semibold">
                    {authUser.createdAt?.split("T")[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 px-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-gray-700">Account Status</span>
                  </div>
                  <span className="flex items-center gap-2 text-green-600 font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;