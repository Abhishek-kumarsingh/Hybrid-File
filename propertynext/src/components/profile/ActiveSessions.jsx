import { useState, useEffect } from "react";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

export default function ActiveSessions() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await fetch("/api/auth/sessions");
        if (!response.ok) throw new Error("Failed to fetch sessions");
        const data = await response.json();
        setSessions(data.sessions);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSessions();
  }, []);

  async function terminateSession(sessionId) {
    try {
      const response = await fetch(`/api/auth/sessions/${sessionId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to terminate session");

      // Remove session from list
      setSessions(sessions.filter((session) => session.id !== sessionId));
    } catch (err) {
      setError(err.message);
    }
  }

  if (isLoading) return <div>Loading sessions...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Active Sessions</h2>
        <p className="text-sm text-gray-500">
          You can have up to 2 active devices simultaneously
        </p>
      </div>

      <div className="p-4">
        {sessions.length === 0 ? (
          <p>No active sessions found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <li key={session.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="font-medium">
                        {session.deviceName}
                        {session.isCurrent && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Current Device
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {session.browser} • {session.os} • {session.location}
                      </p>
                      <p className="text-xs text-gray-400">
                        Last active:{" "}
                        {new Date(session.lastActive).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {!session.isCurrent && (
                    <button
                      onClick={() => terminateSession(session.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <IconifyIcon icon="bx:log-out" width="20" height="20" />
                      Terminate
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
