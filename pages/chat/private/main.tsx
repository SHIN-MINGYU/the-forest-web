import { useMyInfo } from "@hooks/useGetMyInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  PrivateContainer,
  SelectionWindow,
  MainWindow,
} from "@components/private";

import { MainData } from "@type/privateRoom";

const Main = () => {
  const getUser = useMyInfo();
  const { uid, userType, userInfo } = getUser();
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
            <MainWindow data={data} setData={setData} />
          </>
        )}
      </>
    </PrivateContainer>
  );
};

export default Main;
