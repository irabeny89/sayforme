import { useQuery } from "@apollo/client";
import { error5xx } from "config";
import Link from "next/link";
import { WHO_AM_I } from "utils/api/graphql/client/documentNode";
import createDateString from "utils/createDateString";

export default function Profile() {
  const { loading, error, data } = useQuery<Record<"whoami", UserT>>(WHO_AM_I);
  if (data) {
    const { createdAt, email, id, role, updatedAt, username } = data.whoami;
    return (
      <div className="min-h-screen mt-10 space-y-10">
        <h2 className="text-xl underline">User Details</h2>
        <div className="space-y-5 sm:w-1/2 mx-auto">
          <p>Details of the user on the platform.</p>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs">ID</dt>
              <dd>{id}</dd>
              <hr />
            </div>
            <div>
              <dt className="text-xs">Role</dt>
              <dd>{role}</dd>
              <hr />
            </div>
            <div>
              <dt className="text-xs">Username</dt>
              <dd>{username}</dd>
              <hr />
            </div>
            <div>
              <dt className="text-xs">Email</dt>
              <dd>{email}</dd>
              <hr />
            </div>
            <div>
              <dt className="text-xs">Joined on</dt>
              <dd>{createDateString(createdAt)}</dd>
              <hr />
            </div>
            <div>
              <dt className="text-xs">Updated At</dt>
              <dd>{createDateString(updatedAt)}</dd>
            </div>
          </dl>
        </div>
      </div>
    );
  }
  return loading ? (
    <small>
      <i>Loading...</i>
    </small>
  ) : error ? (
    <small>
      <i>
        {error5xx} <Link href="/">Go Home page</Link>
      </i>
    </small>
  ) : null;
}
