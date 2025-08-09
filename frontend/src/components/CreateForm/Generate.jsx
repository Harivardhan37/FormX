import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, Loader2, Sparkles, SparklesIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

async function GeminiGenerate(
  prompt,
  setFormFields,
  setLoading,
  setOpen,
  setNewForm,
  setDescription
) {
  try {
    setLoading(true);
    const response = await axios.post(`${BASE_URL}/gemini/generate`, {
      prompt: prompt,
    });
    console.log(response);
    setFormFields({ ...response.data.data, theme: "default" });
    toast.success("Form Generated");
    setLoading(false);
    setOpen(false);
    setDescription("");
    setNewForm(true);
  } catch (e) {
    console.log(e);
    console.log("Try Again...");
    toast.error("Try Again");
    setLoading(false);
  }
}

function Generate({ setNewForm, setFormFields, sidebar, tab }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  function HandleSubmit() {
    GeminiGenerate(
      description,
      setFormFields,
      setLoading,
      setOpen,
      setNewForm,
      setDescription
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {sidebar ? (
            <div>
              {tab ? (
                <div className="cursor-pointer flex items-center justify-center p-3 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground">
                  <Sparkles className="w-5 h-5" />
                </div>
              ) : (
                <div className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground">
                  <Sparkles className="w-5 h-5" />
                  <h2>Create Form</h2>
                </div>
              )}
            </div>
          ) : (
            <Button className="shadow-3xl z-50 cursor-pointer flex items-center">
              <Sparkles className="h-10 w-10" />
              <h2>Create Form</h2>
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="max-w-[425px] z-100">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              Add details about your Form here
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
              console.log("submitted...");
            }}
          >
            <div className="flex flex-col gap-2 pb-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Description of your Form</Label>
                <Textarea
                  id="description"
                  placeholder="Eg: Build a feedback form for a food delivery app with ratings and issue reporting."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="cursor-pointer w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-full" />
                ) : (
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-10 w-10" />
                    <span>Generate</span>
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Generate;
