import { useQuery } from "@apollo/client";
import { error5xx } from "config";
import Link from "next/link";
import { useRouter } from "next/router";
import { GET_MEMBER } from "utils/api/graphql/client/documentNode";
import createDateString from "utils/createDateString";
import UserAuthorizeButton from "./UserAuthorizeButton";
import UserDenyButton from "./UserDenyButton";

export default function User() {
  const { query, back } = useRouter();
  const userId = query && (query.id as string[])[0];
  const { loading, error, data } = useQuery<
    UserQueryT,
    Record<"userId", string>
  >(GET_MEMBER, { variables: { userId } });
  const goBack = () => back();

  if (data) {
    const { createdAt, email, id, role, updatedAt, username } = data.getMember,
      authAble = role === "CUSTOMER",
      deniable = role === "OPERATOR";

    return (
      <div className="min-h-screen mt-10 space-y-10">
        <div className="flex justify-between">
          <h2 className="text-xl underline">User Details</h2>
          <button onClick={goBack} className="btn btn-xs bg-base-300 border-0 shadow-md text-gray-400 hover:text-base-200">&larr; Users List</button>
        </div>
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
              <hr />
            </div>
          </dl>
          
          {authAble && <UserAuthorizeButton userId={userId} />}
          {deniable && <UserDenyButton userId={userId} />}
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
        {error5xx} <Link href="/users">Go back</Link>
      </i>
    </small>
  ) : null;
}
