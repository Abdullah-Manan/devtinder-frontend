import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to DevTinder
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with developers and find your next project partner
          </p>

          {user && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome back, {user.name || user.email || "Developer"}!
              </h2>
              <p className="text-gray-600">
                You're successfully logged in and can access all features.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Find Projects
              </h3>
              <p className="text-gray-600">
                Discover exciting projects and opportunities to collaborate on.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-green-600 text-4xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Connect
              </h3>
              <p className="text-gray-600">
                Build your network and connect with like-minded developers.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-purple-600 text-4xl mb-4">💡</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Collaborate
              </h3>
              <p className="text-gray-600">
                Work together on innovative projects and learn new skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
