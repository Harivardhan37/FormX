import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Pen } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const themes = [
  {
    id: "default",
    name: "Default",
  },
  {
    id: "amber",
    name: "Amber Minimal",
  },
  {
    id: "amethyst-haze",
    name: "Amethyst Haze",
  },
  {
    id: "bubblegum",
    name: "Bubblegum",
  },
  {
    id: "caffeine",
    name: "Caffeine",
  },
  {
    id: "candyland",
    name: "CandyLand",
  },
  {
    id: "catppuccin",
    name: "Catppuccin",
  },
];

function ChangeTheme({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="shadow-2xl z-50 cursor-pointer flex items-center"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <Palette className="h-10 w-10" />
            {show && (
              <motion.h2 transition={{ duration: 0.2, ease: "easeInOut" }}>
                Change Theme
              </motion.h2>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Theme</DialogTitle>
            <DialogDescription>
              Choose from pre-defined color palettes
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submitted...");
              setOpen(false);
            }}
          >
            <div className="flex flex-col gap-2 pb-4">
              <Label htmlFor="select">Select Theme</Label>
              <Select id="select" value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((t, ind) => {
                    return (
                      <SelectItem
                        className="cursor-pointer"
                        key={ind}
                        value={t.id}
                      >
                        {t.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit" className="cursor-pointer">
                Close
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangeTheme;
