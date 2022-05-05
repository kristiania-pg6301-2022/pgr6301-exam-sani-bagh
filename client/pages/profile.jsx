import React from "react";

export function Profile({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      <div className="profile">
        <div className="box">
          <h3>Name: {user.google.name}</h3>
          <h4>Email: {user.google.email}</h4>
        </div>
        <div className="box">
          <img src={user.google.picture} alt="Profile picture" />
        </div>
      </div>
    </div>
  );
}
