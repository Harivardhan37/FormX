import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function TemplateCards({ templates, setToggle }) {
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="grid grids-col-1 sm:grid-cols-2 gap-4">
      {templates.map((template) => {
        return (
          <Card
            key={template.uuid}
            className="w-full h-full flex justify-center rounded-xl shadow-md hover:shadow-2xl"
          >
            <CardHeader>
              <CardTitle className="text-start text-xl">
                {template.title}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center justify-between gap-2">
              <div className="flex flex-col items-start">
                <p className="text-md text-muted-foreground">
                  By {template.name}
                </p>
              </div>
              <Button
                onClick={async () => {
                  try {
                    setLoadingId(template.uuid);
                    console.log("clicked");
                    console.log(template.uuid);
                    console.log("Requesting:", `${BASE_URL}/form/get-template`);
                    const result = await axios.get(
                      `${BASE_URL}/form/get-template`,
                      {
                        params: {
                          templateId: template.uuid,
                        },
                      }
                    );
                    console.log(result.data.data);
                    Cookies.set("form-fields", JSON.stringify(result.data.data));
                    setToggle(p => !p);
                    navigate("/dashboard/create");
                  } catch (e) {
                    console.log(e);
                  } finally {
                    setLoadingId(null);
                  }
                }}
              >
                {loadingId === template.uuid ? (
                  <Loader2 className="animate-spin w-full" />
                ) : (
                  <span>Use Template</span>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default TemplateCards;
