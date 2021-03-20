import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Backdrop, Grow } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  CloseRounded as CloseIcon,
  RotateLeftRounded as RotateLeftIcon,
  RotateRightRounded as RotateRightIcon,
  ZoomInRounded as ZoomInIcon,
  ZoomOutRounded as ZoomOutIcon,
  ArrowForwardRounded as NextIcon,
  ArrowBackRounded as BackIcon,
} from "@material-ui/icons";

import IconButton from "../../atoms/inputs/iconButton";
import CircularProgress from "../../atoms/feedback/circularProgress";

const Component = (props) => {
  const theme = useTheme();
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pictures] = useState(props.pictures);
  const [currentPicture, setCurrentPicture] = useState();
  const [totalPictures] = useState(props.pictures.length);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 5000,
      backgroundColor: theme.palette.backdrop,
    },
    body: {
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 6000,
      padding: 30,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    stage: {
      zIndex: 6000,
      padding: 30,
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      height: 64,
      zIndex: 7000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      zIndex: 7000,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    footer: {
      zIndex: 7000,
      height: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflowX: "auto",
      scrollBehavior: "smooth",
      "&::-webkit-scrollbar": {
        display: "none",
        width: 5,
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.primary.main,
      },
    },
    pictureFrame: {
      zIndex: 6000,
      transition: "all 200ms ease-in-out",
      transform: `scale(${zoom}) rotate(${rotate}deg)`,
    },
    picture: {
      zIndex: 6000,
      width: width,
      height: height,
      borderRadius: theme.shape.borderRadius * 2,
      boxShadow: theme.shadows[12],
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    if (isMobile) {
      setWidth(window.innerWidth - 15);
      setHeight(window.innerWidth - 15);
    }
  }, []);

  useEffect(() => {
    if (pictures.length > 0) {
      for (var x = 0; x < pictures.length; x++) {
        if (pictures[x].filename === props.filename) {
          setCurrentPicture(parseInt(x));
        }
      }
    }
  }, [pictures, props.filename]);

  const previousPicture = () => {
    setLoading(true);
    if (parseInt(currentPicture) === 0) {
      setCurrentPicture(parseInt(totalPictures - 1));
    } else {
      setCurrentPicture(parseInt(currentPicture - 1));
    }
  };

  const nextPicture = () => {
    setLoading(true);
    if (parseInt(currentPicture) === parseInt(totalPictures - 1)) {
      setCurrentPicture(parseInt(0));
    } else {
      setCurrentPicture(parseInt(currentPicture + 1));
    }
  };

  const renderPicture = () => {
    if (pictures[parseInt(currentPicture)]) {
      return (
        <>
          <div className={classes.pictureFrame}>
            <Grow in={loading ? false : true}>
              <img
                className={classes.picture}
                width={width}
                height={height}
                style={{ display: loading ? "none" : "block" }}
                onLoad={() => {
                  setLoading(false);
                }}
                src={`${process.env.REACT_APP_CDN}/pictures/${props.userId}/${
                  pictures[parseInt(currentPicture)].filename
                }`}
                alt=""
              />
            </Grow>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={true}
        onClick={(e) => {
          e.stopPropagation();
          props.close(false);
        }}
      >
        <div className={classes.stage}>
          <CircularProgress
            size={120}
            thickness={1}
            style={{
              display: loading ? "block" : "none",
              position: "absolute",
              color: theme.palette.secondary.main,
            }}
          />
          {renderPicture()}
        </div>
        <div className={classes.body}>
          <div className={classes.header}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  zoom < 2 && setZoom(zoom + 0.25);
                }}
              >
                <ZoomInIcon style={{ color: theme.palette.secondary.main }} />
              </IconButton>
              <div style={{ width: 15 }} />
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  zoom > 0.5 && setZoom(zoom - 0.25);
                }}
              >
                <ZoomOutIcon style={{ color: theme.palette.secondary.main }} />
              </IconButton>
              <div style={{ width: 15 }} />
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setRotate(rotate - 90);
                }}
              >
                <RotateLeftIcon
                  style={{ color: theme.palette.secondary.main }}
                />
              </IconButton>
              <div style={{ width: 15 }} />
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setRotate(rotate + 90);
                }}
              >
                <RotateRightIcon
                  style={{ color: theme.palette.secondary.main }}
                />
              </IconButton>
              <div style={{ width: 15 }} />
            </div>
            <div>
              <IconButton
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  props.close(false);
                }}
              >
                <CloseIcon style={{ color: theme.palette.secondary.main }} />
              </IconButton>
            </div>
          </div>
          <div className={classes.content}></div>
          <div className={classes.footer}>
            <IconButton
              color="secondary"
              disabled={loading}
              style={{ backgroundColor: theme.palette.secondary.main }}
              onClick={(e) => {
                e.stopPropagation();
                previousPicture();
              }}
            >
              <BackIcon style={{ color: "#fff" }} />
            </IconButton>
            <div style={{ width: 30 }} />
            <IconButton
              color="secondary"
              disabled={loading}
              style={{ backgroundColor: theme.palette.secondary.main }}
              onClick={(e) => {
                e.stopPropagation();
                nextPicture();
              }}
            >
              <NextIcon style={{ color: "#fff" }} />
            </IconButton>
          </div>
        </div>
      </Backdrop>
    </>
  );
};

export default Component;
