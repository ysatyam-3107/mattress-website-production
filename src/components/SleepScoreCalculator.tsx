import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, AlertTriangle } from "lucide-react";

const SleepScoreCalculator = () => {
  const [hours, setHours] = useState(7);
  const [quality, setQuality] = useState(3);
  const [showResult, setShowResult] = useState(false);

  const calculateScore = () => {
    // Basic logic: hours (max 10 points) * quality (max 10 points)
    const hoursScore = Math.min(hours / 8, 1) * 50; 
    const qualityScore = (quality / 5) * 50;
    return Math.round(hoursScore + qualityScore);
  };

  const score = calculateScore();

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/10 max-w-md w-full mx-auto">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold mb-2">Sleep Score Calculator</h3>
        <p className="text-muted-foreground text-sm">Measure how well you're resting.</p>
      </div>

      {!showResult ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Hours of Sleep: <span className="text-primary font-bold">{hours} hrs</span></label>
            <input 
              type="range" 
              min="4" max="12" step="0.5" 
              value={hours} 
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Short</span>
              <span>Optimal</span>
              <span>Long</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sleep Quality (1-5): <span className="text-primary font-bold">{quality}</span></label>
            <input 
              type="range" 
              min="1" max="5" step="1" 
              value={quality} 
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full accent-secondary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <Button 
            className="w-full bg-slate-800 hover:bg-slate-700 text-white rounded-full h-12"
            onClick={() => setShowResult(true)}
          >
            Calculate My Score
          </Button>
        </div>
      ) : (
        <div className="text-center animate-fade-in space-y-4">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
              <circle 
                cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" 
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${2 * Math.PI * 60 * (1 - score / 100)}`}
                className={`transition-all duration-1000 ${score > 80 ? 'text-success' : score > 60 ? 'text-warning' : 'text-destructive'}`} 
              />
            </svg>
            <span className="absolute text-3xl font-black">{score}</span>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-2 flex justify-center items-center gap-2">
              {score > 80 ? <><Sparkles className="text-success w-6 h-6" /> Great Sleeper!</> : score > 60 ? <><TrendingUp className="text-warning w-6 h-6" /> Room for Improvement</> : <><AlertTriangle className="text-destructive w-6 h-6" /> Time for a change</>}
            </h4>
            <p className="text-sm text-muted-foreground">
              {score > 80 
                ? "Your sleep habits are excellent. A good mattress ensures you keep it up!" 
                : "A new mattress could boost your score by up to 20 points."}
            </p>
          </div>

          <Button 
            variant="outline" 
            className="w-full rounded-full border-primary/20 hover:bg-primary/5 mt-4"
            onClick={() => setShowResult(false)}
          >
            Recalculate
          </Button>
        </div>
      )}
    </div>
  );
};

export default SleepScoreCalculator;
