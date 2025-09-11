import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, BookOpen, Users, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Personalized Quiz",
      description: "Answer thoughtful questions designed to understand your interests, skills, and goals."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smart Matching",
      description: "Our algorithm analyzes your responses to find careers that align with your unique profile."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Career Insights",
      description: "Get detailed information about salaries, growth rates, and required skills for each career."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Guidance",
      description: "Access resources and advice from industry professionals to help you succeed."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
                Find Your <span className="gradient-text">Next Step</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Discover the career path that fits you best with our intelligent assessment and comprehensive career guide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quiz">
                  <Button size="lg" className="group">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button size="lg" variant="outline">
                    Browse Careers
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Your journey to the perfect career starts here
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hover-lift"
                >
                  <div className="glass-card rounded-xl p-6 text-center h-full">
                    <div className="text-primary mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              <div>
                <h3 className="font-heading text-4xl font-bold text-primary mb-2">15+</h3>
                <p className="text-muted-foreground">Career Categories</p>
              </div>
              <div>
                <h3 className="font-heading text-4xl font-bold text-secondary mb-2">100+</h3>
                <p className="text-muted-foreground">Career Paths</p>
              </div>
              <div>
                <h3 className="font-heading text-4xl font-bold text-accent mb-2">98%</h3>
                <p className="text-muted-foreground">User Satisfaction</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ready to Discover Your Path?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Take our comprehensive career assessment and unlock your potential
              </p>
              <Link to="/quiz">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="group"
                >
                  Take the Quiz Now
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;