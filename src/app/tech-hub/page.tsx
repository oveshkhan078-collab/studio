import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

const newsItems = [
  {
    id: "1",
    title: "Breakthrough in Neural Interfaces: Brain-Computer Links Get Faster",
    source: "TechCrunch",
    date: "2025-03-15",
    image: PlaceHolderImages.find(img => img.id === 'tech-news-1')
  },
  {
    id: "2",
    title: "India's First Commercial Quantum Server Goes Live in Pune",
    source: "Pune Tech News",
    date: "2025-02-28",
    image: PlaceHolderImages.find(img => img.id === 'tech-news-2')
  },
  {
    id: "3",
    title: "The Rise of Generative Engineering: AI in B.Tech Curriculums",
    source: "Wired",
    date: "2025-01-20",
    image: PlaceHolderImages.find(img => img.id === 'tech-news-3')
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const hackathons = [
  {
    id: "1",
    title: "Innovate Pune Hackathon 2025",
    location: "Pune, Maharashtra",
    date: "2025-04-05 to 2025-04-06",
    image: PlaceHolderImages.find(img => img.id === 'hackathon-1')
  },
  {
    id: "2",
    title: "Code for a Cause - National Hackathon",
    location: "Online",
    date: "2025-03-22 to 2025-03-23",
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
                        fill 
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
                        fill
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
