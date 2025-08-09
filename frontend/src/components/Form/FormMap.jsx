import Text from "../FormComponents/Text";
import Email from "../FormComponents/Email";
import Radio from "../FormComponents/Radio";
import CheckBox from "../FormComponents/CheckBox";
import Select from "../FormComponents/Select";
import TextArea from "../FormComponents/TextArea";
import Date from "../FormComponents/Date";

function FormMap({ field, theme, setFormData }) {
  return (
    <div className="relative flex items-start gap-2">
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
            theme={theme}
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
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}

export default FormMap;
