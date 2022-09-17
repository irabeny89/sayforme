import { useQuery } from "@apollo/client";
import { error5xx } from "config";
import { MEMBERS } from "utils/api/graphql/client/documentNode";
import UsersTableRow from "./UsersTableRow";

export default function UsersTable() {
  const { loading, error, data } = useQuery<UsersQueryT>(MEMBERS);
  return loading ? (
    <small>
      <i>Loading...</i>
    </small>
  ) : error ? (
    <small>
      <i>{error5xx}</i>
    </small>
  ) : !data?.members.length ? (
    <small>
      <i>No Members yet.</i>
    </small>
  ) : (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-compact w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Role</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.members.map((member, i) => (
            <UsersTableRow key={member.id} {...member} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
