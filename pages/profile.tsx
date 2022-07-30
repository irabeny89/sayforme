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
      <div>
        <h2>User Details</h2>
        <p>Details of the user on the platform.</p>
        <dl>
          <dt>ID</dt>
          <dd>{id}</dd>
          <dt>Role</dt>
          <dd>{role}</dd>
          <dt>Username</dt>
          <dd>{username}</dd>
          <dt>Email</dt>
          <dd>{email}</dd>
          <dt>Joined on</dt>
          <dd>{createDateString(createdAt)}</dd>
          <dt>Updated At</dt>
          <dd>{createDateString(updatedAt)}</dd>
        </dl>
      </div>
    );
  }
  return loading ? (
    <small>
      <i>Loading...</i>
    </small>
  ) : error ? (
    <small>
      <i>{error5xx} <Link href="/">Go Home page</Link></i>
    </small>
  ) : null;
}
