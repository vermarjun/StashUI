import { serve } from "@/lib/agent-route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const POST = serve;
export const GET = serve;      // answers 405: this server is stateless and opens no stream
export const OPTIONS = serve;
