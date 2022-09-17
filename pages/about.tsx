import { appData } from "config";

const { about } = appData;

export default function About() {
  return (
    <div className="min-h-screen mt-10 space-y-10">
      <h2 className="text-xl underline">About</h2>
      <p className="space-y-5 sm:w-1/2 mx-auto">{about}</p>
    </div>
  );
}
