import UsersTable from "./UsersTable";

export default function Users() {
  return (
    <div className="min-h-screen mt-10 space-y-10">
      <h2 className="text-xl underline">All Users</h2>
      <div className="space-y-5 sm:w-1/2 mx-auto">
        <p>List of all users on the application.</p>
        <UsersTable />
      </div>
    </div>
  );
}
