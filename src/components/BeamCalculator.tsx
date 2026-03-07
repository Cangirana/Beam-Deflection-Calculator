import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, RotateCcw, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type BeamType = "cantilever" | "simply-supported";

interface CalcResult {
  meters: number;
  millimeters: number;
}

const EXAMPLE_VALUES = {
  length: "2",
  load: "5000",
  modulus: "200000000000",
  inertia: "0.0000001",
};

const tooltips: Record<string, string> = {
  length: "The total span of the beam from support to end (or between supports).",
  load: "The concentrated force applied to the beam.",
  modulus: "A measure of material stiffness. Steel ≈ 200 GPa (200×10⁹ Pa).",
  inertia: "Second moment of area — depends on cross-section shape. For a rectangular beam: (b×h³)/12.",
};

export default function BeamCalculator() {
  const [beamType, setBeamType] = useState<BeamType>("cantilever");
  const [length, setLength] = useState("");
  const [load, setLoad] = useState("");
  const [modulus, setModulus] = useState("");
  const [inertia, setInertia] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    const L = parseFloat(length);
    const F = parseFloat(load);
    const E = parseFloat(modulus);
    const I = parseFloat(inertia);

    if ([L, F, E, I].some((v) => isNaN(v) || v <= 0)) {
      setError("Please fill in all fields with positive numeric values.");
      return;
    }

    let deflection: number;
    if (beamType === "cantilever") {
      deflection = (F * Math.pow(L, 3)) / (3 * E * I);
    } else {
      deflection = (F * Math.pow(L, 3)) / (48 * E * I);
    }

    setResult({ meters: deflection, millimeters: deflection * 1000 });
  };

  const reset = () => {
    setLength("");
    setLoad("");
    setModulus("");
    setInertia("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setLength(EXAMPLE_VALUES.length);
    setLoad(EXAMPLE_VALUES.load);
    setModulus(EXAMPLE_VALUES.modulus);
    setInertia(EXAMPLE_VALUES.inertia);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8">
        {/* Beam type selector */}
        <div className="mb-6">
          <Label className="text-sm font-semibold mb-3 block">Beam Type</Label>
          <div className="grid grid-cols-2 gap-3">
            {(["cantilever", "simply-supported"] as BeamType[]).map((type) => (
              <button
                key={type}
                onClick={() => { setBeamType(type); setResult(null); }}
                className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  beamType === type
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                }`}
              >
                {type === "cantilever" ? "Cantilever Beam" : "Simply Supported"}
              </button>
            ))}
          </div>
        </div>

        {/* Formula display */}
        <div className="formula-display mb-6 text-center">
          {beamType === "cantilever"
            ? "δ = (F × L³) / (3 × E × I)"
            : "δ = (F × L³) / (48 × E × I)"}
        </div>

        {/* Input fields */}
        <div className="space-y-4 mb-6">
          <InputField label="Beam Length (L)" unit="meters" value={length} onChange={setLength} tooltip={tooltips.length} />
          <InputField label="Load (F)" unit="Newtons" value={load} onChange={setLoad} tooltip={tooltips.load} />
          <InputField label="Young's Modulus (E)" unit="Pa" value={modulus} onChange={setModulus} tooltip={tooltips.modulus} />
          <InputField label="Moment of Inertia (I)" unit="m⁴" value={inertia} onChange={setInertia} tooltip={tooltips.inertia} />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <Button variant="calculate" size="lg" className="flex-1 h-12" onClick={calculate}>
            <Calculator className="w-5 h-5 mr-2" /> Calculate
          </Button>
          <Button variant="outline" size="lg" className="h-12" onClick={reset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <button
          onClick={loadExample}
          className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 underline underline-offset-2"
        >
          Load example values (steel beam)
        </button>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg px-4 py-3 text-sm mt-4"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="result-box mt-6"
            >
              <h3 className="text-sm font-semibold text-result mb-4">Maximum Deflection</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Meters</p>
                  <p className="text-xl font-mono font-semibold text-foreground">
                    {result.meters.toExponential(4)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Millimeters</p>
                  <p className="text-xl font-mono font-semibold text-foreground">
                    {result.millimeters.toFixed(4)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InputField({
  label,
  unit,
  value,
  onChange,
  tooltip,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  tooltip: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Label className="text-sm font-medium">{label}</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-xs">{tooltip}</TooltipContent>
        </Tooltip>
      </div>
      <div className="relative">
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="input-engineering pr-16"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
          {unit}
        </span>
      </div>
    </div>
  );
}
