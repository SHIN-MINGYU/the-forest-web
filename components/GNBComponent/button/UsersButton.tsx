import { useMutation } from "@apollo/client";
import { LOG_OUT } from "@query/userQuery";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillProfile, AiOutlineLogout } from "react-icons/ai";
import { DropDownContainer, DropDownContent } from "./dropdown";
import ProfileModal from "./ProfileModal";

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
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const userLogout = () => {
    // send Logout mutaition
    LogOut();
    //clean accessToken
    localStorage.removeItem("accessToken");
    //reloading page
    router.reload();
  };

  return (
    <>
      <div>
        <button onClick={() => setDropDownVisible(!dropDownVisible)}>
          Welcome {data.UserInfo.username} !
        </button>
        <DropDownContainer visible={dropDownVisible}>
          {/* container start */}
          <DropDownContent Icon={AiFillProfile} content="myprofile" />
          <DropDownContent
            Icon={AiOutlineLogout}
            content="Logout"
            onClick={userLogout}
          />
          {/* container end */}
        </DropDownContainer>
      </div>
      {modalVisible && <ProfileModal hide={() => setModalVisible(false)} />}
    </>
  );
};
export default UsersButton;
