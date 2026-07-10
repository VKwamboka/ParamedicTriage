# Paramedic Triage Intake Application

A React Native offline mobile application designed for emergency medical services where paramedics need to capture patient information in environments with unreliable or unavailable network connectivity.

The application allows paramedics to create triage records instantly, store them securely on the device, and automatically synchronize pending records when connectivity is restored.

## Contact

**Verah Kwamboka** (verahnyagaka101@gmail.com)  
Lead Developer

---

# Features

- Fast single-screen triage intake form
- Offline-first data storage
- Local persistence using SQLite
- Automatic background synchronization when connection returns
- Sync status tracking (Pending / Synced)
- Priority-based visual highlighting for critical cases
- Input validation to prevent incomplete submissions
- Mock API integration for testing network failures
- Unit tests for synchronization logic

---

# Technology Stack

- React Native + TypeScript
- Expo
- Expo SQLite
- React Context API + useReducer
- NetInfo for connectivity monitoring
- Jest for testing

---

# Prerequisites

Ensure the following tools are installed:

- Node.js
- npm
- Expo CLI
- Expo Go mobile application (for testing)

Recommended:

- Node.js v20+
- Android Studio (for Android emulator testing)

---

# Installation

Clone the repository:



```bash
git clone https://github.com/VKwamboka/ParamedicTriage.git
```

Navigate into the project:

```bash
cd ParamedicTriageApplication
```

Install dependencies:

```bash
npm install
```

---

# Running the Application

Start the Expo development server:

```bash
npm expo start
```

Run on Android:

```bash
npm run android
```

Or scan the QR code using Expo Go.

---

# Offline-First Architecture

The application follows an offline-first approach to guarantee that no patient data is lost when network connectivity is unavailable.

## Data Flow

```
User submits triage record
          |
          v
Generate local ID
          |
          v
Save record in SQLite
          |
          v
Mark as pending sync
          |
          v
Network becomes available
          |
          v
Upload pending records
          |
          v
Mark records as synced
```

---

# Local Persistence

SQLite is used as the local database.

Each triage record contains:

- Local unique ID
- Patient name
- Condition description
- Priority level
- Status
- Synchronization status
- Creation timestamp

Records are saved immediately before any network request is attempted.

This ensures that:

- Airplane mode does not prevent data capture
- Application restarts do not lose data
- Failed uploads can be retried later

---

# Synchronization Process

The application monitors network connectivity using NetInfo.

When a connection becomes available:

1. The application checks for pending records.
2. Pending records are sent to the mock API.
3. Successfully uploaded records are marked as synced.
4. Failed records remain stored locally and are retried during the next sync event.

Example logs:

```
Starting sync...
Found 2 pending record(s)

Syncing record abc123
Synced abc123

Sync completed
```

---

# Mock API

A simulated API is used instead of a real backend.

The mock service:

- Adds a 2-second network delay
- Randomly fails requests to test retry behavior
- Allows demonstration of offline and recovery scenarios

Failure simulation:

```
FAILURE_RATE = 0.35
```

---

# Application Structure

```
src
 |
 ├── components
 |     └── TriageForm
 |
 ├── screens
 |     └── TriageScreen
 |
 ├── context
 |     └── TriageContext
 |
 ├── repository
 |     └── TriageRepository
 |
 ├── services
 |     ├── DatabaseService
 |     ├── ConnectivityService
 |     ├── SyncService
 |     └── mockupapi
 |
 ├── models
 |     └── Triage
 |
 └── theme
```

---

# Testing

Run tests:

```bash
npm test
```

Implemented tests cover:

- Successful synchronization
- Failed synchronization handling
- Multiple pending record processing

---

# Demo Scenario

To test offline functionality:

1. Start the application.
2. Enable Airplane Mode.
3. Enter patient information.
4. Submit the triage record.
5. Confirm the record appears as pending.
6. Disable Airplane Mode.
7. Observe automatic synchronization.
8. Confirm the record changes to synced.

---

# Future Improvements

The current implementation focuses on the assessment requirements. Possible production improvements include:

- Stronger encryption for sensitive patient data
- Authentication and authorization
- Persistent background workers
- Server-side conflict resolution
- More advanced retry strategies
- Real backend API integration

---

# Development Practices

## Branch Naming

Use descriptive branch names:

```
feat/feature-name
fix/bug-name
test/test-name
docs/documentation-update
```

## Naming Conventions

- Variables and functions: camelCase
- Components and classes: PascalCase
- Constants: UPPER_SNAKE_CASE

Examples:

```
syncPendingRecords()
TriageForm
FAILURE_RATE
```