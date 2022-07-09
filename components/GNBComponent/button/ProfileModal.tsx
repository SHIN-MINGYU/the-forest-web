import { ChangeEvent, useCallback, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { MdTransgender, MdOutlineDescription } from "react-icons/md";
import Image from "next/image";
import InfoInput from "../../signUp/InfoInput";
import useInput from "@hooks/useInput";
import { FaRegUserCircle } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_INFO } from "@query/userQuery";
import { useRouter } from "next/router";
import { getLocalStorage, setLocalStorage } from "@hooks/LocalStorage";

type props = {
  hide: () => void;
};

const ProfileModal = ({ hide }: props) => {
  const router = useRouter();
  const prevUserInfoStr = getLocalStorage("userInfo");
  const prevUserInfo = JSON.parse(prevUserInfoStr || "{}");
  /* 
  prevUserInfo and prevUserInfo variables are get userInfoValue 
  in localStorage and set the result at state
  */
  const nickname = useInput(prevUserInfo.nickname || "");
  const gender = useInput(prevUserInfo.gender || "");
  const [description, setDiscription] = useState<string>(
    prevUserInfo.description || ""
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const [avatarUri, setAvatarUri] = useState<string>(prevUserInfo.img || "");

  const [updateInfo, { data, loading, error }] = useMutation(UPDATE_USER_INFO, {
    variables: {
      nickname: nickname.value,
      gender: gender.value,
      description: description,
    },
  });

  const selectFile = useCallback(() => {
    // this function occured when you clicked icon
    fileInput.current?.click();
  }, [fileInput]);

  const profileImgChanger = (e: ChangeEvent<HTMLInputElement>) => {
    // <input type=file>'s onChange event
    if (e.target.files && e.target.files[0]) {
      // create FilReader's instance
      const reader = new FileReader();
      reader.onloadend = () => {
        // if read is done => reader.result have the img's uri
        // so set the base64String to avatarUri state
        const base64String = String(reader.result).replace("data:", "");
        setAvatarUri(base64String);
      };
      // occur reader.onload event occur
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateUserInfo: () => Promise<void> = useCallback(async () => {
    // userInfo submit event
    try {
      // first request to graphql server
      await updateInfo();
      return;
    } catch (err: any) {
      if (err.message === "GUEST") {
        //if err occur what err.message = GUEST
        const updateUserInfo = {
          nickname: nickname.value,
          gender: gender.value,
          description: description,
          img: avatarUri,
        };
        setLocalStorage("userInfo", JSON.stringify(updateUserInfo));
        //then, set in localStorage the value
        return;
      }
    } finally {
      // reload
      router.reload();
    }
  }, [
    updateInfo,
    nickname.value,
    gender.value,
    description,
    avatarUri,
    router,
  ]);

  return (
    /* background blur window */
    <div
      className="overflow-auto transition-all
      fixed inset-0 flex justify-center items-center backdrop-blur-sm">
      {/* main modal window */}
      <div className="relative space-y-4 flex flex-col w-1/3 min-w-fit min-h-fit p-6 bg-white dark:text-black">
        <div className="flex justify-between items-center">
          {/* title */}
          <p className="lg:text-xl md:text-lg sm:text-md font-bold">
            Edit Your Profile!
          </p>
          <AiOutlineClose
            onClick={hide}
            className="lg:text-3xl md:text-2xl sm:text-xl cursor-pointer"></AiOutlineClose>
        </div>
        <div className="space-y-6">
          {/* main input */}
          {avatarUri ? (
            /* if avatarUri is exist */
            <div
              className={
                "rounded-full m-auto cursor-pointer border border-black overflow-hidden "
              }
              style={{ width: "96px", height: "96px" }}>
              <Image
                onClick={(e) => {
                  e.preventDefault();
                  selectFile();
                }}
                alt="profile"
                width={96}
                height={96}
                layout="responsive"
                src={"data:" + avatarUri}></Image>
            </div>
          ) : (
            /* if avatarUri isn't exist */
            <BsPersonCircle
              onClick={(e) => {
                e.preventDefault();
                selectFile();
              }}
              className="m-auto cursor-pointer"
              size={96}></BsPersonCircle>
          )}
          <input
            className="hidden"
            accept=".png , .svg , .jpg, .jpeg"
            ref={fileInput}
            type="file"
            onChange={profileImgChanger}></input>
          <InfoInput
            Icon={FaRegUserCircle}
            stateHandler={nickname}
            label="nickname"></InfoInput>
          <InfoInput
            Icon={MdTransgender}
            stateHandler={gender}
            label="gender"></InfoInput>
          <div>
            <label
              htmlFor="introduce"
              className="flex space-x-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              <MdOutlineDescription size={20} />
              <span>introduce</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDiscription(e.target.value)}
              id="introduce"
              rows={4}
              className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="This message show when if you start random chatting"></textarea>
          </div>
        </div>
        {/* modal's tail */}
        <div>
          <button
            onClick={() => updateUserInfo()}
            className="w-full bg-blue-700 text-white ">
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;