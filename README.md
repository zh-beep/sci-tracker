# SCI Phase Tracker

A clean, Notion-style project phase tracker for managing multiple clients and their project phases.

## Features

- **Multi-Client Support**: Track multiple clients with their own dedicated pages
- **Phase Progress Tracking**: Visual progress bars showing completion percentage
- **Status Indicators**: Automatic status calculation (Behind/Ahead/On Track) based on timeline
- **Task Kanban Board**: Expandable task boards showing Not Started/In Progress/Done tasks
- **Real-time Sync**: Updates from Notion via n8n workflow
- **Dark Theme**: Clean, modern dark UI inspired by Notion

## Setup

### 1. Environment Variables

Already configured in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://fvkoapdxcvmieognhmsx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Running the App

```bash
npm install
npm run dev
```

Visit http://localhost:3002

### 3. n8n Integration

Use this edge function URL in your n8n workflow:
```
https://fvkoapdxcvmieognhmsx.supabase.co/functions/v1/sync-tasks
```

Send a POST request with Authorization header and JSON body containing tasks array.

### 4. Phase Detection

Tasks are automatically grouped into phases based on their number prefix:
- [001]-[099] → Phase 1
- [100]-[199] → Phase 2
- [200]-[299] → Phase 3
- And so on...

## Testing

Use the included test script:
```bash
node test-sync.js
```

## Client URLs

Once data is synced, clients can be accessed at:
- `/cofertility` - Cofertility project phases
- `/givewell` - GiveWell project phases
