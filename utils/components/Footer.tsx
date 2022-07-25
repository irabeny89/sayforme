import { appData } from "config";

const { appName, year } = appData;

export default function Footer() {
  return (
    <footer>
      {appName} &copy; {year}
    </footer>
  );
}
