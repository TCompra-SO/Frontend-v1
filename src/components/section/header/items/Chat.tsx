import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../../utilities/routes";
import { useChatSocket } from "../../../../hooks/useChat";

export default function Chat({ forDropdown }: { forDropdown?: boolean }) {
  const navigate = useNavigate();
  useChatSocket();

  return (
    <div onClick={() => navigate(`${pageRoutes.chat}`)}>
      <i
        className={`fa-regular fa-messages  ${
          forDropdown ? "i-main " : "i-opt"
        }`}
      ></i>
      {!forDropdown && <b className="i-notf"></b>}
    </div>
  );
}
