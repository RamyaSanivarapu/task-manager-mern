import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AXIOS from "../api/axiosInstance";

import AddIcon from "@mui/icons-material/Add";
import { Button, Box, Typography, useTheme, Tabs, Tab } from "@mui/material";
import Pagination from "@mui/material/Pagination";

// Components
import SnackbarAlert from "../components/SnackbarAlert";
import TaskSummary from "../components/TaskSummary";
import TaskTable from "../components/TaskTable";
import TaskCardView from "../components/TaskCardView";
import SearchBar from "../components/SearchBar";
import ViewToggle from "../components/ViewToggle";
import TaskFormModal from "../components/TaskFormModal";
import CircularProgressCard from "../components/CircularProgressCard";
import EmptyState from "../components/EmptyState";


const iconStyles = {
    transition: "transform 0.2s ease, opacity 0.2s ease",
    "&:hover": {
        transform: "scale(1.2)",
        opacity: 0.8,
    },
    "&:active": {
        transform: "scale(0.85)",
    },
};

const pulseAnimation = {
    animation: "pulse 1.5s infinite ease-in-out",
    "@keyframes pulse": {
        "0%": { transform: "scale(1)", boxShadow: "0 0 0px rgba(255, 152, 0, 0.3)" },
        "50%": { transform: "scale(1.01)", boxShadow: "0 0 12px rgba(255, 152, 0, 0.6)" },
        "100%": { transform: "scale(1)", boxShadow: "0 0 0px rgba(255, 152, 0, 0.3)" }
    }
};


