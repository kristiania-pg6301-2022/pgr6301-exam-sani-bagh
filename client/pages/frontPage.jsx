import { Link } from "react-router-dom";
import React from "react";
import { ListAllNews } from "./listNews";

export function FrontPage() {
  return (
    <div>
      <h1>Daily News</h1>
      <ListAllNews />
    </div>
  );
}
