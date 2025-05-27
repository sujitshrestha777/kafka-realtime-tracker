import { Button, Title } from "@mantine/core";
import { socket } from "../socket";

export default function Home() {
  const handleVisit = () => {
    const uid = sessionStorage.getItem("userId_kafka");
    socket.emit("page-visit", {
      userId: uid,
      page: "/home",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div style={{ padding: "45px" }}>
      <Title>Home Page</Title>
      <Button mt="md" onClick={handleVisit}>
        Simulate Visit
      </Button>
    </div>
  );
}
