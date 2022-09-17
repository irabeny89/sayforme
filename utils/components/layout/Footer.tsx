import { appData } from "config";

const { appName, year } = appData;

export default function Footer() {
  return (
    <footer className="border-t">
      {appName} &copy; {year}
    </footer>
  );
}
