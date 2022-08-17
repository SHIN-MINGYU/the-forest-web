// 1. hooks or react/next and ...etc built-in function
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import { AiFillProfile, AiOutlineLogin } from "react-icons/ai";

// 5. types
import { IGuest } from "types/user.interface";
import PortalToGNB from "../../modal/PortalToGNB";
type Props = IGuest;

const GuestsButton = ({ userType, userInfo }: Props) => {
  // @dynamic-import-start
  const ProfileModal = dynamic(() => import("./ProfileModal"));
  const DropDownContainer = dynamic(
    () => import("./dropdown/DropDownContainer")
  );
  const DropDownContent = dynamic(() => import("./dropdown/DropDownContent"));
  // @dynamic-import-end

  const router = useRouter();
  const { nickname, imgPath } = userInfo;
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const transferToLoginPage = () => {
    //dropdown divisible setting
    setDropDownVisible(false);
    //transfer to LoginPage
    router.push("/login");
  };

  return (
    <div
      onMouseEnter={() => {
        setDropDownVisible(true);
      }}
      onMouseLeave={() => {
        setDropDownVisible(false);
      }}>
      <button className="flex justify-center items-center space-x-2">
        {/* 
           dropdown toggler
           */}
        <span>Hello</span>
        <span className="flex items-center font-bold text-green-600 text-md tracking-wider">
          <Image
            className="rounded-full"
            src={imgPath}
            width={20}
            height={20}
            layout={"intrinsic"}
            alt={"profileImage"}
          />
          {nickname}!
        </span>
      </button>
      {dropDownVisible && (
        <DropDownContainer>
          {/* container start */}
          <DropDownContent
            Icon={AiFillProfile}
            content="my profile"
            onClick={() => setModalVisible(true)}></DropDownContent>
          <DropDownContent
            Icon={AiOutlineLogin}
            content="Login"
            onClick={transferToLoginPage}></DropDownContent>
          {/* container end */}
        </DropDownContainer>
      )}
      <PortalToGNB>
        <>
          {modalVisible && (
            <ProfileModal
              userType={userType}
              userInfo={userInfo}
              hide={() => setModalVisible(false)}></ProfileModal>
          )}
        </>
      </PortalToGNB>
    </div>
  );
};

export default GuestsButton;
