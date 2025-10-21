'use client'
import AdminNavbar from '@/components/adminNavBar'
import { LoaderOne } from '@/components/ui/loader'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type event = {
    description: string,
    eventDateAndTime: Date,
    eventName: string,
    eventFees: number,
    eventImage: string,
    id: string,
    isRegistrationOpen: Boolean,
    maxSize: number,
    minSize: number,
    webPageLink: string
}

export type user = {
    id: string,
    email: string,
    userName: string,
    isVerified: Boolean,
    mobileNo: string,
}



export type participant = {
    id: string,
    EventParticipated: event,
    TeamName: string,
    participants: user[]
};

const columns: ColumnDef<participant>[] = [
    {
        accessorKey: "id",
        header: "id",
        enableHiding: false,
    },
    {
        accessorKey: "TeamName",
        header: "Team Name",
        cell: ({ row }) => {
            return (
                <div>{row.getValue("TeamName")}</div>
            )
        }
    },
    {
        accessorFn: (row) => row.EventParticipated.eventName, // 👈 only expose `eventName`
        id: "EventParticipated", // 👈 required when using accessorFn
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Event
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => {
            const eventDetails: event = row.original.EventParticipated; // 👈 use `original` here
            return (
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline">{eventDetails.eventName}</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-center">
                                    {eventDetails.eventName}
                                </DialogTitle>
                                <div className="flex">
                                    <DialogDescription className="text-center">
                                        <span className='font-bold'>Date:</span> {new Date(eventDetails.eventDateAndTime).toDateString()}
                                        <br />
                                        <span className='font-bold'>Time:</span> {new Date(eventDetails.eventDateAndTime).toTimeString()}
                                        <br />
                                        <span className='font-bold'>Event Fees:</span>  {eventDetails.eventFees}
                                        <br />
                                        <span className='font-bold'>Web Page Link:</span> {" "}
                                        <a
                                            href={
                                                eventDetails.webPageLink.startsWith("http")
                                                    ? eventDetails.webPageLink
                                                    : `http://${eventDetails.webPageLink}`
                                            }
                                            target="_blank"
                                            className="text-blue-300"
                                            rel="noopener noreferrer"
                                        >
                                            Link
                                        </a>
                                        <br />
                                        <span className='font-bold'>Registration Open:</span> {" "}
                                        {eventDetails.isRegistrationOpen ? "Open" : "Closed"}
                                        <br />
                                        <span className='font-bold'>Team Minimum Size:</span>  {eventDetails.minSize}
                                        <br />
                                        <span className='font-bold'>Team Maximum Size:</span>  {eventDetails.maxSize}
                                    </DialogDescription>
                                    <img
                                        src={eventDetails.eventImage}
                                        alt={eventDetails.eventName}
                                        className="size-25"
                                    />
                                </div>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3 text-center">
                                    {eventDetails.description}
                                </div>
                            </div>
                        </DialogContent>
                    </form>
                </Dialog>
            );
        },
    },
    {
        accessorKey: "participants",
        header: () => <div>Participants</div>,
        cell: ({ row }) => {
            const participantArr: user[] = row.getValue("participants")
            return (
                <div className='flex gap-x-2'>
                    {
                        participantArr.map((participant) =>
                            <Dialog>
                                <form>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">{participant.userName}</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-center">
                                                {participant.userName}
                                            </DialogTitle>
                                            <div className="flex">
                                                <DialogDescription className="text-center">
                                                    <span className='font-bold'>Email:</span> {participant.email}
                                                    <br />
                                                    <span className='font-bold'>Mobile Number:</span> {participant.mobileNo}
                                                    <br />
                                                </DialogDescription>
                                            </div>
                                        </DialogHeader>
                                    </DialogContent>
                                </form>
                            </Dialog>
                        )
                    }

                </div>
            )
        },
    }
]



export default function PaticipantPage() {
    const [loading, setLoading] = useState(true)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
        id: false
    })
    const [rowSelection, setRowSelection] = React.useState({})
    const [participantsList, setParticipantsList] = useState([])

    const table = useReactTable({
        data: participantsList,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    useEffect(() => {
        axios.get("/api/participant/getAllParticipants")
            .then((response) => {
                setParticipantsList(response.data.data)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
            .finally(() => setLoading(false))
    }, [])



    const handleDownloadPdf = () => {
        const doc = new jsPDF();

        const rows = table.getRowModel().rows;

        const headers = [
            "Team Name",
            "Event Name",
            "Event Date",
            "Participant Name",
            "Email",
            "Mobile",
        ];

        const body: any[] = [];

        let teamColorToggle = false;

        rows.forEach((row) => {
            const team = row.original;
            const teamName = team.TeamName;
            const event = team.EventParticipated;
            const eventName = event?.eventName || "";
            const eventDate = new Date(event?.eventDateAndTime || "").toDateString();

            // Determine background color for this team
            const rowColor = teamColorToggle ? [230, 247, 255] : [255, 245, 230]; // light blue vs light orange
            teamColorToggle = !teamColorToggle;

            team.participants.forEach((participant, index) => {
                const rowData = [
                    {
                        content: index === 0 ? teamName : "",
                        styles: {
                            halign: "center",        // center align
                            fillColor: rowColor,
                        },
                    },
                    {
                        content: index === 0 ? eventName : "",
                        styles: {
                            fillColor: rowColor,
                        },
                    },
                    {
                        content: index === 0 ? eventDate : "",
                        styles: {
                            fillColor: rowColor,
                        },
                    },
                    {
                        content: participant.userName,
                        styles: {
                            fillColor: rowColor,
                        },
                    },
                    {
                        content: participant.email,
                        styles: {
                            fillColor: rowColor,
                        },
                    },
                    {
                        content: participant.mobileNo,
                        styles: {
                            fillColor: rowColor,
                        },
                    },
                ];

                body.push(rowData);
            });
        });

        doc.setFontSize(14);
        doc.text("Participants Report", 14, 15);

        autoTable(doc, {
            startY: 20,
            head: [headers],
            body: body,
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
            headStyles: {
                fillColor: [44, 62, 80], // dark gray/blue
                textColor: [255, 255, 255],
            },
            columnStyles: {
                0: { halign: "center" }, // Center Team Name column
            },
        });

        doc.save("participants-report.pdf");
    };







    if (loading) {
        return (
            <LoaderOne />
        )
    }


    return (
        <div>
            <AdminNavbar />
            <div className='mt-32 m-4'>
                <h1 className='text-center font-bold text-2xl italic'>Participants Entries</h1>
                <div className="w-full">
                    <div className="flex items-center py-4 justify-between gap-10">
                        <Input
                            placeholder="Filter Event..."
                            value={(table.getColumn("EventParticipated")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("EventParticipated")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        <Button onClick={handleDownloadPdf}>
                            Download as PDF
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
