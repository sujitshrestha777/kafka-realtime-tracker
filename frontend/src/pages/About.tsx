import { Button, Title } from "@mantine/core";
import { socket } from "../socket";

export default function About() {
  const handleVisit = () => {
    const uid = sessionStorage.getItem("userId_kafka");
    socket.emit("page-visit", {
      userId: uid,
      page: "/about",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div style={{ padding: "45px" }}>
      <Title>About Page</Title>
      <Button mt="md" onClick={handleVisit}>
        Simulate Visit
      </Button>
    </div>
  );
}
