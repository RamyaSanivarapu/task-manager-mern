const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getAdminTasks
} = require("../controllers/taskController");

router.get("/", authMiddleware, getTasks);

router.post("/", authMiddleware, createTask);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, adminMiddleware, deleteTask);

router.get("/adminTask", authMiddleware, adminMiddleware, getAdminTasks);


module.exports = router;
