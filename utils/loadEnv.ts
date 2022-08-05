export const API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_ENDPOINT
    : process.env.NEXT_PUBLIC_PRODUCTION_API_ENDPOINT;

export const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
    : process.env.NEXT_PUBLIC_PRODUCTION_GRAPHQL_ENDPOINT;

export const SOCKET_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SOCKET_ENDPOINT
    : process.env.NEXT_PUBLIC_PRODUCTION_SOCKET_ENDPOINT;

export const MAIN_PAGE =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_MAIN_PAGE
    : process.env.NEXT_PUBLIC_PRODUCTION_MAIN_PAGE;
