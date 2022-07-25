import { useMyInfo } from "@hooks/useGetMyInfo"
import { useRouter } from "next/router";
import { useEffect } from "react"

import {PrivateContainer, SelectionWindow} from "@components/private"

const Main = () =>{
    const getUser = useMyInfo();
    const router = useRouter();

    useEffect(()=>{
        // if enter this page first, check the user's value
        const {userType} =getUser();
        // the userType is GUEST, replace to main page;
        if(userType == "GUEST")router.replace("/")
    },[getUser,router])
    
    return <PrivateContainer>
            <SelectionWindow />
        <div className="relative basis-3/4 bg-green-600">
            <div className="absolute w-full h-full bg-red-600">
                </div> 
            <div className="absolute w-1/5 h-1/5 bottom-0 right-0 bg-green-500 z-50"></div> 
        </div>
    </PrivateContainer>
}

export default Main