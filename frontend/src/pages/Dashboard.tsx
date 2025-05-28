import { useEffect, useState, useCallback } from "react";
import {
  Title,
  Paper,
  Stack,
  Text,
  Badge,
  Group,
  ScrollArea,
  Grid,
  Card,
  Divider,
  Center,
  Indicator,
} from "@mantine/core";
import { socket } from "../socket";
import { aboutSocket } from "../socket-about";

type Visit = {
  userId: string;
  page: string;
  timestamp: string;
  socketId?: string;
};

export default function Dashboard() {
  const [homePageVisits, setHomePageVisits] = useState<Visit[]>([]);
  const [otherPageVisits, setOtherPageVisits] = useState<Visit[]>([]);
  const [uid, setUid] = useState("");
  const [homeConsumerActive, setHomeConsumerActive] = useState(false);
  const [otherConsumerActive, setOtherConsumerActive] = useState(false);

  // Memoized handlers to prevent unnecessary re-renders
  const handleHomePageVisit = useCallback((data: Visit) => {
    console.log("Home page visit data:", data);
    setHomePageVisits((prev) => [data, ...prev.slice(0, 99)]); // Limit to 100 items
    setHomeConsumerActive(true);
    setTimeout(() => setHomeConsumerActive(false), 2000);
  }, []);

  const handleAboutPageVisit = useCallback((data: Visit) => {
    console.log("About page visit data:", data);
    setOtherPageVisits((prev) => [data, ...prev.slice(0, 99)]); // Limit to 100 items
    setOtherConsumerActive(true);
    setTimeout(() => setOtherConsumerActive(false), 2000);
  }, []);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId_kafka");
    if (userId) setUid(userId);

    // Add event listeners
    socket.on("home-page-visit", handleHomePageVisit);
    aboutSocket.on("about-page-visit", handleAboutPageVisit);

    // Cleanup function
    return () => {
      socket.off("home-page-visit", handleHomePageVisit);
      aboutSocket.off("about-page-visit", handleAboutPageVisit);
    };
  }, [handleHomePageVisit, handleAboutPageVisit]);

  const renderVisits = useCallback(
    (visits: Visit[], title: string, color: string) => (
      <ScrollArea h={350} type="auto">
        <Stack gap="sm">
          {visits.map((v, i) => (
            <Paper
              key={`${v.userId}-${v.timestamp}-${i}`} // Better key generation
              withBorder
              p="sm"
              radius="sm"
              bg={color === "blue" ? "blue.0" : "green.0"}
            >
              <Group justify="space-between">
                <Text size="sm" fw={600}>
                  User: {v.userId}
                </Text>
                <Text size="xs" c="dimmed">
                  {new Date(v.timestamp).toLocaleTimeString()}
                </Text>
              </Group>
              <Text size="sm" mt={5}>
                visited{" "}
                <Badge color={color} size="sm">
                  {v.page}
                </Badge>
              </Text>
              {v.socketId && (
                <Text size="xs" c="dimmed" mt={2}>
                  Socket: {v.socketId.substring(0, 8)}...
                </Text>
              )}
            </Paper>
          ))}
          {visits.length === 0 && (
            <Center h={100}>
              <Text size="sm" c="dimmed">
                No {title.toLowerCase()} visits yet
              </Text>
            </Center>
          )}
        </Stack>
      </ScrollArea>
    ),
    []
  );

  return (
    <div style={{ padding: "2rem" }}>
      <Title order={2} mb="md" ta="center">
        🔥 Live Kafka Consumer Dashboard
      </Title>

      <Text size="sm" c="dimmed" mb="lg" ta="center">
        Your session ID:{" "}
        <Badge color="blue" size="lg" variant="light">
          {uid || "Not set"}
        </Badge>
      </Text>

      {/* Consumer Status Indicators */}
      <Group justify="center" mb="xl">
        <Indicator color="blue" processing={homeConsumerActive} size={12}>
          <Badge color="blue" variant="light" size="lg">
            🏠 Home Consumer (Partition 0)
          </Badge>
        </Indicator>

        <Indicator color="green" processing={otherConsumerActive} size={12}>
          <Badge color="green" variant="light" size="lg">
            📄 About Consumer (Partition 1)
          </Badge>
        </Indicator>
      </Group>

      {/* Dual Consumer Display */}
      <Grid>
        <Grid.Col span={6}>
          <Card shadow="md" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4} c="blue">
                🏠 Home Page Visits
              </Title>
              <Badge color="blue" variant="filled">
                {homePageVisits.length}
              </Badge>
            </Group>
            <Text size="xs" c="dimmed" mb="sm">
              Partition 0 • /home pages only
            </Text>
            <Divider mb="sm" />
            {renderVisits(homePageVisits, "Home Page", "blue")}
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="md" padding="md" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4} c="green">
                📄 About Page
              </Title>
              <Badge color="green" variant="filled">
                {otherPageVisits.length}
              </Badge>
            </Group>
            <Text size="xs" c="dimmed" mb="sm">
              Partition 1 • About page
            </Text>
            <Divider mb="sm" />
            {renderVisits(otherPageVisits, "About Page", "green")}
          </Card>
        </Grid.Col>
      </Grid>

      {/* Total Stats */}
      <Paper shadow="sm" p="md" radius="md" mt="xl" bg="gray.0">
        <Group justify="center" gap="xl">
          <div>
            <Text ta="center" size="xl" fw={700} c="blue">
              {homePageVisits.length}
            </Text>
            <Text ta="center" size="sm" c="dimmed">
              Home Visits
            </Text>
          </div>
          <div>
            <Text ta="center" size="xl" fw={700} c="green">
              {otherPageVisits.length}
            </Text>
            <Text ta="center" size="sm" c="dimmed">
              About Visits
            </Text>
          </div>
          <div>
            <Text ta="center" size="xl" fw={700} c="dark">
              {homePageVisits.length + otherPageVisits.length}
            </Text>
            <Text ta="center" size="sm" c="dimmed">
              Total Visits
            </Text>
          </div>
        </Group>
      </Paper>
    </div>
  );
}
