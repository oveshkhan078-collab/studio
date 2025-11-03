import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

const notes = [
  {
    title: "Complete Data Structures & Algorithms Notes",
    author: "Riya Patil",
    price: "150",
    rating: 4.8,
    reviews: 72,
    image: "https://picsum.photos/seed/notes1/300/200",
    imageHint: "abstract algorithm"
  },
  {
    title: "Operating Systems - All Units Covered",
    author: "Amit Kumar",
    price: "120",
    rating: 4.6,
    reviews: 45,
    image: "https://picsum.photos/seed/notes2/300/200",
    imageHint: "computer screen"
  },
  {
    title: "Advanced Database Management Systems",
    author: "Sneha Gupta",
    price: "180",
    rating: 4.9,
    reviews: 98,
    image: "https://picsum.photos/seed/notes3/300/200",
    imageHint: "database servers"
  },
  {
    title: "Mechanical Engineering: Thermodynamics",
    author: "Vikram Singh",
    price: "100",
    rating: 4.5,
    reviews: 30,
    image: "https://picsum.photos/seed/notes4/300/200",
    imageHint: "engine mechanics"
  }
];

export default function NotesMarketplacePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">B.Tech Notes Marketplace</h1>
        <p className="text-muted-foreground">Buy and sell peer-reviewed study materials to excel in your courses.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.map((note, index) => (
          <Card key={index} className="overflow-hidden flex flex-col">
            <div className="relative w-full h-40">
              <Image src={note.image} alt={note.title} fill className="object-cover" data-ai-hint={note.imageHint} />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{note.title}</CardTitle>
              <CardDescription>by {note.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-bold">{note.rating}</span>
                  <span className="ml-2 text-muted-foreground text-sm">({note.reviews} reviews)</span>
                </div>
                <p className="text-2xl font-bold">₹{note.price}</p>
              </div>
              <Button className="mt-4 w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
