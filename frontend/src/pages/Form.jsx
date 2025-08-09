import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BarLoader from "../components/BarLoader";
import PreviewMap from "../components/CreateForm/PreviewMap";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../components/ui/button";
import FormMap from "../components/Form/FormMap";
import { Loader2 } from "lucide-react";
import NotFound from "../components/NotFound";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function Form() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { systemTheme } = useTheme();
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/form/get-form`, {
          params: {
            formId,
          },
        });
        console.log(JSON.parse(res.data.data.form_fields));
        setFormFields(JSON.parse(res.data.data.form_fields));
      } catch (e) {
        console.log(e);
        setNotFound(true);
      }
    };
    getForm();
  }, []);

  if (notFound) {
    return <NotFound />;
  }

  if (!formFields) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarLoader />
      </div>
    );
  }

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
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                setSubmitting(true);
                const res = await axios.post(`${BASE_URL}/form/submit-form`, {
                  formData,
                  formId,
                });
                toast.success("Submitted successfully");
                navigate("/");
              } catch (e) {
                toast.error("Something went wrong");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div className="grid w-full items-center gap-4">
              {formFields.fields.map((field) => (
                <FormMap
                  key={field.uuid}
                  field={field}
                  theme={formFields.theme}
                  setFormData={setFormData}
                />
              ))}
              <Button
                className="w-full cursor-pointer"
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <Loader2 className="animate-spin w-full" />
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Form;
