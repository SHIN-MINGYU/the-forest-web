import { NextRouter } from "next/router";

type query = {
  category: string;
  type: string;
  router: NextRouter;
};

export const transferToLoading = async ({ category, type, router }: query) => {
  // transfre to loading page what have "type" query
  router.push(
    {
      pathname: "/chat/loading",
      query: {
        category,
        type,
      },
    },
    "/chat/loading"
  );
};
