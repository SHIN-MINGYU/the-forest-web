// 1. hooks or react/next and ...etc built-in function
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

// 2. util or hand-made function
import { API_ENDPOINT } from "@utils/loadEnv";

// 3. query for graphql
import { LOG_OUT } from "@query/userQuery";

// 4. associated with component
import { AiFillProfile, AiOutlineLogout } from "@components/icon";

// 5. types
import { IUser } from "types/user.interface";

type Props = IUser;

const UsersButton = ({ userInfo, userType }: Props) => {
  // @dynamic-import-start
  const ProfileModal = dynamic(() => import("./ProfileModal"));
  const DropDownContainer = dynamic(
    () => import("./dropdown/DropDownContainer")
  );
  const DropDownContent = dynamic(() => import("./dropdown/DropDownContent"));
  // @dynamic-import-end

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
          <span className="flex items-center font-bold text-green-600 text-md tracking-wider space-x-2">
            {imgPath ? (
              <Image
                className="rounded-full"
                src={imgPath || API_ENDPOINT! + "img/profile.png"}
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
            <span>{nickname} </span>!
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
