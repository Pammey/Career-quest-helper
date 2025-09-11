import { motion } from "framer-motion";
import { Briefcase, TrendingUp, DollarSign, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Career {
  id: string;
  category: string;
  title: string;
  description: string;
  skills: string[];
  education: string;
  averageSalary: string;
  growthRate: string;
  industry: string;
}

interface CareerCardProps {
  career: Career;
  index: number;
}

const CareerCard = ({ career, index }: CareerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="hover-lift h-full"
    >
      <div className="glass-card rounded-xl p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading text-lg font-semibold">{career.title}</h3>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
            {career.industry}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
          {career.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>{career.averageSalary}/year</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-success" />
            <span>{career.growthRate} growth</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {career.skills.slice(0, 2).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground"
            >
              {skill}
            </span>
          ))}
          {career.skills.length > 2 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{career.skills.length - 2}
            </span>
          )}
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full group"
        >
          Learn More
          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CareerCard;