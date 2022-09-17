import Link from "next/link";

export default function UsersTableRow({
  index,
  email,
  id,
  role,
  username,
}: UsersTableRowT) {
  return (
    <tr>
      <td>{++index}</td>
      <td>{role}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td className="underline">
        <Link href={`/users/${id}`}>View</Link>
      </td>
    </tr>
  );
}
