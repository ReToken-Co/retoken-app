import React from "react";
import {
  Sidebar,
  SidebarMenu,
  SidebarItem,
  SidebarLinks
} from "./UserSidebar.style";

import {
  Avatar,
  Box,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: 'avatars/avatar_1.png',
  name: 'Andrea Lee'
};

const useStyles = makeStyles(() => ({
  avatar: {
    height: 100,
    width: 100
  }
}));

export default function UserSidebar(props) {

  const classes = useStyles();

  return (
    <Sidebar>
      <SidebarMenu>
          <SidebarItem>
            <Box
              alignItems="center"
              flexDirection="column"
              p={2}
            >
              <Avatar
                className={classes.avatar}
                src={user.avatar}
              />
              <Typography
                color="textPrimary"
                variant="body1"
                gutterBottom 
                style={{ fontWeight: 600 }}
              >
                {user.name}
              </Typography>
            </Box>
          </SidebarItem>
          <Box mt={15}>
            <SidebarItem>
              <SidebarLinks to="/investments">Investments</SidebarLinks>
            </SidebarItem>
            <SidebarItem>
              <SidebarLinks to="/account">Account</SidebarLinks>
            </SidebarItem>
            <SidebarItem>
              <SidebarLinks to="/settings">Settings</SidebarLinks>
            </SidebarItem>
          </Box>
      </SidebarMenu>
    </Sidebar>
  );
}
