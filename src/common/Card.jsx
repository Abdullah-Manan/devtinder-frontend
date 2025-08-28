import React from "react";

const Card = ({ user, onInterested, onIgnore }) => {
  const { name, age, bio, skills, avatar } = user;

  return (
    <div className="card bg-base-200 w-[400px]">
      {/* Header with avatar and basic info */}
      <div className="">
        <div className="h-48 w-48 mx-auto rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={avatar}
            alt={name}
          />
        </div>
        <div className="pt-16 pb-4 text-center">
          <h2 className="text-2xl font-bold text-primary">{name}</h2>
          <div className="flex items-center justify-center gap-2 text-base-content/70 mt-1">
            <span className="text-sm">{age} years old</span>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="px-6 py-4">
        <p className="text-base-content text-sm leading-relaxed">{bio}</p>
      </div>

      {/* Skills section */}
      {skills.length > 0 && (
        <div className="px-6 py-3">
          <h3 className="text-sm font-semibold text-primary mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-primary badge-outline text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="px-6 py-3 flex gap-3">
        <button onClick={onIgnore} className="btn btn-error flex-1">
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
          Ignore
        </button>
        <button onClick={onInterested} className="btn btn-success flex-1">
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          Interested
        </button>
      </div>
    </div>
  );
};

export default Card;
