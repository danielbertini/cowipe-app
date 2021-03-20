import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FormControlLabel, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Picture from "../../atoms/display/picture";
import LinearProgress from "../../atoms/feedback/linearProgress";

const Component = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  }));

  const { t } = useTranslation();
  const classes = useStyles();

  const renderItem = useCallback(() => {
    if (props.uploadStarted) {
      return (
        <>
          <LinearProgress
            color="secondary"
            variant="determinate"
            value={props.progress ? props.progress : 0}
          />
        </>
      );
    } else {
      return (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={props.restricted}
                onChange={(event) =>
                  props.setRestricted(props.data.id, event.target.checked)
                }
              />
            }
            label={t("commons.restricted")}
          />
        </>
      );
    }
  }, [props, t]);

  return (
    <>
      <div className={classes.root}>
        <Picture radius src={props.data.preview} width={`100%`} height={120} />
        <div style={{ width: "100%", marginTop: 5 }}>{renderItem()}</div>
      </div>
    </>
  );
};

export default memo(Component);
