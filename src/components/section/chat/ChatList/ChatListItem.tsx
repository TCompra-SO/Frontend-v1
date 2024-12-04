import { ChatListData } from "../../../../models/MainInterfaces";

interface ChatListItemProps {
  data: ChatListData;
}

export default function ChatListItem(props: ChatListItemProps) {
  return (
    <div className="card-chat t-flex gap-10 j-items">
      {props.data.userImage ? (
        <img src={props.data.userImage} className="img-chat" />
      ) : (
        <div className="inicial-chat">
          {props.data.userName.length > 0 ? props.data.userName[0] : null}
        </div>
      )}
      <div className="chat-online"></div>
      <div className="chat-user">
        <div className="usuario-chat text-truncate">
          Rio Jimenez Salas del Carpio
        </div>
        <div className="requ-chat text-truncate">Nombre del Requerimiento</div>
        <div className="mensaje-chat text-truncate">
          Mensaje de prueba para las
        </div>
      </div>
      <div className="date-chat t-flex f-column">
        <div className="chat-fecha">
          <i className="fa-solid fa-ellipsis chat-opciones"></i>
        </div>
        <div className="chat-fecha">03/05/24</div>
        <div className="chat-notf-2">10</div>
      </div>
    </div>
  );
}
