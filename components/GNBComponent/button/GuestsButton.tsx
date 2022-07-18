import { AiFillProfile, AiOutlineLogin } from "react-icons/ai";
import { useRouter } from "next/router";
import { useState } from "react";
import { DropDownContainer, DropDownContent } from "./dropdown";
import ProfileModal from "./ProfileModal";
import Image from "next/image";
import { userInfo } from "@type/userInfo";

type props = {
  userType: string;
  userInfo: userInfo;
};

const GuestsButton = ({ userType, userInfo }: props) => {
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
    <div>
      <button
        className="flex justify-center items-center space-x-2"
        onClick={() => {
          setDropDownVisible(!dropDownVisible);
        }}>
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
      <DropDownContainer visible={dropDownVisible}>
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
      {modalVisible && (
        <ProfileModal
          userType={userType}
          userInfo={userInfo}
          hide={() => setModalVisible(false)}></ProfileModal>
      )}
    </div>
  );
};

export default GuestsButton;
