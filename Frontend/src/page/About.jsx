import React from "react";

const About = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#E1E9C9] mt-20 px-8 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-[#A66A2C]">Algoslog</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Algoslog is more than just a coding platform. It’s a personal
            logbook designed to help you{" "}
            <span className="font-semibold text-gray-900">track</span>,{" "}
            <span className="font-semibold text-gray-900">solve</span>, and{" "}
            <span className="font-semibold text-gray-900">grow</span> your skills
            step by step.
          </p>
        </section>

        {/* Mission & Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              🚀 Our Mission
            </h3>
            <p className="text-gray-700">
              To make coding practice simple, structured, and motivating. Every
              solve counts, every streak matters, and every learner grows.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              🌱 The Story
            </h3>
            <p className="text-gray-700">
              Algoslog started as a personal project to solve one problem:
              keeping track of coding progress in a clean, distraction-free
              way. Now, it’s evolving into a complete practice platform.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            What Makes Us Different?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-start gap-3 border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <span className="text-3xl">🔥</span>
              <h3 className="font-semibold text-xl text-gray-800">
                Motivation First
              </h3>
              <p className="text-gray-700">
                Streaks, grace points, and leaderboards make consistency fun.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <span className="text-3xl">📒</span>
              <h3 className="font-semibold text-xl text-gray-800">
                Personal Notes
              </h3>
              <p className="text-gray-700">
                Save your problem-solving thought process for future reference.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <span className="text-3xl">📈</span>
              <h3 className="font-semibold text-xl text-gray-800">
                Growth Mindset
              </h3>
              <p className="text-gray-700">
                Visualize your journey with charts and milestones that inspire.
              </p>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="mt-16 text-center">
          <div className="inline-block px-6 py-4 bg-white/80 border border-[#455949] rounded-xl shadow-md">
            <p className="text-gray-800">
              💡 <span className="font-semibold">Upcoming:</span> Discussion Forum,Premium Features
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export  {About};
