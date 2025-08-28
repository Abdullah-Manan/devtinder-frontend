import React, { useEffect, useState } from "react";
import Card from "../common/Card";
import { getFeed, userRequestSend } from "../services/endPoints";
import { toast } from "react-toastify";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [error, setError] = useState(null);
  console.log(users, "users");

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await getFeed({
          page: 1,
          pagesize: 10,
        });

        if (response.success && response.data) {
          const transformedUsers = response.data.map((user) => ({
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            bio: user.about || "No bio available",
            skills: user.skills || [],
            avatar:
              user.photoUrl ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
          }));

          setUsers(transformedUsers);
        } else {
          setError("Failed to fetch feed data");
        }
      } catch (err) {
        console.error("Error fetching feed:", err);
        setError("Error fetching feed data");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const handleInterested = async () => {
    try {
      const response = await userRequestSend(
        users[currentUserIndex].id,
        "interested"
      );
      console.log(response);

      if (response.data) {
        toast.success(
          `You're interested in ${users[currentUserIndex].name}! 🎉`
        );
      } else {
        toast.error("Failed to express interest. Please try again.");
      }

      if (currentUserIndex < users.length - 1) {
        setCurrentUserIndex(currentUserIndex + 1);
      }
    } catch (error) {
      console.error("Error liking user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleIgnore = async () => {
    try {
      const response = await userRequestSend(
        users[currentUserIndex].id,
        "ignored"
      );
      console.log(response);

      if (response.data) {
        toast.info(`You ignored ${users[currentUserIndex].name}. Next! 👋`);
      } else {
        toast.error("Failed to ignore user. Please try again.");
      }

      if (currentUserIndex < users.length - 1) {
        setCurrentUserIndex(currentUserIndex + 1);
      }
    } catch (error) {
      console.error("Error liking user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const resetCards = () => {
    setCurrentUserIndex(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-300 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="mt-4 text-base-content/70">Loading developers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-300 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-error mb-2">Error</h2>
            <p className="text-base-content/70 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-300 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">DevTinder</h1>
          <p className="text-base-content/70 text-lg">
            Find your perfect coding partner
          </p>
        </div>

        {/* Main card area */}
        <div className="flex justify-center mb-8">
          {users.length > 0 && currentUserIndex < users.length ? (
            <Card
              user={users[currentUserIndex]}
              onInterested={handleInterested}
              onIgnore={handleIgnore}
            />
          ) : (
            <div className="text-center py-16">
              <div className="card bg-base-100 shadow-2xl p-8 max-w-md">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  No more profiles!
                </h2>
                <p className="text-base-content/70 mb-6">
                  You've seen all available developers. Check back later for new
                  profiles!
                </p>
                <button onClick={resetCards} className="btn btn-primary">
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
