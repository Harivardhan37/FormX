import { Plus } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

function AddFieldButton({ setFormFields }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState("");
  const [required, setRequired] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [options, setOptions] = useState([]);
  const [type, setType] = useState("");
  const types = [
    {
      name: "Text",
      id: "text",
    },
    {
      name: "Email",
      id: "email",
    },
    {
      name: "Date",
      id: "date",
    },
    {
      name: "Radio",
      id: "radio",
    },
    {
      name: "Check Box",
      id: "checkbox",
    },
    {
      name: "Select",
      id: "select",
    },
    {
      name: "Text Area",
      id: "textarea",
    },
  ];

  function HandleSubmit() {
    const cleanedOptions = options.filter((option) => option.trim() !== "");
    setOptions(cleanedOptions);
    setFormFields((prev) => {
      const newField = {
        label: label,
        type: type,
        uuid: uuidv4(),
        required: required,
        placeholder: placeholder,
        options: cleanedOptions,
      };
      console.log(options);
      console.log(newField);
      const newFields = [...prev.fields, newField];
      return {
        ...prev,
        fields: newFields,
      };
    });
  }

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            setType("");
            setLabel("");
            setOptions([]);
            setPlaceholder("");
            setRequired(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="shadow-2xl z-50 cursor-pointer flex items-center"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            {show && (
              <motion.h2 transition={{ duration: 0.2, ease: "easeInOut" }}>
                Add Field
              </motion.h2>
            )}
            <Plus className="h-10 w-10" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Form Field</DialogTitle>
            <DialogDescription>Fill the following details</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
              console.log("submitted...");
              setOpen(false);
              setType("");
              setLabel("");
              setOptions([]);
              setPlaceholder("");
              setRequired(false);
            }}
          >
            <div className="flex flex-col gap-2 pb-4">
              <Label htmlFor="type">Type</Label>
              <Select
                id="type"
                value={type}
                onValueChange={(t) => {
                  setType(t);
                  setLabel("");
                  setOptions([]);
                  setPlaceholder("");
                  setRequired(false);
                }}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((t, ind) => {
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
              {type && (
                <div className="flex flex-col gap-2 pb-4">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="label">Label</Label>
                    <Input
                      id="label"
                      placeholder="Enter Label"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                    />
                  </div>
                  {type !== "radio" &&
                    type !== "checkbox" &&
                    type !== "select" &&
                    type !== "date" && (
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="placeholder">PlaceHolder</Label>
                        <Input
                          id="placeholder"
                          placeholder="Enter Placeholder"
                          value={placeholder}
                          onChange={(e) => setPlaceholder(e.target.value)}
                        />
                      </div>
                    )}
                  {(type === "radio" ||
                    type === "checkbox" ||
                    type === "select") && (
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="placeholder">Options</Label>
                      {options.map((op, ind) => {
                        return (
                          <div key={ind}>
                            <Input
                              id="options"
                              placeholder="Enter Option"
                              value={op}
                              onChange={(e) =>
                                setOptions((p) =>
                                  p.map((o, i) =>
                                    i === ind ? e.target.value : o
                                  )
                                )
                              }
                            />
                          </div>
                        );
                      })}
                      <Button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setOptions((p) => [...p, ""])}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="required"
                      checked={required}
                      className="cursor-pointer"
                      onCheckedChange={setRequired}
                    />
                    <Label htmlFor="required">Required</Label>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="cursor-pointer">
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddFieldButton;
