import { ArrowBigRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
      </div>
      <div>
        <Link to="/" className="mt-2 flex items-center">
          <p className="text-md text-muted-foreground">Go to Home</p>
          <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
