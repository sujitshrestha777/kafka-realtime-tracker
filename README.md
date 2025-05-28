# 🧠 Real-Time Website Visitor Tracker with Kafka

Track live website traffic using Kafka, Socket.IO, and a React + Mantine dashboard. Built for showcasing real-time event-driven architecture, ideal for remote full-stack hiring.

---

## 📸 Demo

> 🎥 [Watch Demo Video](./assets/demo-video.mp4)

---

## 🏗️ Architecture

![Kafka Architecture Diagram](./assets/architecture.png)

---

## 💻 Tech Stack

| Layer     | Tech                          |
| --------- | ----------------------------- |
| Frontend  | React, Mantine UI, Socket.IO  |
| Backend   | Node.js (TypeScript), KafkaJS |
| Messaging | Apache Kafka                  |
| Realtime  | Socket.IO                     |

---

## 🔍 Features

- Live visitor tracking with unique session IDs
- Kafka-based partitioned consumers (`/home` → partition 0, `/about` → partition 1)
- Visual real-time updates via Socket.IO
- Dashboard built with Mantine UI

---

## 📷 Screenshots

### 📊 Kafka Dashboard

![Dashboard Screenshot](./assets/dashboard.png)

### 🏠 Home Page

![Home Screenshot](./assets/home.png)

### 📄 About Page

![About Screenshot](./assets/about.png)

---
