import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, Construction } from "lucide-react";

export default function VirtualLabsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Virtual Labs</h1>
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <FlaskConical className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Interactive Experiments Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our Virtual Labs are being set up to provide you with a hands-on learning experience through realistic simulations of laboratory experiments, right from your browser.
          </p>
          <Construction className="w-16 h-16 text-muted-foreground/50 mx-auto mt-8" />
        </CardContent>
      </Card>
    </div>
  );
}
