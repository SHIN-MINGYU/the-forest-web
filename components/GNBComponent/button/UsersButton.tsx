import { useMutation } from "@apollo/client";
import { LOG_OUT } from "@query/userQuery";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillProfile, AiOutlineLogout } from "@components/icon";
import { userInfo } from "@type/userInfo";
import dynamic from "next/dynamic";

type props = {
  userInfo: userInfo;
  userType: string;
};

const UsersButton = ({ userInfo, userType }: props) => {
  const ProfileModal = dynamic(() => import("./ProfileModal"));
  const DropDownContainer = dynamic(
    () => import("./dropdown/DropDownContainer")
  );
  const DropDownContent = dynamic(() => import("./dropdown/DropDownContent"));
  //code spliting

  const router = useRouter();
  const [LogOut] = useMutation(LOG_OUT);
  const { nickname, imgPath } = userInfo;

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
      <div
        onMouseEnter={() => {
          setDropDownVisible(true);
        }}
        onMouseLeave={() => {
          setDropDownVisible(false);
        }}>
        <button className="flex justify-center items-center space-x-2">
          <span>Welcome </span>
          <span className="flex items-center font-bold text-green-600 text-md tracking-wider">
            {imgPath ? (
              <Image
                className="rounded-full"
                src={imgPath}
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
        {dropDownVisible && (
          <DropDownContainer>
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
        )}
      </div>
      {modalVisible && (
        <ProfileModal
          userType={userType}
          userInfo={userInfo}
          hide={() => setModalVisible(false)}
        />
      )}
    </>
  );
};
export default UsersButton;
