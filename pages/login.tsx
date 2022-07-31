import useAuthRequest from "utils/hooks/useAuthRequest";

export default function Login() {
  const { errorMessage, isLoading, handleSubmit } = useAuthRequest();

  return (
    <div>
      <h2>Login</h2>
      <p>Fill the form below</p>
      <form onSubmit={handleSubmit("login")}>
        <fieldset>
          <legend>Credentials</legend>
          <label>
            Email:
            <div>
              <input
                type="email"
                name="email"
                placeholder="sayforme@gmail.com"
                required
              />
            </div>
          </label>
          <br />
          <label>
            Password:
            <div>
              <input
                type="password"
                name="password"
                placeholder="don't share password"
                required
              />
            </div>
          </label>
        </fieldset>
        <br />
        <button type="submit">{isLoading ? "waiting..." : "Submit"}</button>
      </form>
      <br />
      <small>{errorMessage}</small>
    </div>
  );
}
