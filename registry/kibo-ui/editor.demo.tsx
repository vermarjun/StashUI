"use client";

import {
  EditorBubbleMenu,
  EditorCharacterCount,
  EditorClearFormatting,
  EditorFloatingMenu,
  EditorFormatBold,
  EditorFormatCode,
  EditorFormatItalic,
  EditorFormatStrike,
  EditorFormatSubscript,
  EditorFormatSuperscript,
  EditorFormatUnderline,
  EditorLinkSelector,
  EditorNodeBulletList,
  EditorNodeCode,
  EditorNodeHeading1,
  EditorNodeHeading2,
  EditorNodeHeading3,
  EditorNodeOrderedList,
  EditorNodeQuote,
  EditorNodeTable,
  EditorNodeTaskList,
  EditorNodeText,
  EditorProvider,
  EditorSelector,
  EditorTableColumnAfter,
  EditorTableColumnBefore,
  EditorTableColumnDelete,
  EditorTableColumnMenu,
  EditorTableDelete,
  EditorTableFix,
  EditorTableGlobalMenu,
  EditorTableHeaderColumnToggle,
  EditorTableHeaderRowToggle,
  EditorTableMenu,
  EditorTableMergeCells,
  EditorTableRowAfter,
  EditorTableRowBefore,
  EditorTableRowDelete,
  EditorTableRowMenu,
  EditorTableSplitCell,
} from "./editor";

const content = `
<h2>Launch plan: Billing v2</h2>
<p>We move every workspace to <strong>usage-based billing</strong> on <em>March 3</em>. Existing annual plans keep their price until renewal.</p>
<h3>Before launch</h3>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="true"><p>Migrate 1,284 Stripe subscriptions</p></li>
  <li data-type="taskItem" data-checked="true"><p>Update pricing page copy</p></li>
  <li data-type="taskItem" data-checked="false"><p>Email admins 14 days ahead</p></li>
</ul>
<blockquote><p>Select any text to format it, or type <code>/</code> on a new line for blocks.</p></blockquote>
<p>Owner: Maya Chen. Reviewers: Leo Park, Priya Nair.</p>
`;

export default function EditorDemo() {
  return (
    <div className="h-[560px] w-full max-w-3xl p-6">
      <EditorProvider
        className="relative h-full w-full overflow-y-auto rounded-lg border bg-background p-6 text-sm [&_h2]:mb-3 [&_h2]:font-semibold [&_h2]:text-2xl [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-lg [&_p]:my-2"
        content={content}
        placeholder="Type / for commands"
      >
        <EditorFloatingMenu>
          <EditorNodeHeading1 hideName />
          <EditorNodeBulletList hideName />
          <EditorNodeQuote hideName />
          <EditorNodeCode hideName />
          <EditorNodeTable hideName />
        </EditorFloatingMenu>
        <EditorBubbleMenu>
          <EditorSelector title="Text">
            <EditorNodeText />
            <EditorNodeHeading1 />
            <EditorNodeHeading2 />
            <EditorNodeHeading3 />
            <EditorNodeBulletList />
            <EditorNodeOrderedList />
            <EditorNodeTaskList />
            <EditorNodeQuote />
            <EditorNodeCode />
          </EditorSelector>
          <EditorSelector title="Format">
            <EditorFormatBold />
            <EditorFormatItalic />
            <EditorFormatUnderline />
            <EditorFormatStrike />
            <EditorFormatCode />
            <EditorFormatSuperscript />
            <EditorFormatSubscript />
          </EditorSelector>
          <EditorLinkSelector />
          <EditorClearFormatting />
        </EditorBubbleMenu>
        <EditorTableMenu>
          <EditorTableGlobalMenu>
            <EditorTableHeaderColumnToggle />
            <EditorTableHeaderRowToggle />
            <EditorTableDelete />
            <EditorTableMergeCells />
            <EditorTableSplitCell />
            <EditorTableFix />
          </EditorTableGlobalMenu>
          <EditorTableColumnMenu>
            <EditorTableColumnBefore />
            <EditorTableColumnAfter />
            <EditorTableColumnDelete />
          </EditorTableColumnMenu>
          <EditorTableRowMenu>
            <EditorTableRowBefore />
            <EditorTableRowAfter />
            <EditorTableRowDelete />
          </EditorTableRowMenu>
        </EditorTableMenu>
        <EditorCharacterCount.Words>Words: </EditorCharacterCount.Words>
      </EditorProvider>
    </div>
  );
}
