import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function SignUpForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up attempted with:", { email });
    // Handle sign up logic here
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="text-muted-foreground">
          Sign up with your university email address
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">CS Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@cs.hacettepe.edu.tr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern=".*@cs\.hacettepe\.edu\.tr$"
              title="Please use your cs.hacettepe.edu.tr email address"
            />
            <p className="text-xs text-muted-foreground">
              Please use your @cs.hacettepe.edu.tr email address
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Sign Up
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
