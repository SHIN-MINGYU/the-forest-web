import { useMutation } from "@apollo/client";
import { LOG_OUT } from "@query/userQuery";
import { useRouter } from "next/router";

type props = {
  data: {
    UserInfo: {
      username: string;
    };
  };
};

const UsersButton = ({ data }: props) => {
  const router = useRouter();
  const [LogOut] = useMutation(LOG_OUT);
  return (
    <button
      onClick={() => {
        LogOut();
        localStorage.removeItem("accessToken");
        router.reload();
      }}>
      Welcome {data.UserInfo.username} !
    </button>
  );
};
export default UsersButton;
