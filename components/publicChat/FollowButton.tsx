import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_FOLLOWING,
  SEND_FOLLOW,
  SEND_UNFOLLOW,
} from "../../query/userQuery";

const FollowButton = ({ uid }: { uid: string }) => {
  const { data } = useQuery(GET_FOLLOWING, {
    fetchPolicy: "no-cache",
  });
  const [unFollow] = useMutation(SEND_UNFOLLOW);
  const [follow] = useMutation(SEND_FOLLOW);

  const [followed, setFollowed] = useState<boolean>();

  useEffect(() => {
    setFollowed(data?.UserInfo.following.includes(uid));
  }, [data, uid]);

  return (
    <div onClick={() => setFollowed((prevState) => !prevState)}>
      {followed && (
        <div
          className="flex mt-4 space-x-3 md:mt-6"
          onClick={() => unFollow({ variables: { uid } })}>
          <span className="inline-flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            UnFollow
          </span>
        </div>
      )}
      {!followed && (
        <div
          className="flex mt-4 space-x-3 md:mt-6"
          onClick={() => follow({ variables: { uid } })}>
          <span className="inline-flex cursor-pointer items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Follow
          </span>
        </div>
      )}
    </div>
  );
};
export default FollowButton;
