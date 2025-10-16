'use client'
import React, { isValidElement, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import AdminNavbar from "@/components/adminNavBar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";
import axios from "axios";

export default function EventCreation() {

  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeString, setTimeString] = useState("")
  const [isIndividualParticipation, setIsIndividualParticipation] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [eventLogo, setEventLogo] = useState<File>();
  const [eventRuleBook, setEventRuleBook] = useState<File>();
  const [submitButtonDisable,setSubmitButtonDisable] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement
    const eventName = (form.elements.namedItem("eventName") as HTMLInputElement)?.value
    const eventEmail = (form.elements.namedItem("email") as HTMLInputElement)?.value
    const eventFees = (form.elements.namedItem("eventFees") as HTMLFormElement)?.value
    let teamMinSize = (form.elements.namedItem("teamMinSize") as HTMLFormElement)?.value
    let teamMaxSize = (form.elements.namedItem("teamMaxSize") as HTMLFormElement)?.value
    const description = (form.elements.namedItem("description") as HTMLFormElement)?.value
    const webPageLink = (form.elements.namedItem("webPageLink") as HTMLFormElement)?.value

    if (isIndividualParticipation) {
      teamMinSize = 1, teamMaxSize=1
    }
    else if (!teamMinSize || !teamMaxSize) {
      toast.error("Team Maximum Size and Minimum Size is required.")
      return;
    }
    if(teamMinSize>teamMaxSize){
      toast.error("Minimum size of team should be less than Maximum size of team")
      return;
    }
    if (!eventName || !eventEmail || !eventFees || !eventLogo || !date || !timeString || !description || !webPageLink) {
      toast.error("All Fields are required")
      return;
    }
    const day = String(date.getDate()).padStart(2, '0');       
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();                           

    const dateString = `${day}/${month}/${year}`;

    const eventFormData = new FormData()
    eventFormData.append("eventName", eventName)
    eventFormData.append("eventDate", dateString)
    eventFormData.append("eventTime", timeString)
    eventFormData.append("eventFees", eventFees)
    eventFormData.append("minSize", teamMinSize)
    eventFormData.append("maxSize", teamMaxSize)
    eventFormData.append("eventImage", eventLogo)
    if(eventRuleBook){
      eventFormData.append("eventRuleBook", eventRuleBook)
    }
    eventFormData.append("description",description)
    eventFormData.append("isRegistrationOpen",isRegistrationOpen.toString())
    eventFormData.append("webPageLink",webPageLink)

    setSubmitButtonDisable(true)
    await axios.post("/api/events/createEvent", eventFormData)
      .then((response) => {
        toast.success(response.data.message)
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        return;
      })
      setSubmitButtonDisable(false)
  };


  return (
    <div>
      <AdminNavbar />
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-green-300 md:rounded-2xl md:p-8 dark:bg-blue-400 mt-32">
        <h2 className="text-2xl font-bold text-black dark:text-neutral-200 text-center italic ">
          E-Cell Event Creation Form
        </h2>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="eventName">Event Name</Label>
              <Input id="eventName" placeholder="Name" type="text" required={true}/>
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" required={true} />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="webPageLink">Web Page Link</Label>
            <Input id="webPageLink" type="text" required={true}/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="eventFees">Event Fees</Label>
            <Input id="eventFees" placeholder="50" type="number" required={true}/>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4 justify-center mt-2">
            <Label className="text-center text-lg">Event Date and Time</Label>
            <div className="flex text-center mt-1">
              <div className="flex flex-col mt-1">
                <Label htmlFor="date-picker" className="px-1">
                  Date
                </Label>
                <div className="bg-neutral-800 rounded-md mt-1">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker"
                        className="w-32 justify-between font-normal"
                      >
                        {date
                          ? date.toLocaleDateString('en-GB', {
                            timeZone: 'Asia/Kolkata',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })
                          : "Select date"}

                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date)
                          setOpen(false)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col ml-auto mt-1 text-center">
                <Label htmlFor="time-picker" className="px-1">
                  Time
                </Label>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  defaultValue="--:--:--"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none mt-1"
                  onChange={(e) => setTimeString(e.target.value)}
                  required={true}
                />
              </div>
            </div>
          </LabelInputContainer>
          <LabelInputContainer>
            <div className="flex items-center justify-center gap-3">
              <Checkbox className="border-black" onClick={() => setIsIndividualParticipation(!isIndividualParticipation)} />
              <Label className="text-black">IndividualParticipation</Label>
            </div>
          </LabelInputContainer>
          <div className="mb-4 mt-2 text-center flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2" >
            <LabelInputContainer >
              <Label htmlFor="teamMinSize">Team Minimum Size</Label>
              <Input id="teamMinSize" type="number" disabled={isIndividualParticipation} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="teamMaxSize">Team Maximum Size</Label>
              <Input id="teamMaxSize" type="number" disabled={isIndividualParticipation} />
            </LabelInputContainer>
          </div>

          <LabelInputContainer>
            <div className="flex items-center justify-center gap-3">
              <Checkbox className="border-black" onClick={() => setIsRegistrationOpen(!isRegistrationOpen)} />
              <Label className="text-black">Registration Open</Label>
            </div>
          </LabelInputContainer>

          <LabelInputContainer>
            <div className="flex items-center justify-center gap-3 mt-2">
              <Label className="text-black">Event Logo Image</Label>
              <Input id="picture" type="file" required={true} onChange={(e) => {
                const files = e.target.files
                if (!files) return;
                setEventLogo(files[0])
              }
              } />
            </div>
          </LabelInputContainer>
          <LabelInputContainer>
            <div className="flex items-center justify-center gap-3 mt-2">
              <Label className="text-black">Event Rule Book</Label>
              <Input id="ruleBook" type="file" onChange={(e) => {
                const files = e.target.files
                if (!files) return;
                setEventRuleBook(files[0])
              }
              } />
            </div>
          </LabelInputContainer>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="description" required={true} type="text" className="min-h-10"/>
            </LabelInputContainer>
          </div>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] mt-2"
            type="submit"
            onSubmit={handleSubmit}
            disabled={submitButtonDisable}
          >
            Create Event
          </button>

        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
