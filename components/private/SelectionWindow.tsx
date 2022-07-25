import {useState } from "react"
import dynamic from "next/dynamic"

import MenuContainer from "./SelectionWindow/MenuContainer"
import { BsChatRightText, BsPeople } from "react-icons/bs"
import { AiOutlineSetting } from "react-icons/ai"


const SelectionWindow = () =>{
    // mode => change detail components
    const [mode, setMode] = useState("Friends");
    const ModeDetail = dynamic(()=>import(`./SelectionWindow/Details/${mode}`));

    const modeChanger = (mode : string) => {
        setMode(mode);
    }
    return (
        <div className="flex basis-1/4">
            <MenuContainer>
                <BsPeople className="cursor-pointer" onClick={()=>modeChanger("Friends")} size={30}></BsPeople>
                <BsChatRightText className="cursor-pointer"  onClick={()=>modeChanger("ChatList")} values="" size={30}></BsChatRightText>
                <AiOutlineSetting className="cursor-pointer"  onClick={()=>modeChanger("Setting")} size={30}></AiOutlineSetting>
            </MenuContainer>
            <div className="basis-5/6 overflow-y-scroll  
                            scrollbar-thin scrollbar-thumb-green-600 
                            scrollbar-track-gray-100 active:scrollbar-thumb-green-700">
                <ModeDetail></ModeDetail>
            </div>
        </div>
    )
}

export default SelectionWindow