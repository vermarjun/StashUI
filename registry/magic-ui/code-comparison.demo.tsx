"use client";
import { CodeComparison } from "@/registry/magic-ui/code-comparison";

const beforeCode = `function fetchUser(id) {
  return fetch('/api/users/' + id) // [!code focus]
    .then(function(res) { // [!code focus]
      return res.json(); // [!code focus]
    }) // [!code focus]
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      console.error(err); // [!code --]
    });
}`;

const afterCode = `async function fetchUser(id: string) { // [!code ++]
  try { // [!code ++]
    const res = await fetch(\`/api/users/\${id}\`); // [!code ++]
    if (!res.ok) throw new Error(res.statusText);
    return await res.json() as User; // [!code ++]
  } catch (err) {
    console.error('fetchUser failed:', err);
    return null;
  }
}`;

export default function Demo() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      <CodeComparison
        beforeCode={beforeCode}
        afterCode={afterCode}
        language="typescript"
        filename="api.ts"
        lightTheme="github-light"
        darkTheme="github-dark"
        highlightColor="#ff3333"
      />
    </div>
  );
}
