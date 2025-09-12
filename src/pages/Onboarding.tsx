import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, GraduationCap } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    status: "student"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.contact) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to continue",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(formData));
    localStorage.setItem("onboardingComplete", "true");
    
    toast({
      title: "Welcome to NextStep Navigator!",
      description: `Nice to meet you, ${formData.name}!`,
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-elegant">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to NextStep Navigator</CardTitle>
          <CardDescription>
            Let's get to know you better to personalize your career journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Number
              </Label>
              <Input
                id="contact"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Current Status
              </Label>
              <RadioGroup
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex-1 cursor-pointer">
                    <div className="font-medium">Student</div>
                    <div className="text-sm text-muted-foreground">Currently pursuing education</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="graduate" id="graduate" />
                  <Label htmlFor="graduate" className="flex-1 cursor-pointer">
                    <div className="font-medium">Graduate</div>
                    <div className="text-sm text-muted-foreground">Recently completed education</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="flex-1 cursor-pointer">
                    <div className="font-medium">Working Professional</div>
                    <div className="text-sm text-muted-foreground">Currently employed or seeking change</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Get Started
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;