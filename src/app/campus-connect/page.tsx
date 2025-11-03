
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageSquare, Megaphone, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const announcements = [
  {
    title: "Tech Fest 'Innovate 2025' Kick-off!",
    date: "2025-04-20",
    body: "The annual tech fest, Innovate 2025, starts next week! Get ready for a series of workshops, competitions, and guest lectures. Check the event portal for the full schedule."
  },
  {
    title: "End-Semester Exam Schedule Published",
    date: "2025-04-18",
    body: "The final examination schedule for the current semester is now available on the student portal. Please review your dates carefully."
  },
  {
    title: "Library Hours Extended for Exams",
    date: "2025-04-15",
    body: "To help students prepare for finals, the central library will be open 24/7 from April 25th until the end of the examination period."
  }
];

const forumPosts = [
  {
    author: "Rohan Sharma",
    avatar: "RS",
    title: "Question about Data Structures exam pattern?",
    replies: 5,
    lastReply: "3 hours ago"
  },
  {
    author: "Priya Singh",
    avatar: "PS",
    title: "Looking for project members for our final year project.",
    replies: 12,
    lastReply: "1 day ago"
  }
];

export default function CampusConnectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">DY Patil Campus Connect</h1>
      <Tabs defaultValue="announcements" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="announcements"><Megaphone className="w-4 h-4 mr-2" />Announcements</TabsTrigger>
          <TabsTrigger value="schedules"><Calendar className="w-4 h-4 mr-2" />Schedules</TabsTrigger>
          <TabsTrigger value="forums"><MessageSquare className="w-4 h-4 mr-2" />Forums</TabsTrigger>
        </TabsList>
        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle>Latest Announcements</CardTitle>
              <CardDescription>Stay informed with the latest news and updates from campus.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedules">
          <Card>
            <CardHeader>
              <CardTitle>Academic &amp; Event Schedules</CardTitle>
              <CardDescription>Your personal and campus-wide schedules.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mt-8" />
              <p className="text-muted-foreground mt-4">Schedule integration is coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forums">
          <Card>
            <CardHeader>
              <CardTitle>Student Forums</CardTitle>
              <CardDescription>Discuss topics, ask questions, and collaborate with peers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {forumPosts.map((post, index) => (
                <div key={index}>
                  <div className="flex items-center space-x-4 p-4">
                     <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.author}`} />
                        <AvatarFallback>{post.avatar}</AvatarFallback>
                     </Avatar>
                     <div className="flex-1">
                        <h4 className="font-semibold">{post.title}</h4>
                        <p className="text-sm text-muted-foreground">by {post.author}</p>
                     </div>
                     <div className="text-right">
                        <div className="flex items-center gap-1 text-sm">
                           <Users className="w-4 h-4" /> {post.replies}
                        </div>
                        <p className="text-xs text-muted-foreground">{post.lastReply}</p>
                     </div>
                  </div>
                  {index < forumPosts.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
