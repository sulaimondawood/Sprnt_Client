import { useWebSocket } from "@/services/providers/stomp-provider";
import { useEffect } from "react";

export const useSubscription = (
  topic: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (message: any) => void,
  enabled: boolean = true,
) => {
  const { stompClient, isConnected } = useWebSocket();

  useEffect(() => {
    if (!enabled || !isConnected || !stompClient) return;

    const subscription = stompClient.subscribe(topic, (message) => {
      callback(JSON.parse(message.body));
    });

    return () => subscription.unsubscribe();
  }, [topic, isConnected, stompClient, callback]);
};
