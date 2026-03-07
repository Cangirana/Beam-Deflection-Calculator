export default function EducationalContent() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 space-y-10 text-foreground">
      <section>
        <h2 className="text-2xl font-bold mb-3">What is Beam Deflection?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Beam deflection is the vertical displacement of a point on a beam when an external load is applied. When a force acts on a beam, it bends — the amount it bends depends on the magnitude of the load, the beam's material properties, its cross-sectional geometry, and how it is supported. Engineers use beam deflection calculations to ensure structures remain safe and functional under load, preventing excessive bending that could lead to failure or serviceability issues.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Beam Deflection Formula</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The deflection formulas for the two most common beam configurations are derived from Euler–Bernoulli beam theory:
        </p>

        <div className="space-y-3 mb-4">
          <div className="formula-display">
            <strong>Cantilever beam (end load):</strong> δ = (F × L³) / (3 × E × I)
          </div>
          <div className="formula-display">
            <strong>Simply supported beam (center load):</strong> δ = (F × L³) / (48 × E × I)
          </div>
        </div>

        <div className="text-muted-foreground leading-relaxed space-y-1.5 text-sm">
          <p><strong className="text-foreground">F</strong> — Applied load (Newtons). The concentrated force acting on the beam.</p>
          <p><strong className="text-foreground">L</strong> — Beam length (meters). The span between supports or from fixed end to free end.</p>
          <p><strong className="text-foreground">E</strong> — Young's modulus (Pascals). A material property describing stiffness. Steel ≈ 200 GPa.</p>
          <p><strong className="text-foreground">I</strong> — Moment of inertia (m⁴). Describes the beam's cross-sectional resistance to bending.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Example Calculation</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Consider a cantilever steel beam with the following properties:
        </p>
        <ul className="text-sm text-muted-foreground space-y-1 mb-3 font-mono list-disc list-inside">
          <li>Length L = 2 m</li>
          <li>Load F = 5,000 N</li>
          <li>Young's Modulus E = 200 × 10⁹ Pa (steel)</li>
          <li>Moment of Inertia I = 1 × 10⁻⁷ m⁴</li>
        </ul>
        <div className="formula-display space-y-1">
          <p>δ = (5000 × 2³) / (3 × 200×10⁹ × 1×10⁻⁷)</p>
          <p>δ = 40000 / 60000</p>
          <p>δ = 0.000667 m = <strong>0.6667 mm</strong></p>
        </div>
        <p className="text-muted-foreground text-sm mt-3">
          This means the free end of the cantilever beam deflects approximately 0.67 mm under a 5 kN point load — well within acceptable limits for most structural applications.
        </p>
      </section>
    </div>
  );
}
