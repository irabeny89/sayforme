export const error4xx = "Invalid request.";

export const error5xx = "Something went wrong.";

export const SAYFORMETOKEN = "sayforme";

export const envVariables = {
  dbCompass: process.env.DB_COMPASS!,
  tokenSecret:
    process.env.ENCRYPT_SECRET! || process.env.NEXT_PUBLIC_ENCRYPT_SECRET!,
};

export const appData = {
  appName: "SayforMe",
  version: "1.0",
  intro: [
    "If you want to call someone but you don't want to forget especially because it's their birthday, love message or something, then let SayForMe do it for you. Be a member today and register or login if you're already a member.",
  ],
  about: [
    "SayForMe is a call booking/reservation app designed to help people make calls that they don't want to make or couldn't make, perhaps because of tight schedules or for some other reasons.",
  ],
  year: "2022",
};
