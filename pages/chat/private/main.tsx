// 1. hooks or react/next built-in function
import { useMyInfo } from "@hooks/useGetMyInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// 2. util or hand-made function

// 3. query for graphql

// 4. associated with component
import {
  PrivateContainer,
  SelectionWindow,
  MainWindow,
} from "@components/private";

// 5. types
import { MainData } from "@type/privateRoom.type.";

const Main = () => {
  const getUser = useMyInfo();
  const { userType, userInfo } = getUser();
  const router = useRouter();
  const [data, setData] = useState<MainData>();

  useEffect(() => {
    // if enter this page first, check the user's value
    // the userType is GUEST, replace to main page;
    if (userType == "GUEST") router.replace("/");
  }, [userType, router]);

  return (
    <PrivateContainer>
      <>
        {userType === "USER" && (
          <>
            <SelectionWindow setData={setData} userInfo={userInfo} />
            <MainWindow data={data} setData={setData} userInfo={userInfo} />
          </>
        )}
      </>
    </PrivateContainer>
  );
};

export default Main;
