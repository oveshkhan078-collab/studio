import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, Search } from "lucide-react";

const internships = [
  {
    title: "Software Engineer Intern",
    company: "InnovateTech",
    location: "Pune, Maharashtra",
    type: "Full-time",
    logo: "IT"
  },
  {
    title: "Data Science Intern",
    company: "DataMinds",
    location: "Remote",
    type: "Part-time",
    logo: "DM"
  },
  {
    title: "Frontend Developer Intern",
    company: "Creative Solutions",
    location: "Pune, Maharashtra",
    type: "Full-time",
    logo: "CS"
  },
  {
    title: "Cybersecurity Intern",
    company: "SecureNet",
    location: "Online",
    type: "Full-time",
    logo: "SN"
  },
];

export default function InternshipFinderPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Internship Finder</h1>
        <p className="text-muted-foreground">Find your next big opportunity. Connect with top companies.</p>
      </div>
      
      <div className="mb-6 flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by title, company, or skill" className="pl-10" />
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internships.map((internship, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{internship.title}</CardTitle>
                  <CardDescription className="font-medium text-primary">{internship.company}</CardDescription>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted font-bold text-primary">
                  {internship.logo}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> {internship.location}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" /> {internship.type}
                </div>
              </div>
              <Button className="mt-4 w-full">Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
