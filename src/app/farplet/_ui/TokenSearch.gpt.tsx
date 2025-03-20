import React, { useState, useEffect, useDeferredValue } from "react";

const TokenSearch = () => {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState<any[]>([]);
  const deferredInput = useDeferredValue(input); // Optimized search trigger

  useEffect(() => {
    if (!deferredInput) return;

    const fetchTokens = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${deferredInput}`,
        );
        const data = await response.json();
        setTokens(data.coins || []);
      } catch (error) {
        console.error("Error fetching tokens TokenSearch.gpt:", error);
      }
    };

    fetchTokens();
  }, [deferredInput]);

  return (
    <div className="p-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for ERC-20 tokens..."
        className="w-full p-2 border rounded"
      />
      <ul className="mt-4">
        {tokens.map((token) => (
          <li key={token.id} className="p-2 border-b">
            <img
              src={token.thumb}
              alt={token.name}
              className="w-6 h-6 inline-block mr-2"
            />
            {token.name} ({token.symbol.toUpperCase()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenSearch;
