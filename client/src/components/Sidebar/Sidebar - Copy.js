import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Sidebar,
  SidebarMenu,
  SidebarItem,
  SidebarLinks,
  useStyles,
} from "./Sidebar.style";
import {
  TextField,
  MenuItem,
} from "@material-ui/core";

export default function SideBar() {
  const history = useHistory();
  const classes = useStyles();
  const [visibleValue, setVisibleValue] = useState(0);
  const propSelect = [
    { value: "pending", label: "Pending", },
    { value: "active", label: "Active Listing", },
    { value: "subscribe", label: "Fully Subscribe", },
  ]

  const handleClick = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "pending":
        history.push({
          pathname: "/admin",
          search: `?status=0`,
          state: { assetStatus: 0 },
        });
        return;
      case "active":
        history.push({
          pathname: "/admin",
          search: `?status=1`,
          state: { assetStatus: 1 },
        });
        return;
      case "subscribe":
        history.push({
          pathname: "/admin",
          search: `?status=-1`,
          state: { assetStatus: -1 },
        });
        return;
      default:
        history.push({
          pathname: "/admin",
          search: `?status=2`,
          state: { assetStatus: 0 },
        });
        return;
    }
  };

  return (
    <Sidebar>
      <SidebarMenu>
        <SidebarItem>
          <SidebarLinks to="/users">User Admin</SidebarLinks>
        </SidebarItem>
        <SidebarItem>
          <SidebarLinks to="/appadmin">App Maintainance</SidebarLinks>
        </SidebarItem>
        <SidebarItem>
          <TextField id="propertyType" label="Properties" variant="filled" InputLabelProps={{ shrink: true }} className={classes.root} InputProps={{ className: classes.input }} select value={visibleValue} style={{ width: "170px" }}
            onChange={(e) => {
              handleClick(e);
            }}
          >
            {propSelect.map((option) => (
              <MenuItem key={option.value} value={option.value} name={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </SidebarItem>
      </SidebarMenu>
    </Sidebar>
  );
}
