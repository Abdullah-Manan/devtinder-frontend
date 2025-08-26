import React, { useState } from "react";

const SkillsInput = ({
  label,
  skills = [],
  onSkillsChange,
  error,
  disabled = false,
  required = false,
  placeholder = "Add a skill",
  className = "",
}) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onSkillsChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onSkillsChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className={`form-control ${className}`}>
      {label && (
        <label className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            input input-bordered flex-1 focus:input-primary transition-colors
            ${error ? "input-error" : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
        />
        <button
          type="button"
          onClick={handleAddSkill}
          disabled={disabled || !newSkill.trim()}
          className={`
            btn btn-primary
            ${disabled || !newSkill.trim() ? "btn-disabled" : ""}
          `}
        >
          Add
        </button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div key={index} className="badge badge-primary gap-2">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                disabled={disabled}
                className={`
                  btn btn-ghost btn-xs
                  ${disabled ? "btn-disabled" : ""}
                `}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default SkillsInput;
