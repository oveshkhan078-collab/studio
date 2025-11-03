import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Puzzle, Construction } from "lucide-react";

export default function GameDesignSandboxPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">3D Game Design Sandbox</h1>
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <Puzzle className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Unleash Your Creativity Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground max-w-md mx-auto">
            The 3D Game Design Sandbox is in development. Get ready to build, design, and explore your own 3D puzzle games in our intuitive creative environment.
          </p>
          <Construction className="w-16 h-16 text-muted-foreground/50 mx-auto mt-8" />
        </CardContent>
      </Card>
    </div>
  );
}
