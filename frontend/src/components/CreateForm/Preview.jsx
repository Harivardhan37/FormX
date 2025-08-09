import { useEffect, useState } from "react";
import PreviewMap from "./PreviewMap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BarLoader from "../BarLoader";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";

function Preview() {
  const [formFields, setFormFields] = useState(null);
  const [getting, setGetting] = useState(true);
  const { systemTheme } = useTheme();
  useEffect(() => {
    setGetting(true);
    try {
      const draft = Cookies.get("form-fields");
      console.log(draft);
      if (draft) setFormFields(JSON.parse(draft));
      else setFormFields(empty);
    } catch (err) {
      console.error("Error parsing cookie:", err);
      setFormFields(empty);
    }
    setGetting(false);
  }, []);
  if (getting)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarLoader />
      </div>
    );
  return (
    <div
      className={`${formFields.theme} ${systemTheme} flex min-h-screen items-center justify-center py-10 bg-background`}
    >
      <Card className="min-w-[350px] w-full max-w-md py-4 rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>{formFields.title}</CardTitle>
          <CardDescription>{formFields.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid w-full items-center gap-4">
              {formFields.fields.map((field) => (
                <PreviewMap
                  key={field.uuid}
                  field={field}
                  theme={formFields.theme}
                />
              ))}
              <Button className="w-full cursor-pointer" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Preview;
