import { PageHeader } from "../components/PageHeader";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { Building2, Mail, Phone, User, BookOpen } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "../components/ui/card";

export function StudentProfile() {
    const { user } = useAuth();

    return (
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
            <PageHeader
                title="Profile Settings"
                description="Manage your personal information and preferences."
            />

            <div className="mt-8 grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Your basic details are synced from the university system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="name" defaultValue={user?.name} className="pl-9" disabled />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">University Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="email" defaultValue={user?.email} className="pl-9" disabled />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="phone" defaultValue="+90 555 123 4567" className="pl-9" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Academic Details</CardTitle>
                            <CardDescription>Your current enrollment status.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input defaultValue="Computer Engineering" className="pl-9" disabled />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Current Semester</Label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input defaultValue="6th Semester" className="pl-9" disabled />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Update your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary">Update Password</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
