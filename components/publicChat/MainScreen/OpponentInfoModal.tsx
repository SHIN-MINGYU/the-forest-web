import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import { UserFromHook } from "../../../types/user.type";
import ModalContainer from "../../modal/ModalContainer";
import FollowButton from "../FollowButton";

type Props = {
  opponentInfo: UserFromHook;
  close: () => void;
};

const OpponentInfoModal = ({ opponentInfo, close }: Props) => {
  return (
    <ModalContainer>
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <MdOutlineClose
            className="cursor-pointer"
            onClick={close}></MdOutlineClose>
        </div>
        <div className="flex flex-col items-center pb-10">
          <Image
            className="mb-3 w-24 h-24 rounded-full shadow-lg"
            width={90}
            height={90}
            src={opponentInfo.userInfo.imgPath}
            alt="Profile image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {opponentInfo.userInfo.nickname}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {opponentInfo.userInfo.description}
          </span>
          <FollowButton uid={opponentInfo.userInfo._id}></FollowButton>
        </div>
      </div>
    </ModalContainer>
  );
};

export default OpponentInfoModal;
