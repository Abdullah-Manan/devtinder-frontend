import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../redux/slices/authSlice";
import { Input, Textarea, Select, SkillsInput } from "../common";
import { axiosApi } from "../providers/axiosInstances";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    about: "",
    skills: [],
    photoUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        gender: user.gender || "",
        about: user.about || "",
        skills: user.skills || [],
        photoUrl: user.photoUrl || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSkillsChange = (skills) => {
    setFormData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.photoUrl.trim()) {
      newErrors.photoUrl = "Photo URL is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.about.trim()) {
      newErrors.about = "About is required";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosApi.patch("/profile/edit", formData, {
        withCredentials: true,
      });
      dispatch(setUser(response.data.user));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ submit: "Failed to update profile. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        gender: user.gender || "",
        about: user.about || "",
        skills: user.skills || [],
        photoUrl: user.photoUrl || "",
      });
    }
    setIsEditing(false);
    setErrors({});
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">
              User not found
            </h2>
            <p className="text-base-content/70">
              Please log in to view your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="card bg-base-100 shadow-2xl">
          {/* Header */}
          <div className="card-body border-b border-base-300">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-primary">Profile</h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="card-body">
            <div className="avatar mb-4">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                required
                error={errors.firstName}
                disabled={!isEditing}
              />

              {/* Last Name */}
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                required
                error={errors.lastName}
                disabled={!isEditing}
              />

              {/* Email - Not Editable */}
              <Input
                label="Email"
                name="email"
                value={formData.email}
                type="email"
                disabled={true}
                className="md:col-span-2"
              />
              <Input
                label="Photo URL"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleInputChange}
                placeholder="Enter your profile link"
                required
                error={errors.photoUrl}
                disabled={!isEditing}
                className="md:col-span-2"
              />

              {/* Gender */}
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                options={genderOptions}
                placeholder="Select your gender"
                required
                error={errors.gender}
                disabled={!isEditing}
              />

              {/* About */}
              <Textarea
                label="About"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                required
                error={errors.about}
                disabled={!isEditing}
                rows={1}
                className="md:col-span-2"
              />

              {/* Skills */}
              <SkillsInput
                label="Skills"
                skills={formData.skills}
                onSkillsChange={handleSkillsChange}
                error={errors.skills}
                disabled={!isEditing}
                required
                className="md:col-span-2"
              />
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="alert alert-error mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Action Buttons */}
            {isEditing && (
              <div className="card-actions justify-end mt-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
