import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Button,
  Title,
  Box,
} from "@mantine/core";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { generateRandomUid } from "./util/generateUID";

export default function App() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let uid = sessionStorage.getItem("userId_kafka");
    if (!uid) {
      uid = generateRandomUid();
      sessionStorage.setItem("userId_kafka", uid);
    }
    setUserId(uid);
  }, []);
  return (
    <AppShell header={{ height: 70 }}>
      <AppShellHeader>
        <Box px="md" py="xs">
          <Group>
            <Title order={4}>UserId: {userId}</Title>
            <Group>
              <Button component={Link} to="/">
                Home
              </Button>
              <Button component={Link} to="/about">
                About
              </Button>
              <Button component={Link} to="/dashboard">
                Dashboard
              </Button>
            </Group>
          </Group>
        </Box>
      </AppShellHeader>

      <AppShellMain>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppShellMain>
    </AppShell>
  );
}
