import React from "react";

const PageLoader = ({
  size = "default",
  color = "primary",
  text = "Loading...",
  showText = true,
  className = "",
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-12 h-12",
    large: "w-16 h-16",
    xlarge: "w-20 h-20",
  };

  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
    white: "text-white",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}
    >
      {/* Main Spinner */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border-4 border-gray-200 ${colorClasses[color]} animate-spin`}
        ></div>

        {/* Inner ring with gradient */}
        <div
          className={`absolute inset-1 rounded-full border-4 border-transparent border-t-current animate-spin`}
        ></div>

        {/* Center dot */}
        <div
          className={`absolute inset-2 rounded-full bg-current animate-pulse`}
        ></div>
      </div>

      {/* Loading text */}
      {showText && (
        <div className="mt-4 text-center">
          <p
            className={`text-lg font-medium ${colorClasses[color]} animate-pulse`}
          >
            {text}
          </p>
          {/* Animated dots */}
          <div className="flex justify-center mt-2 space-x-1">
            <div
              className={`w-2 h-2 rounded-full bg-current animate-bounce ${colorClasses[color]}`}
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className={`w-2 h-2 rounded-full bg-current animate-bounce ${colorClasses[color]}`}
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className={`w-2 h-2 rounded-full bg-current animate-bounce ${colorClasses[color]}`}
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      )}

      {/* Optional progress bar */}
      <div className="w-48 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
        <div
          className={`h-full bg-current rounded-full animate-pulse ${colorClasses[color]}`}
          style={{ width: "60%" }}
        ></div>
      </div>
    </div>
  );
};

// Alternative loader variants
export const DotsLoader = ({
  color = "primary",
  size = "default",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-2 h-2",
    default: "w-3 h-3",
    large: "w-4 h-4",
  };

  const colorClasses = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    danger: "bg-red-600",
    white: "bg-white",
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
};

export const SpinnerLoader = ({
  color = "primary",
  size = "default",
  className = "",
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
    white: "text-white",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div
        className={`w-full h-full border-2 border-gray-200 border-t-current rounded-full animate-spin ${colorClasses[color]}`}
      ></div>
    </div>
  );
};

export default PageLoader;
