import { ArrowLeft, ArrowUpRight, Eye } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BarLoader from "../BarLoader";
import axios from "axios";
import ShareButton from "../DashBoardHome/Share";
import ResponsesTable from "./ResponsesTable";
import Export from "./Export.js";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function Responses({ uuid, setRequested }) {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState([]);
  const [fields, setFields] = useState([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    const getResponses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/form/get-responses`, {
          params: {
            userId: user.id,
            uuid,
          },
        });
        console.log(res.data.responses);
        setResponses(res.data.responses);
        setTitle(res.data.formFields.title);
        setFields(res.data.formFields.fields);
        console.log(res.data.formFields);
      } catch (e) {
        console.log(e);
        toast.error("Try Again");
      } finally {
        setLoading(false);
      }
    };
    getResponses();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarLoader />
      </div>
    );
  }
  return (
    <div>
      <div className="m-4 flex flex-col gap-4 items-start">
        <Button
          variant="ghost"
          className="rounded-lg"
          onClick={() => {
            setRequested(null);
          }}
        >
          <ArrowLeft className="!w-4 !h-4" />
          Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-foreground py-2">
            {title} Form Responses
          </h2>
        </div>
        <div className="flex justify-between w-full items-center">
          <div className="flex gap-2 items-center justify-center">
            <a href={`/form/${uuid}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="shadow-2xl">
                Show Form
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <ShareButton show={true} uuid={uuid} title={title} />
          </div>
          <div>
            <Button
              onClick={() => {
                Export(fields, responses, title);
              }}
              disabled={!responses.length}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
      <div>
        <ResponsesTable responses={responses} fields={fields} />
      </div>
    </div>
  );
}

export default Responses;
