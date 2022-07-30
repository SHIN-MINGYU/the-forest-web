import { useMyInfo } from "@hooks/useGetMyInfo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { PrivateContainer, SelectionWindow } from "@components/private";
import MainWindow from "@components/private/MainWindow";

import { MainData } from "@type/privateRoom";

const Main = () => {
  const getUser = useMyInfo();
  const router = useRouter();
  const [data, setData] = useState<MainData>();

  useEffect(() => {
    // if enter this page first, check the user's value
    const { userType } = getUser();
    // the userType is GUEST, replace to main page;
    if (userType == "GUEST") router.replace("/");
  }, [getUser, router]);

  return (
    <PrivateContainer>
      <SelectionWindow setData={setData} />
      <MainWindow data={data} />
    </PrivateContainer>
  );
};

export default Main;
