import React, { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import axios from "axios";

const TeamsDisplay = ({ teams = [] }) => {
  const user = useUserContext();
  const [loading, setLoading] = React.useState(false);
  const [displayTeams, setTeams] = useState();

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/team",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${user.user?.token}`,
            },
          }
        );
        setTeams(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [user]);

  const getTeamColor = (id) => {
    const colors = [
      "bg-primary",
      "bg-secondary",
      "bg-chart-1",
      "bg-chart-2",
      "bg-chart-3",
    ];
    return colors[(id - 1) % colors.length];
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusBadge = (team) => {
    const isActive = !team.deleted_at;
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          isActive
            ? "bg-chart-1/20 text-chart-1"
            : "bg-destructive/20 text-destructive"
        }`}
      >
        {isActive ? "Active" : "Deleted"}
      </span>
    );
  };

  // Skeleton row for loading state
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-lg"></div>
          <div className="w-24 h-4 bg-muted rounded"></div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="w-10 h-4 bg-muted rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-12 h-4 bg-muted rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-16 h-4 bg-muted rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-20 h-4 bg-muted rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="w-20 h-4 bg-muted rounded"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex space-x-2">
          <div className="w-12 h-4 bg-muted rounded"></div>
          <div className="w-12 h-4 bg-muted rounded"></div>
          <div className="w-12 h-4 bg-muted rounded"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Teams Management
          </h1>
          <p className="text-muted-foreground">
            Overview of all teams and their details
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Team
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Updated
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading
                  ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                  : displayTeams?.length > 0
                  ? displayTeams.map((team, index) => (
                      <tr
                        key={team.id}
                        className={`hover:bg-muted/30 transition-colors ${
                          index % 2 === 0
                            ? "bg-background"
                            : "bg-muted/10"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 ${getTeamColor(
                                team.id
                              )} rounded-lg flex items-center justify-center`}
                            >
                              <span className="text-primary-foreground font-bold text-sm">
                                {team.description.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-foreground">
                                {team.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono text-muted-foreground">
                            #{team.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono text-muted-foreground">
                            {team.pivot ? team.pivot.user_id : "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(team)}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">
                            {formatDate(team.created_at)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">
                            {formatDate(team.updated_at)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                              View
                            </button>
                            <button className="text-secondary hover:text-secondary/80 text-sm font-medium transition-colors">
                              Edit
                            </button>
                            <button className="text-destructive hover:text-destructive/80 text-sm font-medium transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : (
                    !loading && (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-6 py-12 text-center text-muted-foreground"
                        >
                          No Teams Found
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>

        {displayTeams?.length > 0 && !loading && (
          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {displayTeams.length} teams</span>
            <div className="flex items-center space-x-4">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Add New Team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsDisplay;
