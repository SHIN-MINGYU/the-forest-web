import { DARK, LIGHT } from "../type/theme";

export const dark = () => ({ type: DARK, payload: "dark" });
export const light = () => ({ type: LIGHT, payload: "light" });
