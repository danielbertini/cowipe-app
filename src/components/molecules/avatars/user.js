import React, { memo } from "react";
import { PersonRounded as UserIcon } from "@material-ui/icons";

import Avatar from "../../atoms/display/avatar";

const Component = (props) => {
  return (
    <>
      <Avatar src={props.src} style={{ width: 44, height: 44 }}>
        <UserIcon style={{ color: "#fff" }} />
      </Avatar>
    </>
  );
};

export default memo(Component);
