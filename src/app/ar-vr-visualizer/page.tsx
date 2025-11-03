import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { View, Construction } from "lucide-react";

export default function ArVrVisualizerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AR/VR Engineering Visualizer</h1>
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <View className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our Augmented and Virtual Reality module is currently under construction. Soon, you'll be able to visualize complex machines and circuits like never before!
          </p>
          <Construction className="w-16 h-16 text-muted-foreground/50 mx-auto mt-8" />
        </CardContent>
      </Card>
    </div>
  );
}
