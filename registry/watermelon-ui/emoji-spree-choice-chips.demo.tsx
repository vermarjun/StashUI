import { EmojiSpreeChips, type InterestItem } from "./emoji-spree-choice-chips";

const interests: InterestItem[] = [
  { id: "coffee", label: "Coffee", emoji: "☕" },
  { id: "hiking", label: "Hiking", emoji: "🥾" },
  { id: "music", label: "Live music", emoji: "🎸" },
  { id: "film", label: "Film", emoji: "🎬" },
  { id: "cooking", label: "Cooking", emoji: "🍳" },
  { id: "books", label: "Books", emoji: "📚" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "plants", label: "Plants", emoji: "🪴" },
  { id: "design", label: "Design", emoji: "🎨" },
  { id: "running", label: "Running", emoji: "🏃" },
  { id: "photo", label: "Photography", emoji: "📷" },
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "dogs", label: "Dogs", emoji: "🐶" },
  { id: "space", label: "Space", emoji: "🚀" },
];

export default function EmojiSpreeChoiceChipsDemo() {
  return (
    <div className="flex w-full justify-center text-foreground">
      <EmojiSpreeChips interests={interests} />
    </div>
  );
}
