import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BoxIcon, StickyNote } from "lucide-react";

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(", "); // or use <br /> if you want line breaks
  }

  if (isValidDate(value)) {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return value;
}

function isValidDate(value) {
  const date = new Date(value);
  return (
    typeof value === "string" &&
    !isNaN(date.getTime()) &&
    /\d{4}-\d{2}-\d{2}/.test(value)
  );
}

function ResponsesTable({ responses, fields }) {
  return (
    <div className="flex flex-col items-center justify-center m-2">
      {responses.length ? (
        <div className="w-full border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {fields.map((field) => {
                  return (
                    <TableHead key={field.uuid} className="pl-4">
                      {field.label}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses.map((response, id) => {
                const submission = JSON.parse(response.submission_data);
                return (
                  <TableRow key={id}>
                    {fields.map((field, ind) => {
                      return (
                        <TableCell key={ind}>
                          {formatValue(submission[field.uuid])}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] gap-3">
          <StickyNote className="w-10 h-full text-muted-foreground" />
          <p className="text-muted-foreground text-2xl font-medium">
            No Responses
          </p>
        </div>
      )}
    </div>
  );
}

export default ResponsesTable;
