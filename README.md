# Job Queue System

A robust and scalable job queue system developed using Node.js, Express, BullMQ, Redis, and PostgreSQL. This project allows for the asynchronous creation and processing of jobs, ensuring reliable background task execution with status tracking and retry mechanisms.

## Features

- **Asynchronous Job Processing**: Offloads time-consuming tasks to background workers using BullMQ and Redis.
- **Job Status Tracking**: Tracks the lifecycle of jobs (PENDING, PROCESSING, COMPLETED) and persists state in a PostgreSQL database using Prisma.
- **Reliable Execution**: Implements automatic retries with exponential backoff strategies for failed jobs.
- **RESTful API**: Provides simple endpoints to submit jobs and query their current status.

## Prerequisites

Before running this project, ensure you have the following installed on your system:

- **Node.js**: Runtime environment (v14 or later recommended).
- **Redis**: In-memory data structure store, used as a message broker for the job queue. Ensure it is running on the default port `6379`.
- **PostgreSQL**: Relational database system. Ensure you have a database instance running.

## Installation and Setup

1.  **Clone the Repository**
    Navigate to the project directory.

2.  **Install Dependencies**
    Install the required Node.js packages:
    ```bash
    npm install
    ```

3.  **Database Setup**
    Ensure your PostgreSQL database is running. Update your `.env` file with the correct `DATABASE_URL`. Then, verify the database schema with Prisma:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

## Running the Application

This system consists of two main components: the API Server and the Background Worker. They should be run simultaneously.

1.  **Start the API Server**
    This starts the Express server to accept incoming API requests.
    ```bash
    npm start
    ```
    *The server will run on `http://localhost:3000` by default.*

2.  **Start the Background Worker**
    Open a new terminal window and start the worker to process jobs from the queue.
    ```bash
    node src/workers/jobWorker.js
    ```
    *You should see "Worker Started" in the console.*

## API Reference and Testing

You can interact with the API using `curl` commands directly from your terminal.

### 1. Create a New Job

Submits a new job to the queue. The job will be initiated with a `PENDING` status.

*   **Endpoint:** `POST /jobs`
*   **URL:** `http://localhost:3000/jobs`

**Test Command:**

```bash
curl -X POST http://localhost:3000/jobs \
     -H "Content-Type: application/json" \
     -d '{}'
```

*Note: The payload is currently empty `{}` as strictly required by the current controller logic, but the job is created with `type: "TEST_JOB"`. params are hardcoded.*

**Expected Response:**

```json
{
  "jobId": "unique-job-id-uuid"
}
```

### 2. Check Job Status

Retrieves the current status of a specific job.

*   **Endpoint:** `GET /jobs/:id`
*   **URL:** `http://localhost:3000/jobs/<JOB_ID>`

**Test Command:**

Replace `<JOB_ID>` with the actual ID returned from the creation step.

```bash
curl http://localhost:3000/jobs/<JOB_ID>
```

**Expected Response:**

```json
{
  "id": "unique-job-id-uuid",
  "type": "TEST_JOB",
  "payload": {},
  "status": "COMPLETED",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

*Status flows from `PENDING` -> `PROCESSING` -> `COMPLETED`.*
