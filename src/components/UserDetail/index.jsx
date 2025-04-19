import React from "react";
import {
    Typography,
    Box,
    Link,
    Paper,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
    const user = models.userModel(userId);

    if (!user) {
        return <Typography>User not found</Typography>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                {user.first_name} {user.last_name}
            </Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Location"
                            secondary={user.location}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Occupation"
                            secondary={user.occupation}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Description"
                            secondary={user.description}
                        />
                    </ListItem>
                </List>
            </Paper>
            <Link
                component={RouterLink}
                to={`/photos/${userId}`}
                variant="button"
                color="primary"
            >
                View Photos
            </Link>
        </Box>
    );
}

export default UserDetail;
