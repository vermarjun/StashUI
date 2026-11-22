import { serve } from "@/lib/agent-route";

// sharp and the filesystem: this is a Node route, and every answer depends on the query
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = serve;
export const OPTIONS = serve;
