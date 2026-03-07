import { Helmet } from "react-helmet-async";
import BeamCalculator from "@/components/BeamCalculator";
import EducationalContent from "@/components/EducationalContent";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Beam Deflection Calculator (Free Online Tool)</title>
        <meta
          name="description"
          content="Calculate beam deflection instantly for cantilever and simply supported beams using standard engineering formulas. Free online beam deflection calculator."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm font-mono">δ</span>
            </div>
            <span className="font-heading font-semibold text-foreground">BeamCalc</span>
          </div>
        </header>

        <main className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Hero */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
              Beam Deflection Calculator
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Calculate maximum beam deflection for cantilever and simply supported beams using standard engineering formulas — free and instant.
            </p>
          </div>

          <BeamCalculator />
          <EducationalContent />
        </main>

        {/* Footer */}
        <footer className="border-t mt-16 py-8">
          <div className="container max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>Beam Deflection Calculator — Free Online Engineering Tool</p>
            <p className="mt-1">Built for engineers, students, and designers.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
