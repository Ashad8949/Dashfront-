import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import DashFilter from "./DashFilter";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#2c3e50", // Set your desired background color
    color: "#fff", // Set text color to white
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    margin: theme.spacing(2),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Typography variant="h6" className={classes.title}>
          Admin Dashboard
        </Typography>
        {/* Add sidebar content here */}
      </Drawer>
      <main className={classes.content}>
        <Typography variant="h4" className={classes.title}>
          Main Content
        </Typography>
        <DashFilter />
      </main>
    </div>
  );
};

export default AdminDashboard;
