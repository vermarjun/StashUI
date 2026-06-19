"use client";
import { CodeComparison } from "@/registry/magic-ui/code-comparison";

const beforeCode = `function fetchUser(id) {
  return fetch('/api/users/' + id)
    .then(function(res) {
      return res.json();
    })
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
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
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
