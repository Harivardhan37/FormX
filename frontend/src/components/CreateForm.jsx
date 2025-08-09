import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Layout, Loader2, Rocket } from "lucide-react";
import AddFieldButton from "@/components/CreateForm/AddFieldButton";
import ChangeHeader from "./CreateForm/ChangeHeader";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import BarLoader from "./BarLoader";
import ChangeTheme from "./CreateForm/ChangeTheme";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import SortFields from "./CreateForm/SortFields";
import OnDragEnd from "./CreateForm/OnDragEnd.js";
import PreviewButton from "./CreateForm/PreviewButton.jsx";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function CreateForm({ formFieldsDash }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [formFields, setFormFields] = useState(formFieldsDash);
  const [formData, setFormData] = useState({});
  const { systemTheme } = useTheme();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingt, setLoadingt] = useState(false);
  const [theme, setTheme] = useState(
    formFieldsDash ? formFieldsDash.theme : "default"
  );
  useEffect(() => {
    setTheme(formFieldsDash ? formFieldsDash.theme : "default");
    setFormFields(formFieldsDash);
    console.log(formFieldsDash);
  }, [formFieldsDash]);
  useEffect(() => {
    if (formFields) Cookies.set("form-fields", JSON.stringify(formFields));
  }, [formFields]);
  useEffect(() => {
    setFormFields((p) => ({ ...p, theme: theme }));
  }, [theme]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );
  if (!formFields || !formFields.fields)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarLoader />
      </div>
    );
  return (
    <div className={`${theme} ${systemTheme} h-full`}>
      <div className="bg-background min-h-screen pb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-row justify-between pt-6 md:pt-8 px-6 md:px-8 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Form Editor
            </h2>
            <p className="text-muted-foreground text-lg">
              You're in control — drag, drop, and tweak your form fields with
              ease.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={async () => {
                setLoading(true);
                try {
                  const res = await axios.post(
                    `${BASE_URL}/form/publish-form`,
                    {
                      formFields,
                      userId: user.id,
                    }
                  );
                  console.log(res);
                  toast.success("Form Published");
                  navigate("/dashboard");
                  Cookies.remove("form-fields", { path: "/" });
                } catch (e) {
                  toast.error("Try Again");
                  console.log(e);
                }
                setLoading(false);
              }}
              className="shadow-2xl z-50 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-full" />
              ) : (
                <div className="flex items-center gap-1">
                  <Rocket className="h-10 w-10" />
                  <h2 className="hidden md:flex">Publish Form</h2>
                </div>
              )}
            </Button>
            <Button
              onClick={async () => {
                setLoadingt(true);
                try {
                  const res = await axios.post(
                    `${BASE_URL}/form/publish-template`,
                    {
                      formFields,
                      userId: user.id,
                    }
                  );
                  console.log(res);
                  toast.success("Template Published");
                  navigate("/dashboard");
                  Cookies.remove("form-fields", { path: "/" });
                } catch (e) {
                  toast.error("Try Again");
                  console.log(e);
                }
                setLoadingt(false);
              }}
            >
              {isLoadingt ? (
                <Loader2 className="animate-spin w-full" />
              ) : (
                <div className="flex items-center gap-1">
                  <Layout className="h-10 w-10" />
                  <h2 className="hidden md:flex">Publish as Template</h2>
                </div>
              )}
            </Button>
          </div>
        </motion.div>
        <div className="flex flex-col justify-center items-center mt-5 ml-5 mr-5 md:mt-10 md:ml-10 md:mr-10 mb-16">
          <Card className="min-w-[350px] w-full max-w-md py-4 rounded-xl shadow-md">
            <CardHeader>
              <CardTitle>{formFields.title}</CardTitle>
              <CardDescription>{formFields.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(formData);
                }}
              >
                <div className="grid w-full items-center gap-4">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => {
                      OnDragEnd(event, setFormFields);
                    }}
                  >
                    <SortableContext
                      items={formFields.fields}
                      strategy={verticalListSortingStrategy}
                    >
                      {formFields.fields.map((field) => (
                        <SortFields
                          key={field.uuid}
                          field={field}
                          setFormFields={setFormFields}
                          setFormData={setFormData}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                  <Button className="w-full cursor-pointer" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="fixed bottom-5 ml-5 flex flex-col gap-2">
          <PreviewButton />
          <ChangeTheme theme={theme} setTheme={setTheme} />
        </div>
        <div className="fixed bottom-5 right-5 flex flex-col gap-2 items-end">
          <AddFieldButton setFormFields={setFormFields} />
          <ChangeHeader setFormFields={setFormFields} formFields={formFields} />
        </div>
      </div>
    </div>
  );
}

export default CreateForm;
