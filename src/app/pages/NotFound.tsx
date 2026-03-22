import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { FileQuestion } from "lucide-react";

export function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
            <div className="rounded-full bg-muted p-6 mb-8">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                404 - Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild size="lg">
                <Link to="/">Return to Dashboard</Link>
            </Button>
        </div>
    );
}
