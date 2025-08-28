import React, { useEffect, useState } from "react";
import { getConnections } from "../services/endPoints";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchConnections = async () => {
    try {
      const response = await getConnections();
      console.log(response);
      setConnections(response.data);
    } catch (error) {
      console.error("Error fetching connections:", error);
      setConnections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleMessage = (connectionId) => {
    console.log("Message connection:", connectionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="mt-4 text-gray-600">Loading your connections...</p>
            <p className="mt-4 text-gray-600">Loading your connections...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            My Connections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with fellow developers, designers, and tech professionals.
            Build your network and collaborate on amazing projects.
          </p>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.length > 0 ? (
            connections?.map((connection) => (
              <div
                key={connection.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Profile Header */}
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <div className="absolute -bottom-12 left-6">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                      <img
                        src={connection.photoUrl}
                        alt={connection.firstName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-16 px-6 pb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {connection.firstName} {connection.lastName}
                    </h3>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
                    {connection.about}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {connection.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="badge badge-primary badge-outline text-xs px-2 py-1"
                        >
                          {skill}
                        </span>
                      ))}
                      {connection.skills.length > 4 && (
                        <span className="badge badge-ghost text-xs px-2 py-1">
                          +{connection.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleMessage(connection.id)}
                      className="btn btn-primary btn-sm flex-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No connections yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start building your network by connecting with other
                  developers
                </p>
                <button className="btn btn-primary">Find Connections</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;
