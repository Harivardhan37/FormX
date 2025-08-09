import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";

function CheckBox({ fieldId, setFormData, required, label, options }) {
  const [check, setCheck] = useState([]);
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="check">{label}</Label>
      {options.map((op, ind) => {
        return (
          <div key={ind} className="flex items-center space-x-2">
            <Checkbox
              id={`${fieldId}-${ind}`}
              checked={check?.includes(op)}
              className="cursor-pointer"
              onCheckedChange={(checked) => {
                setCheck((prev) =>
                  checked ? [...prev, op] : prev.filter((val) => val !== op)
                );
                setFormData((prev) => ({
                  ...prev,
                  [fieldId]: checked
                    ? [...(prev[fieldId] || []), op]
                    : (prev[fieldId] || []).filter((val) => val !== op),
                }));
              }}
            />
            <Label htmlFor={`${fieldId}-${ind}`}>{op}</Label>
          </div>
        );
      })}
      <Input
        id="check"
        type="text"
        value={check}
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

export default CheckBox;
