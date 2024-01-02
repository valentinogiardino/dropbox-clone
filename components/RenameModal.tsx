'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { db } from "@/firebase"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { Input } from "./ui/input"
import toast from "react-hot-toast"

export function RenameModal() {

  const { user } = useUser();
  const [input, setInput] = useState("");

  
  const[isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.filename
    ])

    async function renameFile() {
        if(!user || !fileId) return;

        const toastId = toast.loading("Renaming...");

        try {
            await updateDoc(doc(db, "users", user.id, "files", fileId), {
                filename: input,
            })
    
            toast.success("Renamed Succesfully", {
                id: toastId,
            })
        } catch (error) {
            toast.error("Renamed Failed", {
                id: toastId,
            })
        }

        

        setInput("");
        setIsRenameModalOpen(false);
    }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>
          <Input 
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
                if(e.key === "Enter"){
                    renameFile();
                }
            }}
          />
          <div className="flex justify-end space-x-2 py-3">
            <Button
                size="sm"
                className="px-3"
                variant={"ghost"}
                onClick={() => setIsRenameModalOpen(false)}
            >
                <span className="sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>

            <Button
                type="submit"
                size="sm"
                className="px-3"
                variant={"ghost"}
                onClick={() => renameFile()}
            >
                <span className="sr-only">Rename</span>
                <span>Rename</span>
            </Button>
        </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
