import PrivateContainer from "@components/private/PrivateContainer"

const Main = () =>{
    return <PrivateContainer>
        <div className="flex basis-1/4 bg-green-400">
            <div className="flex basis-1/6 bg-red-200 justify-center">
                <span className="p-2"></span>
            </div>
            <div className="basis-5/6">

            </div>
        </div>
        <div className="relative basis-3/4 bg-green-600">
            <div className="absolute w-full h-full bg-red-600"></div> 
            <div className="absolute w-1/5 h-1/5 bottom-0 right-0 bg-green-500 z-50"></div> 
        </div>
    </PrivateContainer>
}

export default Main