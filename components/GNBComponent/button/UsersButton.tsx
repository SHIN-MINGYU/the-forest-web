import { useMutation } from "@apollo/client";
import { LOG_OUT } from "@query/userQuery";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillProfile, AiOutlineLogout } from "react-icons/ai";
import { userInfoGNB } from "@type/userInfo";
import { DropDownContainer, DropDownContent } from "./dropdown";
import ProfileModal from "./ProfileModal";

type props = {
  data: { UserInfo: userInfoGNB };
};

const UsersButton = ({ data }: props) => {
  const router = useRouter();
  const [LogOut] = useMutation(LOG_OUT);
  const nickname = data.UserInfo.nickname || data.UserInfo.username;
  const profileImg = data.UserInfo.imgPath;
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
        <button
          className="flex justify-center items-center space-x-2"
          onClick={() => setDropDownVisible(!dropDownVisible)}>
          <span>Welcome </span>
          <span className="flex items-center font-bold text-green-600 text-md tracking-wider">
            {profileImg ? (
              <Image
                className="rounded-full"
                src={profileImg}
                width={20}
                height={20}
                layout={"intrinsic"}
                alt={"profileImage"}
              />
            ) : (
              <>
                <Image
                  src="/images/profile.png"
                  width={20}
                  height={20}
                  layout={"intrinsic"}
                  alt={"profileImage"}></Image>
              </>
            )}
            {nickname} !
          </span>
        </button>
        <DropDownContainer visible={dropDownVisible}>
          {/* container start */}
          <DropDownContent
            Icon={AiFillProfile}
            content="myprofile"
            onClick={() => setModalVisible(true)}
          />
          <DropDownContent
            Icon={AiOutlineLogout}
            content="Logout"
            onClick={userLogout}
          />
          {/* container end */}
        </DropDownContainer>
      </div>
      {modalVisible && (
        <ProfileModal
          prevUser={data.UserInfo}
          hide={() => setModalVisible(false)}
        />
      )}
    </>
  );
};
export default UsersButton;
