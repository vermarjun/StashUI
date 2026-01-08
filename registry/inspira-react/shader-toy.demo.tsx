"use client";
import { ShaderToy } from "@/registry/inspira-react/shader-toy";

const DEMO_SHADER = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord / iResolution.xy;
  vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0.0, 2.0, 4.0));
  fragColor = vec4(col, 1.0);
}
`;

export default function ShaderToyDemo() {
  return (
    <div className="h-64 w-full overflow-hidden rounded-lg">
      <ShaderToy shaderCode={DEMO_SHADER} speed={0.5} />
    </div>
  );
}
