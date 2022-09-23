export const error4xx = "Invalid request.";

export const error5xx = "Something went wrong.";

export const SAYFORME_TOKEN_KEY = "sayforme";

export const SAYFORME_THEME_KEY = "sayforme_theme";

export const envVariables = {
  dbAtlasVercel: process.env.MONGODB_URI!,
  dbAtlas: process.env.MONGO_ATLAS!,
  dbCompass: process.env.DB_COMPASS!,
  tokenSecret:
    process.env.ENCRYPT_SECRET! || process.env.NEXT_PUBLIC_ENCRYPT_SECRET!,
};

export const appData = {
  appName: "SayForMe",
  version: "0.1",
  intro: [
    "If you want to call someone but you don't want to forget especially because it's their birthday, perhaps, love message or something, then let SayForMe do it for you.",
    "Be a member today and register or login if you're already a member.",
  ],
  about: [
    "SayForMe is a call booking/reservation app designed to help people make calls that they don't want to make or couldn't make, perhaps because of tight schedules or for some other reasons.",
  ],
  year: "2022",
  pages: [
    { title: "Home", route: "/" },
    { title: "Register", route: "/register" },
    { title: "Login", route: "/login" },
    { title: "Users", route: "/users" },
    { title: "Bookings", route: "/bookings" },
    { title: "Profile", route: "/profile" },
    { title: "About", route: "/about" },
  ],
  adminAccessPages: ["Users"],
  userPrivatePages: ["Bookings", "Profile"],
  publicPages: ["Home", "Register", "Login", "About"],
};
