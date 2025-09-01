import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getRequests, userRequestReview } from "../services/endPoints";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const response = await getRequests();
    setRequests(response.data);
  };
  useEffect(() => {
    fetchRequests();
    setLoading(false);
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const response = await userRequestReview(requestId, "accepted");
      console.log(response);

      toast.success("Connection request accepted!");
      fetchRequests();
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await userRequestReview(requestId, "rejected");
      console.log(response);
      toast.success("Connection request rejected");
      fetchRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">
            Loading connection requests...
          </p>
        </div>
      </div>
    );
  }

  if (requests?.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 mx-auto mb-6 text-base-content/30">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No Connection Requests
          </h2>
          <p className="text-base-content/70">
            You don't have any pending connection requests at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Connection Requests
          </h1>
          <p className="text-base-content/70 text-lg">
            You have {requests?.length} pending connection request
            {requests?.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests?.map((request) => (
            <div
              key={request._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
            >
              {/* User Photo */}
              <div className="card-body p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={request?.fromUserId?.photoUrl}
                        alt={`${request?.fromUserId?.firstName} ${request?.fromUserId?.lastName}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/64x64/6c757d/ffffff?text=" +
                            request?.fromUserId?.firstName?.charAt(0) +
                            request?.fromUserId?.lastName?.charAt(0);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-base-content">
                      {request?.fromUserId?.firstName}{" "}
                      {request?.fromUserId?.lastName}
                    </h3>
                    <p className="text-base-content/70 text-sm">
                      {request?.fromUserId?.email}
                    </p>
                  </div>
                </div>

                {/* About Section */}
                {request?.fromUserId?.about &&
                  request?.fromUserId?.about !== "No bio" &&
                  request?.fromUserId?.about !== "No bio added" && (
                    <div className="mb-4">
                      <p className="text-base-content/80 text-sm leading-relaxed">
                        {request?.fromUserId?.about}
                      </p>
                    </div>
                  )}

                {/* Skills Section */}
                {request?.fromUserId?.skills &&
                  request?.fromUserId?.skills?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-primary mb-2">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {request?.fromUserId?.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="badge badge-primary badge-outline text-xs px-3 py-2"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Request Info */}
                <div className="mb-4 p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-base-content/70">Status:</span>
                    <span className="badge badge-info badge-sm capitalize">
                      {request?.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-base-content/70">Received:</span>
                    <span className="text-base-content/80"></span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReject(request?._id)}
                    className="btn btn-error flex-1 btn-sm"
                  >
                    <>
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Reject
                    </>
                  </button>
                  <button
                    onClick={() => handleAccept(request?._id)}
                    className="btn btn-success flex-1 btn-sm"
                  >
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Accept
                    </>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
