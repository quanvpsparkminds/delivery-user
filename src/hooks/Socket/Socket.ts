import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "hooks/RTK";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { selectUser } from "store";

export const useSocket = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const user = useAppSelector(selectUser);
  const queryClient = useQueryClient();

  const connect = () => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);
    client.connect({}, () => {
      console.log("+_+_dkskjdl");

      setStompClient(client);
    });
  };
  console.log(user?.id);
  //initial socket
  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (!stompClient) {
      console.log("no stompClient");
      return;
    }
    console.log("+_+_+_+_+_+_+_+");

    stompClient?.subscribe(`/topic/user/1`, (message: any) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    });
  }, [stompClient, user?.id]);
};
