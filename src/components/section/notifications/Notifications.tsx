import { useState } from "react";
import { Popover, List, Avatar, Typography, Space, Flex, Spin } from "antd";
import { useTranslation } from "react-i18next";
import ParagraphContainer from "../../containers/ParagraphContainer";
import InfiniteScroll from "react-infinite-scroll-component";
import SimpleLoading from "../../../pages/utils/SimpleLoading";

const { Text } = Typography;

// Sample notifications
const notifications = [
  {
    id: 1,
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    userImage: "https://via.placeholder.com/32", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 1,
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    userImage: "https://via.placeholder.com/32", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 1,
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    userImage: "https://via.placeholder.com/32", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 1,
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    userImage: "https://via.placeholder.com/32", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 1,
    title: "New Comment",
    body: "You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post. You have a new comment on your post.",
    date: "2025-01-09",
    time: "10:30 AM",
    userImage: "https://via.placeholder.com/32", // Replace with actual image URLs
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
  {
    id: 2,
    title: "New Follower",
    body: "John Doe started following you.",
    date: "2025-01-08",
    time: "3:15 PM",
    userImage: "https://via.placeholder.com/32",
  },
];

interface NotificationsProps {
  forDropdown?: boolean;
  includeText?: boolean;
}

export default function Notifications(props: NotificationsProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  let step = 1;
  const [notifList, setNotifList] = useState(notifications.slice(0, 10));

  function loadMoreNotifications() {
    console.log("loadMoreChats");
    setTimeout(() => {
      setNotifList(
        notifications.concat(notifications.slice(step * 6, 6 * (step + 1)))
      );
      step += 1;
    }, 1000);
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
        next={loadMoreNotifications}
        hasMore={true}
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
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.userImage} />}
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
