import { useContext, useEffect, useState } from "react";
import { Popover, List, Avatar, Typography, Space, Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";
import ParagraphContainer from "../../containers/ParagraphContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import SimpleLoading from "../../../pages/utils/SimpleLoading";
import { NotificationData } from "../../../models/Interfaces";
import { primaryColor } from "../../../utilities/colors";
import { Action } from "../../../utilities/types";
import { ModalsContext } from "../../../contexts/ModalsContext";
import { isRequirementType } from "../../../utilities/globalFunctions";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../utilities/routes";
import { useDownloadPdfOrder } from "../../../hooks/utilHooks";
import { useTCNotification } from "../../../hooks/useTCNotification";
import NotificationUserAvatar from "../../common/utils/NotificationUserAvatar";

const { Text } = Typography;

interface NotificationsProps {
  forDropdown?: boolean;
  includeText?: boolean;
}

export default function Notifications(props: NotificationsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    notificationList: notifList,
    getMoreNotifications,
    resetNotificationList,
    notificationLoading,
  } = useTCNotification();
  const [visible, setVisible] = useState(false);
  const { updateDetailedRequirementModalData, updateDetailedOfferModalData } =
    useContext(ModalsContext);
  const downloadPdfOrder = useDownloadPdfOrder();

  useEffect(() => {
    if (visible) getMoreNotifications();
    else resetNotificationList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function redirectFromNotification(notification: NotificationData) {
    console.log(notification);
    const { result, val } = isRequirementType(notification.targetType);
    if (notification.action == Action.VIEW_REQUIREMENT && result && val) {
      updateDetailedRequirementModalData({
        requirement: undefined,
        requirementId: notification.targetId,
        requirementType: val,
      });
      navigate(pageRoutes.myRequirements);
      setVisible(false);
    } else if (notification.action == Action.VIEW_OFFER && result && val) {
      updateDetailedOfferModalData({
        offerId: notification.targetId,
        offerType: val,
        offer: undefined,
      });
      navigate(pageRoutes.myOffers);
      setVisible(false);
    } else if (
      notification.action == Action.DOWNLOAD_PURCHASE_ORDER &&
      result &&
      val
    ) {
      downloadPdfOrder(notification.targetId, val);
      setVisible(false);
    }
  }

  const notificationContent = (
    <div
      id="scrollableDivNotifList"
      style={{
        width: 300,
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={notifList.length}
        next={getMoreNotifications}
        hasMore={notifList.length > 0}
        loader={
          <Flex justify="center">
            <Spin indicator={<SimpleLoading style={{ width: "60px" }} />} />
          </Flex>
        }
        scrollableTarget="scrollableDivNotifList"
      >
        <List
          loading={
            notifList.length > 0
              ? undefined
              : {
                  indicator: (
                    <Flex justify="center">
                      <Spin
                        indicator={<SimpleLoading style={{ width: "60px" }} />}
                      />
                    </Flex>
                  ),
                  spinning: notificationLoading,
                }
          }
          dataSource={notifList}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={() => redirectFromNotification(item)}
            >
              <List.Item.Meta
                style={{ cursor: "pointer" }}
                avatar={
                  <NotificationUserAvatar
                    senderImage={item.senderImage}
                    senderName={item.senderName}
                  />
                }
                title={
                  <div
                    style={{
                      fontSize: "0.9rem",
                      marginBottom: -4,
                    }}
                  >
                    {item.title}
                  </div>
                }
                description={
                  <div style={{ lineHeight: 1.25 }}>
                    <ParagraphContainer
                      style={{ fontSize: "0.8rem" }}
                      children={item.body}
                      ellipsis={{ rows: 2 }}
                    />
                    <Text type="secondary" style={{ fontSize: "0.7rem" }}>
                      {item.date} {item.time}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );

  return (
    <Popover
      content={notificationContent}
      title={<Text strong>{t("notifications")}</Text>}
      trigger="click"
      open={visible}
      onOpenChange={setVisible}
      arrow={false}
    >
      {props.includeText ? (
        <Space style={{ margin: "-10px 0" }}>
          <div>
            <i
              className={`fa-regular fa-bell  ${
                props.forDropdown ? "i-main " : "i-opt"
              }`}
            ></i>
            {!props.forDropdown && <b className="i-notf"></b>}
          </div>
          {t("notifications")}
        </Space>
      ) : (
        <div>
          <i
            className={`fa-regular fa-bell  ${
              props.forDropdown ? "i-main " : "i-opt"
            }`}
          ></i>
          {!props.forDropdown && <b className="i-notf"></b>}
        </div>
      )}
      {/* <Badge count={notifications.length} offset={[-5, 5]}> */}
      {/* <Avatar shape="circle" icon="bell" style={{ cursor: "pointer" }} /> */}
      {/* </Badge> */}
    </Popover>
  );
}
