import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, Trash2 } from "lucide-react";
import Text from "../FormComponents/Text";
import Email from "../FormComponents/Email";
import Radio from "../FormComponents/Radio";
import CheckBox from "../FormComponents/CheckBox";
import Select from "../FormComponents/Select";
import TextArea from "../FormComponents/TextArea";
import Date from "../FormComponents/Date";
import { Button } from "../ui/button";
import EditFields from "./EditFields";

function SortFields({ field, setFormFields, setFormData }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative flex items-start gap-2"
    >
      <button
        type="button"
        className="cursor-grab active:cursor-grabbing p-2 rounded hover:bg-muted touch-none"
        aria-label="Drag to reorder"
        {...listeners}
        {...attributes}
      >
        <Grip className="h-5 w-5" />
      </button>
      <div className="flex-1">
        {field.type === "text" && (
          <Text
            fieldId={field.uuid}
            setFormData={setFormData}
            required={field.required}
            placeholder={field.placeholder}
            label={field.label}
          />
        )}
        {field.type === "email" && (
          <Email
            fieldId={field.uuid}
            setFormData={setFormData}
            required={field.required}
            placeholder={field.placeholder}
            label={field.label}
          />
        )}
        {field.type === "radio" && (
          <Radio
            fieldId={field.uuid}
            setFormData={setFormData}
            required={field.required}
            label={field.label}
            options={field.options}
          />
        )}
        {field.type === "checkbox" && (
          <CheckBox
            fieldId={field.uuid}
            setFormData={setFormData}
            required={field.required}
            label={field.label}
            options={field.options}
          />
        )}
        {field.type === "select" && (
          <Select
            fieldId={field.uuid}
            setFormData={setFormData}
            required={field.required}
            label={field.label}
            options={field.options}
          />
        )}
        {field.type === "textarea" && (
          <TextArea
            fieldId={field.uuid}
            setFormData={setFormData}
            required={field.required}
            placeholder={field.placeholder}
            label={field.label}
          />
        )}
        {field.type === "date" && (
          <Date
            fieldId={field.uuid}
            setFormData={setFormData}
            required={field.required}
            label={field.label}
          />
        )}
      </div>
      <EditFields setFormFields={setFormFields} field={field} />
      <Button
        variant="destructive"
        onClick={() => {
          setFormFields((prev) => {
            console.log(prev);
            const newFields = prev.fields.filter((f) => f.uuid !== field.uuid);
            console.log(newFields);
            return {
              ...prev,
              fields: newFields,
            };
          });
        }}
        className="p-2 cursor-pointer"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default SortFields;
