import TextGif from "@/registry/cult-ui/text-gif";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-8 px-8 py-12">
      <TextGif
        gifUrl="https://media.giphy.com/media/3zvbrvbRe7wxBofOBI/giphy.gif"
        text="Visual Motion"
        size="xl"
        weight="black"
      />
      <TextGif
        gifUrl="https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif"
        text="Cinematic Text"
        size="lg"
        weight="bold"
      />
    </div>
  );
}
