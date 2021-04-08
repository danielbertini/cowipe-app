import React, { useState, useEffect, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { v4 as uuid } from "uuid";
import filesize from "filesize";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Button,
} from "@material-ui/core";

import api from "../../../services/api";
import Info from "../../atoms/display/info";
import CircularProgress from "../../atoms/feedback/circularProgress";
import DialogTitle from "../dialogs/dialogTitle";
import ListItemToUpload from "../../organisms/pictures/listItemToUpload";
import LinearProgress from "../../atoms/feedback/linearProgress";

const TemplatesDialogsPicturesUpload = (props) => {
  const { t } = useTranslation();
  const [preloading, setPreloading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [numFiles, setNumfiles] = useState(0);
  const [maxFiles] = useState(10);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [picturesToUpload, setPicturesToUpload] = useState([]);
  const [plan, setPlan] = useState([]);
  const [total, setTotal] = useState();
  const [picturesToUploadProgress, setPicturesToUploadProgress] = useState([]);
  const loadingRef = useRef([]);

  const getPlan = () => {
    api({ method: "GET", url: `user/getPlan` }).then((response) => {
      setPreloading(false);
      if (response.data.success) {
        setPlan(response.data.result);
      }
    });
  };

  const getUserTotalPictures = () => {
    api({ method: "GET", url: `user/pictures/getTotal` }).then((response) => {
      setPreloading(false);
      if (response.data.success) {
        setTotal(response.data.result);
      }
    });
  };

  useEffect(() => {
    if (picturesToUpload?.length === 0) {
      getPlan();
      getUserTotalPictures();
    }
  }, [picturesToUpload]);

  useEffect(() => {
    if (picturesToUpload?.length === numFiles) {
      setLoading(false);
    }
    if (picturesToUpload?.length === 0) {
      setUploadStarted(false);
    }
  }, [numFiles, picturesToUpload]);

  const calculateSize = (img, maxWidth, maxHeight) => {
    let width = img.width;
    let height = img.height;
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }
    return [width, height];
  };

  const handleSelectedFiles = (event) => {
    setPicturesToUpload([]);
    setPicturesToUploadProgress([]);
    var available = parseInt(plan?.limits?.pictures - total);
    var qty = available > 10 ? maxFiles : available;
    let numFiles = event.target.files.length;
    if (numFiles > qty) {
      setNumfiles(qty);
      numFiles = qty;
    } else {
      setNumfiles(numFiles);
    }
    for (let x = 0; x < numFiles; x++) {
      const blobURL = URL.createObjectURL(event.target.files[x]);
      const preview = new Image();
      preview.src = blobURL;
      preview.onerror = (error) => {
        URL.revokeObjectURL(blobURL);
        alert(error);
      };
      preview.onload = () => {
        const [newWidth, newHeight] = calculateSize(preview, 1000, 1000);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(preview, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(blobURL);
            const newBlobURL = URL.createObjectURL(blob);
            const newPreview = new Image(1000, 1000);
            newPreview.src = newBlobURL;
            newPreview.onerror = () => {
              URL.revokeObjectURL(newBlobURL);
            };
            newPreview.onload = () => {
              let id = uuid();
              loadingRef.current[id] = 0;
              setPicturesToUpload((picturesToUpload) => [
                ...picturesToUpload,
                {
                  id: id,
                  file: event.target.files[x],
                  name: event.target.files[x].name,
                  size: filesize(event.target.files[x].size),
                  preview: newPreview.src,
                  blob: blob,
                  restricted: false,
                },
              ]);
            };
          },
          "image/jpeg",
          1
        );
      };
    }
  };

  const processUpload = () => {
    setUploadStarted(true);
    picturesToUpload?.map((el) => {
      const data = new FormData();
      data.append("restricted", el.restricted);
      data.append("file", el.blob, el.id);
      const result = api.post("pictures/upload", data, {
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          loadingRef.current[el.id] = percentCompleted;
          setPicturesToUploadProgress(
            picturesToUploadProgress.map((item) =>
              item.id === el.id
                ? { ...item, id: item.id, progress: percentCompleted }
                : { ...item, id: item.id, progress: item.progress }
            )
          );
        },
      });
      return result;
    });
  };

  const handleSetRestricted = (id, restricted) => {
    setPicturesToUpload(
      picturesToUpload.map((item) =>
        item.id === id ? { ...item, restricted: restricted } : item
      )
    );
  };

  const renderContentToUpload = () => {
    if (picturesToUpload.length > 0) {
      return picturesToUpload.map((el) => {
        if (loadingRef.current[el.id] === 100) {
          const newList = picturesToUpload.filter((item) => item.id !== el.id);
          const newList2 = picturesToUploadProgress.filter(
            (item) => item.id !== el.id
          );
          setPicturesToUpload(newList);
          setPicturesToUploadProgress(newList2);
          return <></>;
        } else {
          return (
            <Grid item xl={3} lg={3} md={3} sm={6} xs={6} key={uuid()}>
              <ListItemToUpload
                data={el}
                key={el.id}
                progress={loadingRef.current[el.id]}
                uploadStarted={uploadStarted}
                restricted={el.restricted}
                setRestricted={handleSetRestricted}
              />
            </Grid>
          );
        }
      });
    } else {
      return null;
    }
  };

  const renderUploadActions = () => {
    if (picturesToUpload?.length > 0) {
      if (uploadStarted || loading || picturesToUpload?.length < numFiles) {
        return (
          <DialogActions>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              disabled={true}
              onClick={() => processUpload()}
            >
              <CircularProgress size={25} color="secondary" />
            </Button>
          </DialogActions>
        );
      } else {
        return (
          <DialogActions>
            <Button
              size="large"
              color="secondary"
              onClick={() => setPicturesToUpload([])}
            >
              {t("buttons.cancel")}
            </Button>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              disabled={loading}
              onClick={() => processUpload()}
            >
              {t("buttons.send")}
            </Button>
          </DialogActions>
        );
      }
    } else {
      return (
        <DialogActions>
          <input
            multiple
            accept="image/*"
            type="file"
            id="contained-button-file"
            style={{ display: "none" }}
            onChange={handleSelectedFiles}
          />
          <label htmlFor="contained-button-file">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              component="span"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={25} color="secondary" />
              ) : (
                t("buttons.select")
              )}
            </Button>
          </label>
        </DialogActions>
      );
    }
  };

  const renderLimit = () => {
    var available = parseInt(plan?.limits?.pictures - total);
    var qty = available > 10 ? maxFiles : available;
    if (qty > 0) {
      return (
        <>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Info
              text={t("dialogs.picturesUpload.description", {
                qty: qty,
              })}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Info text={t("alerts.pictureLimit")} />
          </Grid>
        </>
      );
    }
  };

  const renderContent = () => {
    var available = parseInt(plan?.limits?.pictures - total);
    var qty = available > 10 ? maxFiles : available;
    if (preloading) {
      return (
        <>
          <DialogContent style={{ zIndex: 9 }}>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <DialogContent>
            <Grid container direction="row" spacing={2}>
              {plan?.limits?.pictures &&
                picturesToUpload?.length === 0 &&
                renderLimit()}
              {renderContentToUpload()}
            </Grid>
          </DialogContent>
          {qty > 0 && renderUploadActions()}
        </>
      );
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
        open={props.open ? true : false}
        onClose={() => props.onClose(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          title={t("commons.addPictures")}
          open={() => props.onClose(false)}
        />
        {renderContent()}
      </Dialog>
    </>
  );
};

export default memo(TemplatesDialogsPicturesUpload);
