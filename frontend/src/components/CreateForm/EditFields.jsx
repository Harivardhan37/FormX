import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function EditFields({ setFormFields, field }) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(field.label);
  const [required, setRequired] = useState(field.required);
  const [placeholder, setPlaceholder] = useState(field.placeholder || "");
  const [options, setOptions] = useState(field.options || []);
  console.log("checked" + " " + required);
  function HandleSubmit() {
    console.log("submitted..");
    const cleanedOptions = options.filter((option) => option.trim() !== "");
    setOptions(cleanedOptions);
    setFormFields((prev) => {
      const newField = {
        label: label,
        type: field.type,
        uuid: field.uuid,
        required: required,
        placeholder: placeholder,
        options: cleanedOptions,
      };
      const newFields = prev.fields.map((f) =>
        f.uuid === field.uuid ? newField : f
      );

      return {
        ...prev,
        fields: newFields,
      };
    });
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-2 cursor-pointer">
            <SquarePen className="h-5 w-5" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Form Field</DialogTitle>
            <DialogDescription>Confirm the following details</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
              setOpen(false);
              console.log("submitted...");
            }}
          >
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
              {field.type !== "radio" &&
                field.type !== "checkbox" &&
                field.type !== "select" &&
                field.type !== "date" && (
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
              {(field.type === "radio" ||
                field.type === "checkbox" ||
                field.type === "select") && (
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
                              p.map((o, i) => (i === ind ? e.target.value : o))
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
            <DialogFooter>
              <Button type="submit" className="cursor-pointer">
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditFields;
