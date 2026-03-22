import { useParams, Link } from "react-router";
import { ArrowLeft, Building2, CheckCircle2, Clock, FileText, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

// Mock student data lookup for demo purposes
const mockStudentDatabase: Record<string, any> = {
    "1": { name: "Ayse Demir", company: "Aselsan", year: 2026, status: "Approved", email: "ayse@cs.hacettepe.edu.tr", phone: "+90 555 123 4567" },
    "2": { name: "Mehmet Kaya", company: "Havelsan", year: 2026, status: "Approved", email: "mehmet@cs.hacettepe.edu.tr", phone: "+90 555 987 6543" },
    "3": { name: "Elif Yilmaz", company: "Trendyol", year: 2026, status: "Pending", email: "elif@cs.hacettepe.edu.tr", phone: "+90 555 456 7890" },
    "4": { name: "Can Aydin", company: "Tubitak Bilgem", year: 2026, status: "Rejected", email: "can@cs.hacettepe.edu.tr", phone: "+90 555 321 0987" },
    "5": { name: "Zeynep Koc", company: "Peak Games", year: 2025, status: "Approved", email: "zeynep@cs.hacettepe.edu.tr", phone: "+90 555 777 8888" },
    "6": { name: "Berk Ersoy", company: "SoftTech", year: 2026, status: "Pending", email: "berk@cs.hacettepe.edu.tr", phone: "+90 555 222 3333" },
};

const mockSubmissions = [
    { id: 1, title: "Internship Logbook (Week 1-4)", date: "15 Jul 2025", status: "Approved", type: "Logbook" },
    { id: 2, title: "Mid-term Evaluation Form", date: "01 Aug 2025", status: "Approved", type: "Evaluation" },
    { id: 3, title: "Final Internship Report v1", date: "20 Aug 2025", status: "Pending", type: "Report" },
];

export function CoordinatorStudentDetail() {
    const { id } = useParams<{ id: string }>();
    const student = id ? mockStudentDatabase[id] : null;

    if (!student) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold mb-2">Student Not Found</h2>
                <p className="text-muted-foreground mb-6">The ID provided does not match any records.</p>
                <Button asChild>
                    <Link to="/coordinator/analytics">Back to Analytics</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl px-6 py-8">
            {/* Header / Back Navigation */}
            <div className="mb-8">
                <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
                    <Link to="/coordinator/analytics">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Analytics
                    </Link>
                </Button>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            {student.name}
                            <Badge variant={student.status === "Approved" ? "default" : student.status === "Pending" ? "secondary" : "destructive"}>
                                {student.status}
                            </Badge>
                        </h1>
                        <p className="text-muted-foreground mt-1 text-lg">Class of {student.year}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Request Revision</Button>
                        <Button>Approve Internship</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Details */}
                <div className="space-y-6 md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 px-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                Contact Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm px-7">
                            <div>
                                <p className="text-muted-foreground mb-1">Email</p>
                                <p className="font-medium">{student.email}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-muted-foreground mb-1">Phone</p>
                                <p className="font-medium">{student.phone}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2 px-1">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                Placement
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm px-7">
                            <div>
                                <p className="text-muted-foreground mb-1">Company</p>
                                <p className="font-medium">{student.company}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-muted-foreground mb-1">Location</p>
                                <p className="font-medium">Ankara, TR</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Submission History */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Document Submissions</CardTitle>
                            <CardDescription>All internship documents submitted by {student.name.split(" ")[0]}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockSubmissions.map((sub) => (
                                    <div key={sub.id} className="flex items-start justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 rounded-full bg-primary/10 p-2">
                                                <FileText className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium leading-none mb-1.5">{sub.title}</p>
                                                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3" />
                                                    {sub.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge variant={sub.status === "Approved" ? "outline" : "secondary"} className="text-[10px] uppercase tracking-wider">
                                                {sub.status === "Approved" && <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" />}
                                                {sub.status}
                                            </Badge>
                                            <Button variant="link" size="sm" className="h-auto p-0 text-xs">View Document</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
