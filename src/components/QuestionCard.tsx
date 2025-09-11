import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface Option {
  text: string;
  scores: Record<string, number>;
}

interface QuestionCardProps {
  question: {
    id: number;
    type: string;
    question: string;
    options?: Option[];
    min?: number;
    max?: number;
  };
  currentAnswer: string | number | null;
  onAnswer: (answer: string | number) => void;
}

const QuestionCard = ({ question, currentAnswer, onAnswer }: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card rounded-2xl p-8 space-y-6">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          {question.question}
        </h2>

        {question.type === "multiple-choice" && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer(index.toString())}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  currentAnswer === index.toString()
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <span className="font-medium">{option.text}</span>
              </motion.button>
            ))}
          </div>
        )}

        {question.type === "slider" && question.min !== undefined && question.max !== undefined && (
          <div className="space-y-6">
            <div className="px-4">
              <Slider
                value={[currentAnswer as number || 5]}
                onValueChange={(value) => onAnswer(value[0])}
                min={question.min}
                max={question.max}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Not Important</span>
              <span className="font-semibold text-primary text-lg">
                {currentAnswer || 5}
              </span>
              <span>Very Important</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionCard;