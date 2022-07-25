import { useMyInfo } from "@hooks/useGetMyInfo";
import Image from "next/image";

const Friends = () =>{
    const {userInfo,userType} = useMyInfo()();
    return (
        <>
            <div className="flex h-1/6">
                {/* <div className="flex basis-1/12 border border-gray-300 justify-between px-2">
                    <span>me</span>
                    <span className="cursor-pointer">▾</span>
                </div> */}
                    <div className="flex flex-col basis-1/4 justify-center items-center">
                        <Image className="border border-red-100" src={userInfo.imgPath || ""} width={60} height={60} alt="profile Img"></Image>
                        <span>{userInfo.nickname}</span>
                    </div>
                    <div className="flex flex-col basis 3/4 justify-center items-center">
                        <span>description</span>
                        <span className="text-gray-400">{userInfo.description}</span>
                    </div>
            </div>
            <div className="flex basis-1/12 border border-gray-300 justify-between px-2">
                    <span>F4F(0)</span>
                    <span className="cursor-pointer">▾</span>
            </div>
            {/* freinds cards */} 
        </>
    )
}

export default Friends;