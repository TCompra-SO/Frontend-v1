import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ApiMainRoutes, ApiRoutes } from "../utilities/routes";

const socketAPI = io(import.meta.env.VITE_SOCKET_URL);
const apiUrl = `${import.meta.env.VITE_REQUIREMENTS_URL}${
  ApiMainRoutes.requirements
}${ApiRoutes.requirements.getRequeriments}`;

export default function useSocket() {
  const [requeriments, setRequeriments] = useState([]);
  useEffect(() => {
    // Obtener los requerimientos al cargar la aplicación
    axios.get(apiUrl).then((res) => {
      setRequeriments(res.data.data); // Almacenar los requerimientos iniciales
    });

    // Escuchar el evento 'getRequeriments' del servidor
    socketAPI.on("getRequeriments", () => {
      console.log("Escuchando API REQUERIMENTS");
      // Hacer una nueva solicitud para obtener los requerimientos actualizados
      axios.get(apiUrl).then((res) => {
        setRequeriments(res.data.data); // Actualizar la lista de requerimientos
      });
    });

    // Limpiar el socket al desmontar el componente
    return () => {
      socketAPI.off("getRequeriments");
    };
  }, []);
}
