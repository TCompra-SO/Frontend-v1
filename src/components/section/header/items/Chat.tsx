import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../../utilities/routes";
import { MainSocketsContext } from "../../../../contexts/MainSocketsContext";
import { useContext } from "react";

export default function Chat({ forDropdown }: { forDropdown?: boolean }) {
  const navigate = useNavigate();
  const { globalNumUnreadMessages } = useContext(MainSocketsContext);

  return (
    <div style={{ position: "relative", display: "inline-block" }} onClick={() => navigate(`${pageRoutes.chat}`)}>
      <i
        className={`fa-regular fa-messages  ${forDropdown ? "i-main " : "i-opt"
          }`}
      ></i>
      {!forDropdown && globalNumUnreadMessages > 0 && (
        <span className="i-notf">
          {globalNumUnreadMessages > 99 ? "99+" : globalNumUnreadMessages}
        </span>
      )}
    </div>
  );
}
