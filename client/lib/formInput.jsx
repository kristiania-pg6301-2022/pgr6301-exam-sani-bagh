import React from "react";

export function FormInput({ label, value, onChangeValue }) {
  return (
    <div className="form-input">
      <label className="input-label">
        <strong>{label}</strong>{" "}
        <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
      </label>
    </div>
  );
}

export function FormTextArea({ label, value, onChangeValue }) {
  return (
    <div className="form-textarea">
      <label className="textarea-label">
        <strong>{label}</strong>{" "}
        <textarea
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
      </label>
    </div>
  );
}
