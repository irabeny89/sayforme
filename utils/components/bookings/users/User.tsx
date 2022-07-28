import { useQuery, useReactiveVar } from "@apollo/client";
import { error5xx } from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import { GET_MEMBER } from "utils/api/graphql/client/documentNode";
import { tokenPayloadVar } from "utils/api/graphql/client/reactiveVariables";
import UserAuthorizeButton from "./UserAuthorizeButton";
import UserDenyButton from "./UserDenyButton";

export default function User() {
  const payload = useReactiveVar(tokenPayloadVar),
    isAuth = payload?.role !== "CUSTOMER",
    { query } = useRouter(),
    userId = query.id as string,
    { loading, error, data } = useQuery<UserQueryT, Record<"userId", string>>(
      GET_MEMBER,
      { variables: { userId } }
    );

  if (data) {
    const { createdAt, email, id, role, updatedAt, username } = data.getMember;

    return (
      <div>
        <h2>User Details</h2>
        <p>Details of the user on the platform.</p>
        {!isAuth && <UserAuthorizeButton userId={userId} />}
        {isAuth && <UserDenyButton userId={userId} />}
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
          <dd>{createdAt}</dd>
          <dt>Updated At</dt>
          <dd>{updatedAt}</dd>
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
