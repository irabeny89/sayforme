import useAuthRequest from "utils/hooks/useAuthRequest";

export default function Login() {
  const { errorMessage, isLoading, handleSubmit } = useAuthRequest();

  return (
    <div>
      <h2>Login</h2>
      <p>Fill the form below</p>
      <form onSubmit={handleSubmit("login")}>
        <div>
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{isLoading ? "waiting..." : "Submit"}</button>
      </form>
      <small>{errorMessage}</small>
    </div>
  );
}
