import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function DeleteConfirmationDialog({ children, DeleteProduct }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>

          <h2 className="mt-2">
            Do you really want to delete this product?
          </h2>

          <div className='flex gap-2 justify-end mt-4'>
            <Button type="button">Close</Button>
            <Button className='bg-red-500' onClick={DeleteProduct}>Delete</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationDialog
