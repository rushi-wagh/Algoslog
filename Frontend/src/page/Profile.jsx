import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { authUser } = useAuthStore();

  return (
    <>
      <div className="min-h-screen bg-[#E1E9C9] px-6 py-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 flex items-center gap-6">
          {/* Avatar */}
          <img
            src="/avatar.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />

          {/* Name + Bio */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {authUser.name}
            </h2>
            <p className="text-gray-600 text-sm">{authUser.email}</p>
            <h3 className="text-gray-500 mt-1"> Role : {authUser.role}</h3>
            {authUser.role === "ADMIN" ? (
              <p className="text-gray-500 mt-1">Problem creator</p>
            ) : (
              <p className="text-gray-500 mt-1">
                Problem solver & CS enthusiast 🚀
              </p>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">120</p>
            <p className="text-gray-500 text-sm">Problems Solved</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-orange-500">🔥 15</p>
            <p className="text-gray-500 text-sm">Current Streak</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">350</p>
            <p className="text-gray-500 text-sm">Grace Points</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">Level 5</p>
            <p className="text-gray-500 text-sm">Skill Level</p>
          </div>
        </div>

        {/* Your Sheets Section */}
        <div className="max-w-3xl mx-auto mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Your Sheets
          </h3>

          <div className="space-y-4">
            {/* Single Sheet Card */}
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Striver DSA Sheet
                </h4>
                <p className="text-sm text-gray-500">
                  45 / 191 problems completed
                </p>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
                Continue
              </button>
            </div>

            {/* Another Sheet Card */}
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Topic-wise DP Sheet
                </h4>
                <p className="text-sm text-gray-500">
                  10 / 50 problems completed
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "20%" }}
                  ></div>
                </div>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
                Continue
              </button>
            </div>
          </div>

          {/* View all link */}
          <div className="text-right mt-3">
            <a href="/sheets" className="text-orange-600 hover:underline">
              View all sheets →
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
