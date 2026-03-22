import { LoginForm } from "../components/LoginForm";
import { GraduationCap } from "lucide-react";
import universityImage from "@/assets/8a84d46451290fb19e15723ec57820fd531604e1.png";

export function Login() {
  return (
    <div className="flex min-h-screen min-h-dvh bg-background lg:grid lg:grid-cols-2">
      {/* Left side - Image */}
      <div className="relative hidden min-h-dvh bg-muted lg:flex">
        <img
          src={universityImage}
          alt="Hacettepe University"
          className="size-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <div className="flex items-center gap-3 -mb-2">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Internship Management System</h2>
          </div>
          <p className="text-lg text-white/90 max-w-md">
            Streamline your internship program with our comprehensive platform for students, mentors, and administrators.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex min-h-screen min-h-dvh w-full items-center justify-center px-6 py-10 sm:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="bg-primary/10 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">IMS</span>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
