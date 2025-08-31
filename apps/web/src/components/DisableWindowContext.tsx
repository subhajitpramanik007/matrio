"use client";

import * as React from "react";

export const DisableWindowContext: React.FC = ({}) => {
  React.useEffect(() => {
    function disableContextMenu(e: MouseEvent) {
      e.preventDefault();
    }

    document.addEventListener("contextmenu", disableContextMenu);
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return <></>;
};
