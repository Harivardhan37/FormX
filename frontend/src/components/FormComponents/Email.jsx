import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function Email({ fieldId, setFormData, required, placeholder, label }) {
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="email">{label}</Label>
      <Input
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setFormData((p) => ({ ...p, [fieldId]: e.target.value }));
        }}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Email;
