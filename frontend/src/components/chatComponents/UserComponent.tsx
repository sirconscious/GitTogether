import { useUserContext } from "@/context/userContext";
import axios from "axios";
import React, { useEffect } from "react";
import type { JSX } from "react";
import { Link } from "react-router-dom";
export default function UserComponent(): JSX.Element {
  const user = useUserContext();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/team/users",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.user?.token}`,
            },
          }
        );
        setUsers(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  console.log("Users:", users);

  const LoadingSkeleton = () => (
    <div className="space-y-4 p-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden bg-card border border-border rounded-xl p-6 animate-pulse"
        >
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-muted-foreground/20 rounded-full"></div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-5 w-40 bg-muted rounded-lg"></div>
              <div className="h-4 w-56 bg-muted/70 rounded-lg"></div>
            </div>
            <div className="w-3 h-3 bg-muted rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const UserCard = ({ u, index }: { u: any; index: number }) => (
    <Link to={`/dashboard/chat/${u.id}`}>
      <div
        className={`group relative overflow-hidden bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-primary/5 ${
          index % 3 === 0
            ? "hover:bg-primary/5"
            : index % 3 === 1
            ? "hover:bg-secondary/5"
            : "hover:bg-accent/50"
        }`}
      >
        {/* Simple border highlight on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-primary/20"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-circle-user-icon lucide-circle-user"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
            {/* Status indicator */}
            {/* <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          </div> */}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300 truncate">
              {u.name}
            </h3>
            <p className="text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 text-sm truncate">
              {u.email}
            </p>
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {/* <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> */}
              {/* <span className="text-xs text-muted-foreground">Active now</span> */}
            </div>
          </div>

          {/* Action indicator */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
        <div className="absolute bottom-6 left-20 w-1 h-1 bg-secondary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse delay-300"></div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-card border-b border-border">
        <div className="relative z-10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-users-round-icon lucide-users-round"
              >
                <path d="M18 21a8 8 0 0 0-16 0" />
                <circle cx="10" cy="8" r="5" />
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Team Members</h1>
          </div>
          <p className="text-muted-foreground">
            {loading
              ? "Loading team members..."
              : `${users.length} active members`}
          </p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="p-6">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 border border-border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="m22 21-3-3m0 0a5 5 0 0 0-7-7 5 5 0 0 0 7 7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No team members found
              </h3>
              <p className="text-muted-foreground max-w-sm">
                It looks like there are no users to display at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {users.map((u: any, index: number) => {
                return user.user?.email == u.email ? (
                  <UserCard
                    key={u.id}
                    u={{ ...u, name: `${u.name} (You)` }}
                    index={index}
                  />
                ) : (
                  <UserCard key={u.id} u={u} index={index} />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
