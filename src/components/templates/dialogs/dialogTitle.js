import React, { memo } from "react";
import { DialogTitle } from "@material-ui/core";
import {
  ArrowBackRounded as BackIcon,
  CloseRounded as CloseIcon,
} from "@material-ui/icons";

import IconButton from "../../atoms/inputs/iconButton";
import AvatarCompany from "../../molecules/avatars/companyMenu";
import AvatarUser from "../../molecules/avatars/user";

const TemplatesDialogsDialogTitle = (props) => {
  return (
    <>
      <DialogTitle id="form-dialog-title" style={props.style}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItem: "center" }}>
            {props.backButton && (
              <>
                <IconButton onClick={props.backButtonCallback}>
                  <BackIcon fontSize="small" />
                </IconButton>
                <div style={{ width: 10 }} />
              </>
            )}

            {props.user ? (
              <AvatarUser
                status={props.user.online ? 0 : 1}
                src={
                  props?.user?.picture
                    ? `${process.env.REACT_APP_CDN}/pictures/profiles/${props?.user?.picture}-small`
                    : ""
                }
                withoutMenu={true}
              />
            ) : (
              <AvatarCompany withoutMenu={true} />
            )}
          </div>
          <div
            style={{
              width: "80%",
              marginLeft: 10,
              marginRight: 10,
              textAlign: "center",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {props.title}
          </div>
          <div style={{ display: "flex", alignItem: "center" }}>
            {props.backButton && <div style={{ height: 44, width: 54 }} />}
            <IconButton onClick={() => props.open(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
    </>
  );
};

export default memo(TemplatesDialogsDialogTitle);
