import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function Delete({ uuid, setForms }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <Button className="shadow-2xl cursor-pointer">
              <Trash className="h-10 w-10" />
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              form and remove its data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              //   console.log("submitted...");
              try {
                setLoading(true);
                const res = await axios.delete(`${BASE_URL}/form/delete`, {
                  data: {
                    uuid,
                  },
                });
                setForms((p) => p.filter((form) => form.uuid !== uuid));
                toast.success("Deleted Succesfully");
              } catch (e) {
                // console.log("Try Again");
                toast.error("Try Again");
              } finally {
                setLoading(false);
                setOpen(false);
              }
            }}
          >
            <DialogFooter className="flex">
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button type="submit" className="cursor-pointer">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>Continue</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Delete;
