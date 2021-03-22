import React from "react";
import { useHistory } from "react-router-dom";
import {
  Sidebar,
  SidebarMenu,
  SidebarItem,
  SidebarLinks,
  SidebarChild,
  SidebarRef,
} from "./Sidebar.style";

export default function SideBar() {
  const history = useHistory();

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
          Properties
          <SidebarChild>
            <dd>
              <SidebarRef
                href="#"
                id="pending"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Pending
              </SidebarRef>
            </dd>
            <dd>
              <SidebarRef
                href="#"
                id="active"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Active Listing
              </SidebarRef>
            </dd>
            <dd>
              <SidebarRef
                href="#"
                id="subscribe"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Fully Subscribe
              </SidebarRef>
            </dd>
          </SidebarChild>
        </SidebarItem>
      </SidebarMenu>
    </Sidebar>
  );
}
