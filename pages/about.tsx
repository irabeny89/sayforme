import { appData } from "config";

const { about } = appData;

export default function About() {
  return (
    <div>
      <h2>About</h2>
      <p>{about}</p>
    </div>
  );
}
