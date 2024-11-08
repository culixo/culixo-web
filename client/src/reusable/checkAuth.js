import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";
import Loading from "./loading";
import { GlobalContext } from "../context/GlobalContext";

export default function CheckAuth(props) {
  const router = useRouter();
  const { user } = useContext(GlobalContext);
  const [showAuth, setShowAuth] = useState(true);
  useEffect(() => {
    //console.log(props.user, props.userToken, '------------');
    if (!user?.token) {
      router.push("/auth");
      return;
    }
    // else if (props.path) {
    //   const path = getStepPath(user);
    //   if (props.path !== path) {
    //     router.push(path);
    //     return;
    //   }
    // }

    setShowAuth(false);
  }, []);

  return showAuth ? <Loading /> : <>{props.children}</>;
}
