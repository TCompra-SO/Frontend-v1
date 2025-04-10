import { useContext, useEffect, useRef, useState } from "react";
import { Popover, List, Typography, Space, Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";
import ParagraphContainer from "../../containers/ParagraphContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import SimpleLoading from "../../../pages/utils/SimpleLoading";
import NotificationUserAvatar from "../../common/utils/NotificationUserAvatar";
import dayjs from "dayjs";
import { dateHourFormatNotification } from "../../../utilities/globals";
import { MainSocketsContext } from "../../../contexts/MainSocketsContext";

const { Text } = Typography;

interface NotificationsProps {
  forDropdown?: boolean;
  includeText?: boolean;
}

export default function Notifications(props: NotificationsProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const sockets = useContext(MainSocketsContext);
  const notifContainerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const {
    notificationList: notifList,
    getMoreNotifications,
    resetNotificationList,
    redirectFromNotification,
    hasMoreNotificationList,
  } = sockets;

  /** Obtener más notificaciones */

  useEffect(() => {
    if (visible) {
      getMoreNotifications(page);
      setPage(page + 1);
    } else {
      resetNotificationList();
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  /** Cargar más elementos en infinite scroller si no hay scroll */

  useEffect(() => {
    if (
      notifList.length &&
      hasMoreNotificationList &&
      notifContainerRef.current &&
      notifContainerRef.current.scrollHeight <=
        notifContainerRef.current.clientHeight
    ) {
      getMoreNotifications(page);
      setPage(page + 1);
    }
  }, [notifList]);

  const notificationContent = (
    <div
      id="scrollableDivNotifList"
      style={{
        width: 300,
        maxHeight: 400,
        overflowY: "auto",
      }}
      ref={notifContainerRef}
    >
      <InfiniteScroll
        dataLength={notifList.length}
        next={() => {
          getMoreNotifications(page);
          setPage(page + 1);
        }}
        hasMore={hasMoreNotificationList}
        loader={
          <Flex justify="center">
            <Spin indicator={<SimpleLoading style={{ width: "60px" }} />} />
          </Flex>
        }
        scrollableTarget="scrollableDivNotifList"
      >
        <List
          dataSource={notifList}
          renderItem={(item) => (
            <List.Item
              key={item.uid}
              onClick={() => {
                redirectFromNotification(item);
                setVisible(false);
              }}
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
                    <ParagraphContainer ellipsis={{ rows: 1 }}>
                      {item.title}
                    </ParagraphContainer>
                  </div>
                }
                description={
                  <div style={{ lineHeight: 1.25 }}>
                    <ParagraphContainer
                      style={{ fontSize: "0.8rem" }}
                      children={item.body}
                      ellipsis={{ rows: 3 }}
                    />
                    <Text type="secondary" style={{ fontSize: "0.7rem" }}>
                      {dayjs(item.timestamp).format(dateHourFormatNotification)}
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
