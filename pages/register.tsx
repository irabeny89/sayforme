import useAuthRequest from "utils/hooks/useAuthRequest";

export default function Register() {
  const { errorMessage, isLoading, handleSubmit } = useAuthRequest();

  return (
    <div className="min-h-screen mt-10 space-y-10">
      <h2 className="text-xl underline">Register</h2>
      <div className="space-y-5 sm:w-1/2 mx-auto">
        <p>Fill the form below</p>
        <form onSubmit={handleSubmit("register")} className="space-y-7">
          <input
            name="username"
            placeholder="Enter username"
            required
            className="input input-sm w-full max-w-xs"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="input input-sm w-full max-w-xs"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password 8 or more letters"
            required
            className="input input-sm w-full max-w-xs"
          />
          <div>
            <button type="submit" className="btn btn-sm">{isLoading ? "waiting..." : "Submit"}</button>
          </div>
        </form>
      </div>
      <br />
      <small>{errorMessage}</small>
      <br />
    </div>
  );
}
