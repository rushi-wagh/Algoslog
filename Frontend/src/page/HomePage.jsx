import React from "react";
import CodeBackground from "../Components/AuthImagePattern";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-64px)]  bg-[#E1E9C9] mt-20 justify-center px-8 md:px-12 py-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Left: Text */}
        <div className="ml-10">
          <h1 className="text-gray-900 font-bold text-5xl leading-tight">
            TRACK. SOLVE. <br /> GROW.
          </h1>
          <p className="text-gray-700 text-lg mt-6 max-w-md">
            Your personal logbook of problem-solving. <br /> Maintain streaks,
            earn grace points, <br /> and watch your skills level up.
          </p>
          <div className="flex">
            <button
              onClick={() => navigate("/problems")}
              className="btn bg-[#A66A2C] hover:bg-[#8C5A24] text-white px-6 py-3 shadow-md shadow-[#A66A2C]/40 rounded-lg transition-transform mt-6"
            >
              Explore Problems
            </button>
          </div>
        </div>

        {/* Right: Code Card */}
        <div className="flex justify-center h-full gap-12 ml-10">
          <div className="w-full h-full flex items-center">
            <div className="w-fit max-h-[300px] md:max-h-[400px] flex items-center">
              <CodeBackground />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <section className="py-16 bg-[#E1E9C9]">
          <div className="max-w-6xl mx-auto px-6">
            {/* Section Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
              Why Algoslog?
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {/* Card */}
              <div className="flex items-start gap-6 border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 h-44">
                <span className="text-orange-500 text-3xl">🔥</span>
                <div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">
                    Streak tracking
                  </h3>
                  <p className="text-gray-600">
                    Never lose your rhythm — your log remembers every solve.
                  </p>
                </div>
              </div>

              {/* Card */}
              <div className="flex items-start gap-6 border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 h-44">
                <span className="text-blue-500 text-3xl">🛡️</span>
                <div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">
                    Grace points
                  </h3>
                  <p className="text-gray-600">
                    Get rewarded for every problem solved, no matter how small.
                  </p>
                </div>
              </div>

              {/* Card */}
              <div className="flex items-start gap-6 border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 h-44">
                <span className="text-blue-500 text-3xl">📈</span>
                <div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">
                    Growth charts
                  </h3>
                  <p className="text-gray-600">
                    Visualize your progress with skill graphs and milestone
                    trackers.
                  </p>
                </div>
              </div>

              {/* Card */}
              <div className="flex items-start gap-6 border border-[#455949] bg-[#E1E9C9] rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 h-44">
                <span className="text-blue-500 text-3xl">📝</span>
                <div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">
                    Personal problem notes
                  </h3>
                  <p className="text-gray-600">
                    Save your thought process for each problem and revisit
                    anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
