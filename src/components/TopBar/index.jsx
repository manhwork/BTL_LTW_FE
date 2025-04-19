import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
    const location = useLocation();
    const path = location.pathname;
    let title = "Photo Sharing App";

    // Extract userId from path
    const userIdMatch = path.match(/\/(users|photos)\/([^/]+)/);
    if (userIdMatch) {
        const userId = userIdMatch[2];
        const user = models.userModel(userId);
        if (user) {
            if (path.startsWith("/photos/")) {
                title = `Photos of ${user.first_name} ${user.last_name}`;
            } else {
                title = `${user.first_name} ${user.last_name}`;
            }
        }
    }

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" color="inherit">
                        Your Name
                    </Typography>
                </Box>
                <Typography variant="h6" color="inherit">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
