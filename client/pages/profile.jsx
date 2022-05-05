import { fetchJSON } from "../lib/fetchJSON";
import { useLoading } from "../useLoading";

export function Profile() {
  const { loading, data, error } = useLoading(async () => {
    return await fetchJSON("/api/login");
  });

  if (loading) {
    return <div>Please wait...</div>;
  }
  if (error) {
    return <div>Error! {error.toString()}</div>;
  }

  return (
    <div>
      <h1>
        Profile for {data.name || data.pid}
        {data.email && <span>({data.email})</span>}
      </h1>
      {data.picture && (
        <div>
          <img src={data.picture} alt={"Profile picture"} />
        </div>
      )}
    </div>
  );
}