export default function Dashboard() {
    const { user } = useContext(AuthContext);

    const theme = useTheme();
    const themeMode = theme.palette.mode;

    const [tasks, setTasks] = useState([]);
    const [viewMode, setViewMode] = useState("table");
    const [search, setSearch] = useState("");

    const [openForm, setOpenForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [overviewMode, setOverviewMode] = useState("my");

    const isAdmin = user?.role === "admin";

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const [page, setPage] = useState(1);
    const tasksPerPage = viewMode === "card" ? 8 : 5;


    // SUMMARY COUNTS
    const total = tasks.length;
    const progress = tasks.filter((t) => t.status === "In Progress").length || 0;
    const completed = tasks.filter((t) => t.status === "Completed").length;

    // SEARCH FILTER + PAGINATION
    const filtered = tasks.filter(
        (t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filtered.slice((page - 1) * tasksPerPage, page * tasksPerPage);

    // LOAD TASKS
    const loadTasks = async () => {
        try {
            const res = await AXIOS.get("/tasks");
            let allTasks = res.data;

            // Admin: My Overview → only admin-created tasks
            if (isAdmin && overviewMode === "my") {
                allTasks = allTasks.filter(t => t.user?.name === user?.name);
                console.log(allTasks, "admin my overview")
            }
            setTasks(allTasks);

        } catch (err) {
            console.error("Error loading tasks:", err);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [overviewMode]);

    const closeForm = () => {
        setOpenForm(false);
        setEditingId(null);
        setForm({ title: "", description: "" });
    };

    const handleEdit = (task) => {
        setForm({ title: task.title, description: task.description });
        setEditingId(task._id);
        setOpenForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await AXIOS.put(`/tasks/${editingId}`, form);
                setSnackbar({
                    open: true,
                    message: "Task updated successfully!",
                    severity: "success",
                });
            } else {
                await AXIOS.post("/tasks", form);
                setSnackbar({
                    open: true,
                    message: "Task added successfully!",
                    severity: "success",
                });
            }

            closeForm();
            loadTasks();
        } catch (err) {
            console.error(err);
        }
    };

    // STATUS ACTIONS
    const handleStart = async (task) => {
        await AXIOS.put(`/tasks/${task._id}`, { status: "In Progress" });
        loadTasks();
        setSnackbar({
            open: true,
            message: "Task moved to In Progress!",
            severity: "info",
        });
    };

    const handleComplete = async (task) => {
        await AXIOS.put(`/tasks/${task._id}`, { status: "Completed" });
        loadTasks();
        setSnackbar({
            open: true,
            message: "Task completed!",
            severity: "success",
        });
    };

    const handleDelete = async (id) => {
        await AXIOS.delete(`/tasks/${id}`);
        loadTasks();
        setSnackbar({
            open: true,
            message: "Task deleted",
            severity: "error",
        });
    };

    return (
        <>
            {/* GLOBAL SNACKBAR */}
            <SnackbarAlert snackbar={snackbar} setSnackbar={setSnackbar} />

            {/* ADD/EDIT TASK MODAL */}
            <TaskFormModal
                open={openForm}
                onClose={closeForm}
                form={form}
                setForm={setForm}
                editingId={editingId}
                handleSubmit={handleSubmit}
                isAdmin={isAdmin}
            />

            <div style={{ padding: "20px 40px" }}>
                {/* WELCOME + ADD BUTTON */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <Typography variant="h4">
                        Welcome, {user?.name}
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenForm(true)}
                        sx={{ padding: "8px 20px", borderRadius: "30px" }}
                    >
                        Add Task
                    </Button>
                </div>

                {/* SUMMARY ABOVE TASKS */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        margin: "25px 0",
                        padding: "20px",
                        borderRadius: "16px",
                        backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f9f9f9",
                        boxShadow:
                            theme.palette.mode === "dark"
                                ? "0 4px 20px rgba(255,255,255,0.06)"
                                : "0 4px 20px rgba(0,0,0,0.12)",
                    }}
                >
                    {isAdmin ? (
                        <Tabs
                            value={overviewMode}
                            onChange={(e, v) => setOverviewMode(v)}
                            centered
                            sx={{
                                "& .MuiTab-root": {
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    padding: "10px 20px",
                                },
                                "& .Mui-selected": {
                                    fontWeight: "800",
                                    fontSize: "1.05rem",
                                },
                                "& .MuiTabs-indicator": {
                                    height: "4px",
                                    borderRadius: "2px",
                                }
                            }}
                        >
                            <Tab label="My Overview" value="my" />
                            <Tab label="Team Overview" value="team" />
                        </Tabs>

                    ) : (
                        <Tabs
                            value={overviewMode}
                            onChange={(e, v) => setOverviewMode(v)}
                            centered
                        >
                            <Tab label="My Overview" value="my" />
                        </Tabs>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "center", gap: "30px" }}>
                        <CircularProgressCard total={total} completed={completed} />

                        <TaskSummary
                            total={total}
                            inProgress={progress}
                            completed={completed}
                            themeMode={themeMode}
                        />
                    </Box>
                </Box>
                
                {/* SEARCH + MODE TOGGLE + PAGINATION */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <Typography variant="h4">Tasks List:</Typography>
                    <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                    <SearchBar search={search} setSearch={setSearch} />
                    <Pagination
                        count={Math.ceil(filtered.length / tasksPerPage)}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                    />
                </div>

                {/* TASK DISPLAY */}
                <div
                    style={{
                        maxHeight: "420px",
                        overflowY: "auto",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "10px",
                    }}
                >
                    {filtered.length === 0 ? (
                        <EmptyState onAddTask={() => setOpenForm(true)} />
                    ) : viewMode === "table" ? (
                        <TaskTable
                            tasks={paginated}
                            handleEdit={handleEdit}
                            handleStart={handleStart}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                            user={user}
                            isAdmin={isAdmin}
                            pulseAnimation={pulseAnimation}
                            iconStyles={iconStyles}
                        />
                    ) : (
                        <TaskCardView
                            tasks={paginated}
                            handleEdit={handleEdit}
                            handleStart={handleStart}
                            handleComplete={handleComplete}
                            handleDelete={handleDelete}
                            user={user}
                            isAdmin={isAdmin}
                            pulseAnimation={pulseAnimation}
                            iconStyles={iconStyles}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
