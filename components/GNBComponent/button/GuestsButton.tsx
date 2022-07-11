import { AiFillProfile, AiOutlineLogin } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DropDownContainer, DropDownContent } from "./dropdown";
import ProfileModal from "./ProfileModal";
import { getLocalStorage } from "@hooks/LocalStorage";
import Image from "next/image";

const GuestsButton = () => {
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("Stranger");
  const [profileImg, setProfileImg] = useState<string>("");
  const router = useRouter();

  const transferToLoginPage = () => {
    //dropdown divisible setting
    setDropDownVisible(false);
    //transfer to LoginPage
    router.push("/login");
  };
  useEffect(() => {
    const userInfoStr = getLocalStorage("userInfo");
    if (userInfoStr) {
      setNickname(JSON.parse(userInfoStr).nickname);
      setProfileImg(JSON.parse(userInfoStr).imgPath);
    }
    // if the website value in localStorage what key is userInfo
    // set in state
  }, []);
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
          {profileImg ? (
            <Image
              className="rounded-full"
              src={"data:" + profileImg}
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
        <ProfileModal hide={() => setModalVisible(false)}></ProfileModal>
      )}
    </div>
  );
};

export default GuestsButton;
