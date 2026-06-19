"use client";
import {
  Expandable,
  ExpandableCard,
  ExpandableCardHeader,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableContent,
  ExpandableTrigger,
} from "@/registry/cult-ui/expandable";
import { ChevronDown, Zap } from "lucide-react";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <Expandable>
        {({ isExpanded }) => (
          <ExpandableCard
            collapsedSize={{ width: 320, height: 220 }}
            expandedSize={{ width: 420, height: undefined }}
          >
            <ExpandableCardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground">Expand to see more</p>
                </div>
              </div>
              <ExpandableTrigger>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </ExpandableTrigger>
            </ExpandableCardHeader>

            <ExpandableCardContent>
              <p className="text-sm text-muted-foreground mb-3">
                This card expands to reveal additional content and actions.
              </p>
              <ExpandableContent preset="slide-up">
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Feature enabled and running
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    3 integrations connected
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    1 pending review
                  </div>
                </div>
              </ExpandableContent>
            </ExpandableCardContent>

            <ExpandableCardFooter>
              <ExpandableTrigger className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {isExpanded ? "Show less" : "Show more"}
              </ExpandableTrigger>
            </ExpandableCardFooter>
          </ExpandableCard>
        )}
      </Expandable>
    </div>
  );
}
