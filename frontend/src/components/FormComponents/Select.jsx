import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select as SelectS,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./../../index.css";
import { useTheme } from "next-themes";

function Select({ fieldId, setFormData, required, label, options, theme }) {
  const [select, setSelect] = useState("");
  const { systemTheme } = useTheme();
  return (
    <div className={`flex flex-col space-y-1.5`}>
      <Label htmlFor="select">{label}</Label>
      <SelectS
        id="select"
        value={select}
        onValueChange={(value) => {
          setSelect(value);
          setFormData((p) => ({ ...p, [fieldId]: value }));
        }}
      >
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className={`${theme} ${systemTheme}`}>
          {options
            .filter((option) => option.trim() !== "")
            .map((op, ind) => {
              return (
                <SelectItem className="cursor-pointer" key={ind} value={op}>
                  {op}
                </SelectItem>
              );
            })}
        </SelectContent>
      </SelectS>
      <Input
        id="select"
        type="text"
        value={select}
        onChange={() => {}}
        required={required}
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        tabIndex={-1}
      />
    </div>
  );
}

export default Select;
