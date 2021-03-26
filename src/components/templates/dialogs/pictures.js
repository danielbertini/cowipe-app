import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import { useTheme } from "@material-ui/core/styles";
import { v4 as uuid } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  Badge,
} from "@material-ui/core";
import {
  RefreshRounded as RefreshIcon,
  DeleteRounded as DeleteIcon,
} from "@material-ui/icons";
import { useSnackbar } from "notistack";

import api from "../../../services/api";
import LinearProgress from "../../atoms/feedback/linearProgress";
import CircularProgress from "../../atoms/feedback/circularProgress";
import AlertDialog from "../../atoms/feedback/alertDialog";
import DialogTitle from "../dialogs/dialogTitle";
import Info from "../../atoms/display/info";
import ListItemToEdit from "../../organisms/pictures/listItemToEdit";
import MoleculesSearchSearchBar from "../../molecules/search/searchBar";
import IconButton from "../../atoms/inputs/iconButton";

import PicturesUpload from "./picturesUpload";

const Component = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [refreshing, setRefreshing] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(24);
  const [total, setTotal] = useState(0);

  const getPictures = useCallback(() => {
    api({ method: "GET", url: `pictures/get/${skip}/${limit}` })
      .then((response) => {
        setPreLoading(false);
        setRefreshing(false);
        if (response.data.success) {
          setPictures(response.data.result);
          setTotal(response?.data?.result?.length);
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, { variant: "error" });
          }
        }
      })
      .catch((error) => {
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
        setRefreshing(false);
        setTimeout(() => {
          props.open(false);
        }, 3000);
      });
  }, [enqueueSnackbar, limit, props, skip, t]);

  const deletePictures = useCallback(() => {
    setLoadingDelete(true);
    api({ method: "delete", url: `pictures/delete` })
      .then((response) => {
        setLoadingDelete(false);
        if (response.data.success) {
          enqueueSnackbar(t("alerts.picturesRemoved"), { variant: "success" });
          getPictures();
        } else {
          if (response.data.message) {
            enqueueSnackbar(response.data.message, { variant: "error" });
          }
        }
      })
      .catch((error) => {
        enqueueSnackbar(t("alerts.unavailableService"), { variant: "error" });
        setTimeout(() => {
          props.open(false);
        }, 3000);
      });
  }, [enqueueSnackbar, getPictures, props, t]);

  useEffect(() => {
    getPictures();
  }, [getPictures]);

  const handleRestrictedChange = useCallback(
    (id, value) => {
      setPictures(
        pictures.map((item) =>
          item._id === id ? { ...item, restricted: value } : { ...item }
        )
      );
    },
    [pictures]
  );

  const handleSelectedChange = useCallback(
    (id, value) => {
      setPictures(
        pictures.map((item) =>
          item._id === id ? { ...item, selected: value } : { ...item }
        )
      );
    },
    [pictures]
  );

  const countSelectedPictures = useCallback(() => {
    let total = 0;
    pictures.map((el) => {
      return el.selected && (total = total + 1);
    });
    return total;
  }, [pictures]);

  const renderContentGallery = useCallback(() => {
    if (pictures?.length > 0) {
      return pictures.map((el) => {
        return (
          <Grid item xl={3} lg={3} md={3} sm={6} xs={6} key={uuid()}>
            <ListItemToEdit
              data={el}
              key={el.id}
              selectedChange={handleSelectedChange}
              restrictedChange={handleRestrictedChange}
            />
          </Grid>
        );
      });
    } else {
      return (
        <>
          <Info text={t("alerts.emptyGallery")} />
        </>
      );
    }
  }, [handleRestrictedChange, handleSelectedChange, pictures, t]);

  const renderContent = useCallback(() => {
    if (preLoading) {
      return (
        <>
          <DialogContent style={{ zIndex: 8 }}>
            <LinearProgress />
          </DialogContent>
        </>
      );
    } else {
      return (
        <>
          <DialogContent style={{ zIndex: 8 }}>
            <Grid container direction="row" spacing={2}>
              {renderContentGallery()}
            </Grid>
          </DialogContent>
        </>
      );
    }
  }, [preLoading, renderContentGallery]);

  const renderGalleryActions = useCallback(() => {
    const totalSelected = countSelectedPictures();
    return (
      <>
        <DialogActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              disabled={refreshing}
              onClick={() => {
                setRefreshing(true);
                setSkip(0);
                setLimit(limit);
                getPictures();
              }}
            >
              {refreshing ? (
                <CircularProgress
                  size={18}
                  style={{ color: theme.palette.text.primary }}
                />
              ) : (
                <RefreshIcon />
              )}
            </IconButton>
            <MoleculesSearchSearchBar
              skip={skip}
              limit={limit}
              setSkip={setSkip}
              setLimit={setLimit}
              total={total}
              results={pictures}
              divider={false}
              padding={false}
              align={"flex-start"}
            />
            <IconButton
              disabled={totalSelected === 0 || loadingDelete}
              onClick={() => setAlertDialogOpen(true)}
            >
              {loadingDelete ? (
                <CircularProgress
                  size={18}
                  style={{ color: theme.palette.text.primary }}
                />
              ) : (
                <Badge badgeContent={totalSelected} color="error">
                  <DeleteIcon
                    style={{
                      color:
                        totalSelected === 0
                          ? theme.palette.divider
                          : theme.palette.text.primary,
                    }}
                  />
                </Badge>
              )}
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={() => setUploadDialog(true)}
            >
              {t("buttons.add")}
            </Button>
          </div>
        </DialogActions>
      </>
    );
  }, [
    countSelectedPictures,
    getPictures,
    limit,
    loadingDelete,
    pictures,
    refreshing,
    skip,
    t,
    theme.palette.divider,
    theme.palette.text.primary,
    total,
  ]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
        open={props.open ? true : false}
        onClose={() => props.open(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          title={t("commons.myPictures")}
          open={() => props.open(false)}
          style={{ zIndex: 9 }}
        />
        {renderContent()}
        {renderGalleryActions()}
      </Dialog>
      {uploadDialog && (
        <PicturesUpload
          open={uploadDialog}
          onClose={() => {
            setUploadDialog(false);
          }}
        />
      )}
      {alertDialogOpen && (
        <AlertDialog
          open={alertDialogOpen}
          title={t("commons.warning")}
          text={t("alerts.removeItems")}
          handleClose={setAlertDialogOpen}
          handleAgree={deletePictures}
        />
      )}
    </>
  );
};

export default Component;
