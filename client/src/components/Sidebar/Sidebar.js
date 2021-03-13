import React, { Component } from "react";
import {
  Sidebar,
  SideScroll,
  SidebarMenu,
  SidebarItem,
  SidebarLinks,
  SidebarChild,
  SidebarRef,
} from "./Sidebar.style";

export default function SideBar(props) {
  return (
    <Sidebar>
      <SidebarMenu>
        <SidebarItem>
          <SidebarLinks to="/users">User Admin</SidebarLinks>
        </SidebarItem>
        <SidebarItem>
            Properties
            <SidebarChild>
              <dd>
                <SidebarRef
                  href="#"
                  onClick={(e) => {
                    props.updateStatusInput(0);
                  }}
                >
                  Pending
                </SidebarRef>
              </dd>
              <dd>
              <SidebarRef
                  href="#"
                  onClick={(e) => {
                    props.updateStatusInput(1);
                  }}
                >
                  Active Listing
                </SidebarRef>
              </dd>
              <dd>
              <SidebarRef
                  href="#"
                  onClick={(e) => {
                    props.updateStatusInput(-1);
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
