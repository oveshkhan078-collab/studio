import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

const newsItems = [
  {
    id: "1",
    title: "The Rise of AI in Modern Software Development",
    source: "TechCrunch",
    date: "2024-10-20",
    image: PlaceHolderImages.find(img => img.id === 'tech-news-1')
  },
  {
    id: "2",
    title: "Pune to Host Major Web3 Conclave Next Month",
    source: "Pune Tech News",
    date: "2024-10-18",
    image: PlaceHolderImages.find(img => img.id === 'tech-news-2')
  },
  {
    id: "3",
    title: "How Remote Work is Changing the Tech Landscape",
    source: "Wired",
    date: "2024-10-15",
    image: PlaceHolderImages.find(img => img.id === 'tech-news-3')
  }
];

const hackathons = [
  {
    id: "1",
    title: "Innovate Pune Hackathon 2024",
    location: "Pune, Maharashtra",
    date: "2024-11-05 to 2024-11-06",
    image: PlaceHolderImages.find(img => img.id === 'hackathon-1')
  },
  {
    id: "2",
    title: "Code for Good - Online Hackathon",
    location: "Online",
    date: "2024-11-12 to 2024-11-13",
    image: PlaceHolderImages.find(img => img.id === 'tech-news-1')
  }
];

export default function TechHubPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tech News &amp; Hackathon Alerts</h1>
        <p className="text-muted-foreground">Your feed for the latest in tech and upcoming events in Pune and online.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          <div className="space-y-6">
            {newsItems.map(item => (
              <Link href="#" key={item.id} className="block group">
                <Card className="flex flex-col md:flex-row overflow-hidden transition-all hover:shadow-lg">
                  {item.image && (
                    <div className="md:w-1/3 w-full h-48 md:h-auto relative">
                      <Image 
                        src={item.image.imageUrl} 
                        alt={item.title} 
                        layout="fill" 
                        objectFit="cover" 
                        data-ai-hint={item.image.imageHint}
                      />
                    </div>
                  )}
                  <div className="md:w-2/3 flex flex-col">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">{item.title}</CardTitle>
                      <CardDescription>{item.source} - {item.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                      <p className="text-sm font-semibold text-primary flex items-center">
                        Read More <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Hackathons</h2>
          <div className="space-y-6">
            {hackathons.map(item => (
              <Link href="#" key={item.id} className="block group">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  {item.image && (
                    <div className="h-40 relative">
                       <Image 
                        src={item.image.imageUrl} 
                        alt={item.title} 
                        layout="fill" 
                        objectFit="cover"
                        data-ai-hint={item.image.imageHint}
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                    <div className="text-sm text-muted-foreground mt-2 space-y-1">
                      <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {item.location}</p>
                      <p className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {item.date}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
