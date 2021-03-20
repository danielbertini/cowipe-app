import React, { memo, useState, useEffect } from "react";
import { Divider } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  ArrowForwardRounded as NextIcon,
  ArrowBackRounded as BackIcon,
} from "@material-ui/icons";

import IconButton from "../../atoms/inputs/iconButton";
import CircularProgress from "../../atoms/feedback/circularProgress";

const MoleculesSearchSearchBar = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      padding: props.padding ? 15 : 0,
      display: "flex",
      alignItems: "center",
      justifyContent: props.align,
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const [loadingPrevious, setLoadingPrevious] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  useEffect(() => {
    setLoadingPrevious(false);
    setLoadingNext(false);
  }, [props.results]);

  return (
    <>
      {props.divider && <Divider />}
      <div className={classes.root}>
        <IconButton
          disabled={props.skip === 0 || loadingPrevious || loadingNext}
          onClick={() => {
            setLoadingPrevious(true);
            props.setSkip(parseInt(props.skip - props.limit));
          }}
        >
          {loadingPrevious ? (
            <CircularProgress
              size={18}
              style={{ color: theme.palette.text.primary }}
            />
          ) : (
            <BackIcon
              style={{
                color:
                  props.skip === 0
                    ? theme.palette.divider
                    : theme.palette.text.primary,
              }}
            />
          )}
        </IconButton>
        <IconButton
          disabled={props.total < props.limit || loadingPrevious || loadingNext}
          onClick={() => {
            setLoadingNext(true);
            props.setSkip(parseInt(props.skip + props.limit));
          }}
        >
          {loadingNext ? (
            <CircularProgress
              size={18}
              style={{ color: theme.palette.text.primary }}
            />
          ) : (
            <NextIcon
              style={{
                color:
                  props.total < props.limit
                    ? theme.palette.divider
                    : theme.palette.text.primary,
              }}
            />
          )}
        </IconButton>
      </div>
    </>
  );
};

export default memo(MoleculesSearchSearchBar);
