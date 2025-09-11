import { motion } from "framer-motion";
import { Briefcase, TrendingUp, DollarSign, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Career {
  id: string;
  title: string;
  description: string;
  skills: string[];
  education: string;
  averageSalary: string;
  growthRate: string;
  industry: string;
}

interface ResultCardProps {
  career: Career;
  matchPercentage: number;
  rank: number;
}

const ResultCard = ({ career, matchPercentage, rank }: ResultCardProps) => {
  const getRankColor = () => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600";
      case 2:
        return "from-gray-300 to-gray-500";
      case 3:
        return "from-orange-400 to-orange-600";
      default:
        return "from-primary to-primary-dark";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      className="hover-lift"
    >
      <div className="glass-card rounded-2xl p-6 h-full relative overflow-hidden">
        {/* Rank Badge */}
        <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${getRankColor()} flex items-center justify-center text-white font-bold shadow-lg`}>
          #{rank}
        </div>

        {/* Match Percentage */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Match Score</span>
            <span className="font-bold text-primary">{matchPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${matchPercentage}%` }}
              transition={{ duration: 1, delay: rank * 0.1 + 0.3 }}
              className="h-full bg-gradient-primary rounded-full"
            />
          </div>
        </div>

        {/* Career Info */}
        <h3 className="font-heading text-xl font-semibold mb-2">{career.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{career.description}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-sm">{career.averageSalary}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm">{career.growthRate} growth</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-secondary" />
            <span className="text-sm truncate">{career.education}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-accent" />
            <span className="text-sm">{career.industry}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Key Skills:</p>
          <div className="flex flex-wrap gap-1">
            {career.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-xs rounded-full text-muted-foreground"
              >
                {skill}
              </span>
            ))}
            {career.skills.length > 3 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{career.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="default" size="sm" className="flex-1">
            Explore Career
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            View Resources
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;