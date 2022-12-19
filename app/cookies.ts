import { createCookie, createCookieSessionStorage, } from "@remix-run/node";

export const userPrefs = createCookie("user-prefs", {
    maxAge: 604_800, // one week
});


export const cart = createCookieSessionStorage({
    cookie: {
        maxAge: 604_800, // one week
    }
});