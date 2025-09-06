# Distributed Rate Limiter (Redis + Lua + Node.js)

An efficient, scalable rate-limiting system using **Redis** and **Lua** with a **Node.js/Express** API.  
Includes an optional interactive demo to simulate traffic, observe enforcement, and view blocked-request logs.  
Containerized with Docker, and scalable via Docker Compose.

---

## What We will Learn

- How to build a rate-limiting system using **Redis**  
- How to use **Lua scripts** with Redis for **atomic** operations  
- Redis data structures & patterns for tracking requests efficiently  
- Techniques for handling **high traffic** in distributed systems  
- Using **Docker** (and optional **Compose**) to simulate and scale a distributed rate limiter

---

## Prerequisites

Install the following:

- **Node.js** v14 or higher (LTS recommended)
- **Redis**
- **Docker** (for local Redis or containerized deployments; Docker Compose for scaling)
- Basic understanding of Node.js, Redis, and Lua scripting

> 💡 You can run Redis natively **or** via Docker. Using Docker is the quickest way to get started.

---

## Project Overview

I had:

- Build a Redis-backed rate limiter that enforces request quotas  
- Use **Lua scripts** to ensure atomicity & avoid race conditions  
- Implement a **fixed-window** counter by default, with an **optional token-bucket** Lua script  
- Create an optional **interactive demo** page to simulate traffic and visualize enforcement

### System Architecture

- **API Server (Express)** — handles incoming requests
- **Redis** — stores counters/state and enforces rate limits
- **Lua** — executes atomic updates in Redis
- **Docker / Compose** — simulate & scale multiple API instances

---

## Environment Variables

Create a `.env` file in the project root:

```dotenv
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=3000
RATE_LIMIT=5
TIME_WINDOW=60
