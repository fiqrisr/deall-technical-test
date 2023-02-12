import ky from "ky";

export const httpClient = ky.extend({
  prefixUrl: "https://dummyjson.com",
});
