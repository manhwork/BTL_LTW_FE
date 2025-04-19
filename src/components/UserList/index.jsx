import React, { useEffect, useState } from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Alert,
    Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { fetchUsers } from "../../lib/fetchModelData";

import "./styles.css";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchUsers();
                setUsers(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error("Error loading users:", err);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <div>
            <Typography variant="h6" sx={{ mb: 2 }}>
                List Users
            </Typography>
            <List component="nav">
                {users.map((user) => (
                    <React.Fragment key={user._id}>
                        <ListItem disablePadding>
                            <NavLink
                                to={`/users/${user._id}`}
                                style={({ isActive }) => {
                                    return {
                                        textDecoration: "none",
                                        color: "inherit",
                                        width: "100%",
                                        padding: "8px 16px",
                                        backgroundColor: isActive
                                            ? "#e3f2fd"
                                            : "transparent",
                                    };
                                }}
                            >
                                <ListItemText
                                    primary={`${user.first_name} ${user.last_name}`}
                                />
                            </NavLink>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
}

export default UserList;
