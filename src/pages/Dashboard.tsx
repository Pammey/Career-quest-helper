import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
    setResults(storedResults);
  }, []);

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
              My Results Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your career exploration journey
            </p>
          </motion.div>

          {results.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-6">
                You haven't taken any quizzes yet. Start exploring your career path!
              </p>
              <Button onClick={() => navigate("/quiz")}>
                Take Your First Quiz
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 max-w-4xl mx-auto">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString()}
                      </span>
                    </div>
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="font-heading text-lg font-semibold mb-3">
                    Top Career Matches
                  </h3>
                  
                  <div className="space-y-2">
                    {result.matches.map((match: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{match.title}</span>
                        <span className="text-primary font-semibold">{match.matchPercentage}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;