import { DARK, LIGHT } from "../type/theme";
import { dark, light } from "../actions/theme";
type themeState = Readonly<{
  theme: string;
}>;

const initialState: themeState = {
  theme: "light",
};

type LightAction = ReturnType<typeof light>;
type DarkAction = ReturnType<typeof dark>;
type Actions = LightAction | DarkAction;

const page = (
  state: themeState = initialState,
  action: Actions
): themeState => {
  console.log(action.type);
  switch (action.type) {
    case LIGHT:
      return {
        ...state,
        theme: action.payload,
      };
    case DARK:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default page;
