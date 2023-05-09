import React, { useEffect, useState } from "react";
import PublicNavigator from "./PublicNavigator";
import PrivateNavigator from "./PrivateNavigator";
import { showToast } from "utils";
import { trans } from "shared/localization";

const Navigation = () => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const authToken = "testtoken";

  useEffect(() => {
    global.showToast = showToast;
    global.trans = trans;
    setTimeout(() => setLoaded(true), 500)
  }, [showToast, trans])

  console.log("global", global);

  if (!loaded) return null
  return authToken ? <PrivateNavigator /> : <PublicNavigator />;
};

export default Navigation;
