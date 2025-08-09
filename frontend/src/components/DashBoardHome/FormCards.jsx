import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Delete from "./Delete";
import ShareButton from "./Share";
function FormCards({ forms, setForms, setRequested }) {
  console.log(forms);
  return (
    <div className="grid grids-col-1 sm:grid-cols-2 gap-4">
      {forms.map((form) => {
        return (
          <Card
            key={form.uuid}
            className="w-full h-full rounded-xl shadow-md hover:shadow-2xl"
          >
            <CardHeader className="relative">
              <CardTitle className="text-start text-xl">{form.title}</CardTitle>
              {/* <Link to={`/form/${form.uuid}`}> */}
              <ArrowUpRight
                onClick={() => {
                  setRequested(form.uuid);
                }}
                className="absolute cursor-pointer top-0 right-3 w-6 h-6 transition-transform hover:translate-x-1 hover:-translate-y-1 text-muted-foreground"
              />
              {/* </Link> */}
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start">
                <p className="text-sm text-muted-foreground">
                  Created:{" "}
                  {formatDistanceToNow(new Date(form.created_at), {
                    addSuffix: true,
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  Responses: {form.responses}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-2">
              <ShareButton uuid={form.uuid} title={form.title} />
              <Delete uuid={form.uuid} setForms={setForms} />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default FormCards;
