import { fetchJSON } from "../lib/fetchJSON";
import { useLoading } from "../useLoading";

export function Profile({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, undefined, "  ")}</pre>
      <h1>{user.name}</h1>
    </div>
  );
}
