import { Client } from "@stomp/stompjs";
import { getToken } from "../api/config";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SockJS from "sockjs-client";

const client = new Client({
  brokerURL: `http://localhost:8080/api/v1/ws?token=${getToken()}`,
});

interface WebSocketContextType {
  stompClient: Client | null;
  isConnected: boolean;
}

const StompContext = createContext<WebSocketContextType>({
  stompClient: null,
  isConnected: false,
});

export const StompProvider = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!token) return;

    // 1. Initialize the Client
    const client = new Client({
      webSocketFactory: new SockJS(
        `http://localhost:8080/api/v1/ws?token=${getToken()}`,
      ),

      debug: (str) => console.log("STOMP: " + str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    };

    client.onDisconnect = () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [token]);

  return (
    <StompContext.Provider
      value={{ isConnected, stompClient: stompClientRef.current }}
    ></StompContext.Provider>
  );
};

export const useWebSocket = () => useContext(StompContext);
