import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Radio({ fieldId, setFormData, required, label, options }) {
  const [radio, setRadio] = useState("");
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="radio">{label}</Label>
      <RadioGroup
        id="radio"
        onValueChange={(value) => {
          setRadio(value);
          console.log(value);
          setFormData((p) => ({ ...p, [fieldId]: value }));
        }}
        required={required}
      >
        {options.map((op, ind) => {
          return (
            <div key={ind} className="flex items-center space-x-2">
              <RadioGroupItem className="cursor-pointer" value={op} id={`${fieldId}-${ind}`} />
              <Label htmlFor={`${fieldId}-${ind}`}>{op}</Label>
            </div>
          );
        })}
      </RadioGroup>
      <Input
        id="radio"
        type="text"
        value={radio}
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

export default Radio;
