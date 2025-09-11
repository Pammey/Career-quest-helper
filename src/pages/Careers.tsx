import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareerCard from "@/components/CareerCard";

const Careers = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/careers.json")
      .then(res => res.json())
      .then(data => {
        setCareers(data.careers);
        setFilteredCareers(data.careers);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = careers;
    
    if (searchTerm) {
      filtered = filtered.filter(career =>
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedIndustry !== "all") {
      filtered = filtered.filter(career => 
        career.industry.toLowerCase() === selectedIndustry.toLowerCase()
      );
    }
    
    setFilteredCareers(filtered);
  }, [searchTerm, selectedIndustry, careers]);

  const industries = ["all", ...new Set(careers.map(c => c.industry))];

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading careers...</div>;

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
              Career Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our comprehensive database of career opportunities
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search careers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === "all" ? "All Industries" : industry}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career, index) => (
              <CareerCard key={career.id} career={career} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;