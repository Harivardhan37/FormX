import { useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea"

function TextArea({ fieldId, setFormData, required, placeholder, label }) {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="text">{label}</Label>
      <Textarea
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

export default TextArea;
