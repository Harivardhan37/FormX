import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function Text({ fieldId, setFormData, required, placeholder, label }) {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="text">{label}</Label>
      <Input
        id="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setFormData((p) => ({ ...p, [fieldId]: e.target.value }));
        }}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Text;
