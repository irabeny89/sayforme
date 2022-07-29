import { useQuery } from "@apollo/client";
import { error5xx } from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import { GET_MEMBER } from "utils/api/graphql/client/documentNode";
import createDateString from "utils/createDateString";
import UserAuthorizeButton from "./UserAuthorizeButton";
import UserDenyButton from "./UserDenyButton";

export default function User() {
  const { query } = useRouter(),
    userId = query && (query.id as string[])[0],
    { loading, error, data } = useQuery<UserQueryT, Record<"userId", string>>(
      GET_MEMBER,
      { variables: { userId } }
    );

  if (data) {
    const { createdAt, email, id, role, updatedAt, username } = data.getMember,
      authAble = role === "CUSTOMER",
      deniable = role === "OPERATOR";

    return (
      <div>
        <h2>User Details</h2>
        <p>Details of the user on the platform.</p>
        {authAble && <UserAuthorizeButton userId={userId} />}
        {deniable && <UserDenyButton userId={userId} />}
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
      <i>
        {error5xx} <Link href="/users">Go back</Link>
      </i>
    </small>
  ) : null;
}
