import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  DialogActions,
  DialogContent,
} from "@material-ui/core";

import i18n from "../../../i18n";
import Typography from "../../atoms/display/typography";
import GiftButton from "../../atoms/inputs/giftButton";
import ActionButton from "./actionButton";
import ConnectButton from "./connectButton";

const Component = (props) => {
  const { t } = useTranslation();
  const [connection, setConnection] = useState();

  useEffect(() => {
    setConnection(props.connection);
  }, [props.connection]);

  const renderComponent = () => {
    return (
      <>
        <DialogContent>
          <GiftButton userId={props.userId} />
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell colSpan="2">
                    <Typography variant="subtitle1">
                      {t("commons.informations")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.birthday.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {moment(props.profile?.birthday)
                        .utc()
                        .format("DD/MM/YYYY")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">{t("commons.age")}</Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {moment().diff(props.profile?.birthday, "years")}&nbsp;
                      {t("commons.years").toLowerCase()}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("commons.zodiac")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {props.profile?.zodiac?.[0]?.name[i18n.language]}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableHead>
                <TableRow>
                  <TableCell colSpan="2">
                    <Typography variant="subtitle1">
                      <div style={{ height: 15 }} />
                      {t("commons.relationship")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.gender.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {
                        props.profile?.relationshipGender?.[0]?.name[
                          i18n.language
                        ]
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.orientation.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {
                        props.profile?.relationshipOrientation?.[0]?.name[
                          i18n.language
                        ]
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.maritalStatus.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {
                        props.profile?.relationshipMaritalStatus?.[0]?.name[
                          i18n.language
                        ]
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.relationship.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {
                        props.profile?.relationshipType?.[0]?.name[
                          i18n.language
                        ]
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
                {props.profile?.relationshipType?.[0]?._id ===
                  "5fa9eb3a201036a4efa3f271" && (
                  <TableRow>
                    <TableCell
                      component="td"
                      scope="row"
                      width="20%"
                      nowrap="nowrap"
                    >
                      <Typography variant="body1">
                        {t("fields.sugar.label")}
                      </Typography>
                    </TableCell>
                    <TableCell
                      component="td"
                      scope="row"
                      width="80%"
                      nowrap="nowrap"
                    >
                      <Typography variant="body1">
                        {
                          props.profile?.relationshipSugarType?.[0]?.name[
                            i18n.language
                          ]
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableHead>
                <TableRow>
                  <TableCell colSpan="2">
                    <div style={{ height: 15 }} />
                    <Typography variant="subtitle1">
                      {t("commons.appearance")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.height.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {props.profile?.appearance?.height} cm
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.weight.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {props.profile?.appearance?.weight} kg
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.body.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {
                        props.profile?.appearanceBodyTypes?.[0]?.name[
                          i18n.language
                        ]
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.hairColor.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {
                        props.profile?.appearanceHairColor?.[0]?.name[
                          i18n.language
                        ]
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="td"
                    scope="row"
                    width="20%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {t("fields.eyeColor.label")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="td"
                    scope="row"
                    width="80%"
                    nowrap="nowrap"
                  >
                    <Typography variant="body1">
                      {
                        props.profile?.appearanceEyeColor?.[0]?.name[
                          i18n.language
                        ]
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            flexDirection: "columns",
            justifyContent: "space-between",
          }}
        >
          <div>
            {connection && (
              <ActionButton
                userId={props.userId}
                connection={connection}
                roomUpdate={(value) => {
                  props.roomUpdate(value);
                }}
                connectionUpdate={(value) => {
                  props.connectionUpdate(value);
                  setConnection(value);
                }}
              />
            )}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {connection && connection !== 4 && (
              <ConnectButton
                userId={props.userId}
                connection={connection}
                roomUpdate={(value) => {
                  props.roomUpdate(value);
                }}
                connectionUpdate={(value) => {
                  props.connectionUpdate(value);
                  setConnection(value);
                }}
              />
            )}
          </div>
        </DialogActions>
      </>
    );
  };

  return props.display ? renderComponent() : <></>;
};

export default memo(Component);
