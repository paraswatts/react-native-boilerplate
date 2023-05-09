import React, { useEffect, useState } from "react";
import PublicNavigator from "./PublicNavigator";
import PrivateNavigator from "./PrivateNavigator";

const Navigation = () => {
  const authToken = "testtoken";

  return authToken ? <PrivateNavigator /> : <PublicNavigator />;
};

export default Navigation;
