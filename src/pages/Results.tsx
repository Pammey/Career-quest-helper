import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultCard from "@/components/ResultCard";

const Results = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState<any[]>([]);
  const [topMatches, setTopMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answers = localStorage.getItem("quizAnswers");
    if (!answers) {
      navigate("/quiz");
      return;
    }

    fetch("/data/careers.json")
      .then(res => res.json())
      .then(data => {
        const matches = data.careers.slice(0, 3).map((career: any, index: number) => ({
          ...career,
          matchPercentage: 95 - (index * 7)
        }));
        setTopMatches(matches);
        
        const results = {
          date: new Date().toISOString(),
          matches: matches
        };
        
        const existingResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
        existingResults.push(results);
        localStorage.setItem("quizResults", JSON.stringify(existingResults));
        
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Calculating results...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl font-bold mb-4">
              Your Career Matches
            </h1>
            <p className="text-xl text-muted-foreground">
              Based on your responses, here are your top career recommendations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {topMatches.map((career, index) => (
              <ResultCard
                key={career.id}
                career={career}
                matchPercentage={career.matchPercentage}
                rank={index + 1}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate("/quiz")} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
            <Button onClick={() => navigate("/dashboard")}>
              <Save className="mr-2 h-4 w-4" />
              View All Results
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;