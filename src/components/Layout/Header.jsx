import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { AppBar, Toolbar, Typography } from "@mui/material";
import {
    provider,
    auth,
    signInWithRedirect,
    signOut,
} from "./../../utils/auth";

const Header = (props) => {
    // ui
    const loginWithGoogleButton = (
        <Button
            color="inherit"
            onClick={() => {
                signInWithRedirect(auth, provider);
            }}
        >
            Login with Google
        </Button>
    );
    const logoutButton = (
        <Button
            color="inherit"
            onClick={() => {
                signOut(auth);
            }}
        >
            Log out
        </Button>
    );

    const button =
        props.currentUser === null ? loginWithGoogleButton : logoutButton;

    return (
        <AppBar position="static">
            <Toolbar sx={{ width: "100%", maxWidth: 720, margin: "auto" }}>
                <Typography variant="h6" component="div" className="text-3xl">
                    Todo List App
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {button}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
