import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { products } from "@/data/products";

const options = {
  position: ["Side", "Back", "Stomach", "Combination"],
  weight: ["Light (< 60kg)", "Average (60-90kg)", "Heavy (> 90kg)"],
  preference: ["Plush & Soft", "Medium Support", "Firm Orthopedic"],
};

// Map quiz answers to product filters
const getRecommendation = (selections: string[]) => {
  const [position, weight, preference] = selections;

  let targetFirmness: "soft" | "medium" | "firm" = "medium";
  let targetType: string | null = null;

  // Firmness logic based on preference
  if (preference === "Plush & Soft") targetFirmness = "soft";
  else if (preference === "Firm Orthopedic") targetFirmness = "firm";
  else targetFirmness = "medium";

  // Type suggestions based on position + weight
  if (position === "Side") targetType = "memory-foam";
  else if (position === "Back" && weight === "Heavy (> 90kg)") targetType = "orthopedic";
  else if (position === "Stomach") targetType = "hybrid";
  else targetType = "hybrid";

  // Find best match from actual product catalog
  const match = products.find(
    (p) => p.firmness === targetFirmness && p.type === targetType
  ) || products.find(
    (p) => p.firmness === targetFirmness
  ) || products.find(
    (p) => p.type === targetType
  ) || products[0];

  return match;
};

const SmartMattressFinder = () => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSelect = (choice: string) => {
    const newSelections = [...selections];
    newSelections[step] = choice;
    setSelections(newSelections);

    if (step < Object.keys(options).length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setStep(step + 1);
      }, 1500);
    }
  };

  const reset = () => {
    setStep(0);
    setSelections([]);
  };

  const getStepData = () => {
    if (step === 0) return { title: "What is your primary sleeping position?", choices: options.position };
    if (step === 1) return { title: "What is your approximate body weight?", choices: options.weight };
    if (step === 2) return { title: "What feel do you prefer?", choices: options.preference };
    return null;
  };

  const stepData = getStepData();
  const recommendation = step >= 3 && !isCalculating ? getRecommendation(selections) : null;

  return (
    <div className="bg-white dark:bg-card rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto border border-primary/10">
      <div className="bg-primary p-6 text-white text-center">
        <h3 className="text-2xl font-bold font-heading mb-2">Smart Mattress Finder</h3>
        <p className="opacity-90">Find your perfect match in 60 seconds.</p>
      </div>

      <div className="p-8">
        {step < 3 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors ${step >= i ? "bg-accent text-white" : "bg-muted text-muted-foreground"}`}>
                    {i + 1}
                  </div>
                  {i < 2 && (
                    <div className={`w-16 h-1 transition-colors ${step > i ? "bg-accent" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>

            <h4 className="text-xl font-semibold mb-4 text-center">{stepData?.title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stepData?.choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleSelect(choice)}
                  className={`p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                    selections[step] === choice
                      ? "border-primary bg-primary/5 text-primary font-semibold"
                      : "border-border hover:border-primary/50 text-foreground"
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ) : isCalculating ? (
          <div className="text-center py-12 space-y-6 animate-pulse">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-lg font-medium text-primary">Analyzing your sleep profile...</p>
          </div>
        ) : recommendation ? (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto text-success">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">We found your perfect match!</h4>
              <p className="text-muted-foreground mb-6">Based on your {selections[0]?.toLowerCase()} sleeping position and {selections[2]?.toLowerCase()} preference.</p>
            </div>
            
            <div className="bg-secondary/10 p-6 rounded-xl border border-secondary/20">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-2 block">Top Recommendation</span>
              <h5 className="text-3xl font-extrabold text-primary mb-2">{recommendation.name}</h5>
              <p className="text-sm text-foreground/80 mb-2">{recommendation.description}</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-2xl font-black text-foreground">₹{recommendation.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground line-through">₹{recommendation.originalPrice.toLocaleString()}</span>
              </div>
              <Link to={`/product/${recommendation.id}`}>
                <Button className="w-full bg-accent hover:bg-yellow-600 text-white font-bold h-12 text-lg">
                  View Mattress <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <button onClick={reset} className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center w-full gap-2 mt-4 transition-colors">
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SmartMattressFinder;
