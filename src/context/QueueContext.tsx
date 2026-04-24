"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

export type QueueStatus = "Waiting" | "Called";

export interface QueueEntry {
  token: string;
  name: string;
  joinedAt: string;
  status: QueueStatus;
  completedAt?: string;
  task?: string;
}

export interface MyQueueEntry {
  dept: string;
  token: string;
}

export interface QueueState {
  queues: {
    [key: string]: QueueEntry[];
  };
  history: QueueEntry[];
  myQueues: MyQueueEntry[];
  staffSelectedDept: string;
}

type QueueAction =
  | { type: "JOIN_QUEUE"; payload: { dept: string; name: string; task?: string } }
  | { type: "CALL_NEXT" }
  | { type: "SKIP" }
  | { type: "LEAVE_QUEUE"; payload: string }
  | { type: "SELECT_DEPT"; payload: string };

const initialState: QueueState = {
  queues: {
    "Admin Office": [
      { token: "A-101", name: "Riya Sharma", joinedAt: "10:05 AM", status: "Waiting", task: "Fee payment issue" },
      { token: "A-102", name: "Arjun J.", joinedAt: "10:15 AM", status: "Waiting", task: "Document verification" },
      { token: "A-103", name: "Neha Gupta", joinedAt: "10:20 AM", status: "Waiting", task: "General inquiry" },
    ],
    "Accounts": [],
    "Student Section": [],
    "Academics": [],
  },
  history: [
    { token: "A-099", name: "Rahul Patel", joinedAt: "09:30 AM", completedAt: "09:45 AM", status: "Called", task: "ID Card Renewal" },
    { token: "A-100", name: "Simran Kaur", joinedAt: "09:45 AM", completedAt: "10:00 AM", status: "Called", task: "Fee payment issue" }
  ],
  myQueues: [],
  staffSelectedDept: "Admin Office",
};

const QueueContext = createContext<{
  state: QueueState;
  dispatch: React.Dispatch<QueueAction>;
} | null>(null);

function queueReducer(state: QueueState, action: QueueAction): QueueState {
  switch (action.type) {
    case "JOIN_QUEUE": {
      const { dept, name, task } = action.payload;
      
      // Prevent joining if already in this department's queue
      if (state.myQueues.some(q => q.dept === dept)) {
        return state;
      }

      const deptQueue = state.queues[dept] || [];
      const prefix = dept.charAt(0).toUpperCase();
      const num = 100 + deptQueue.length + 1;
      const token = `${prefix}-${num}`;
      
      const newEntry: QueueEntry = {
        token,
        name,
        task: task || "General inquiry",
        joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "Waiting",
      };

      return {
        ...state,
        queues: {
          ...state.queues,
          [dept]: [...deptQueue, newEntry],
        },
        myQueues: [...state.myQueues, { dept, token }],
      };
    }
    case "CALL_NEXT": {
      const dept = state.staffSelectedDept;
      const queue = state.queues[dept];
      if (!queue || queue.length === 0) return state;

      const servedStudent = {
        ...queue[0],
        status: "Called" as QueueStatus,
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      return {
        ...state,
        queues: {
          ...state.queues,
          [dept]: queue.slice(1),
        },
        history: [servedStudent, ...state.history]
      };
    }
    case "SKIP": {
      const dept = state.staffSelectedDept;
      const queue = state.queues[dept];
      if (!queue || queue.length === 0) return state;

      const first = queue[0];
      return {
        ...state,
        queues: {
          ...state.queues,
          [dept]: [...queue.slice(1), first],
        },
      };
    }
    case "LEAVE_QUEUE": {
      const deptToLeave = action.payload;
      const queueEntry = state.myQueues.find(q => q.dept === deptToLeave);
      if (!queueEntry) return state;

      const queue = state.queues[deptToLeave] || [];

      return {
        ...state,
        queues: {
          ...state.queues,
          [deptToLeave]: queue.filter(q => q.token !== queueEntry.token),
        },
        myQueues: state.myQueues.filter(q => q.dept !== deptToLeave),
      };
    }
    case "SELECT_DEPT": {
      return {
        ...state,
        staffSelectedDept: action.payload,
      };
    }
    default:
      return state;
  }
}

export function QueueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(queueReducer, initialState);

  return (
    <QueueContext.Provider value={{ state, dispatch }}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
}
