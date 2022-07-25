export const error4xx = "Invalid request.";

export const error5xx = "Something went wrong.";

export const envVariables = {
  dbCompass: process.env.DB_COMPASS!,
  tokenSecret: process.env.ENCRYPT_SECRET!,
};

export const appData = {
  appName: "SayforMe",
  intro: [
    "If you want to call someone but you don't want to forget especially because it's their birthday, important message, love message or something, then let SayForMe do it for you. Be a member today and register or login if you're already a member.",
  ],
  year: 2022
};
