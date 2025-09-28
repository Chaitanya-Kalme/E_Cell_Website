'use client'
import AdminNavbar from "@/components/adminNavBar";
import { ExpandableCardDemo } from "@/components/expandable-card-demo-grid";
import React from "react";

export default function EventList(){
    return(
        <div>
            <AdminNavbar/>
            <div className="mt-30">
                <h1 className="text-center font-bold text-3xl italic">Event List</h1>
                <ExpandableCardDemo/>
            </div>
        </div>
    )
}