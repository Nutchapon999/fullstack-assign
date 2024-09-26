export function highlightText(text: string, highlight: string | undefined) {
  if (highlight === undefined) return text;

  if (highlight.length < 2) return text;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi')); 
  return parts.map((part, index) => 
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} className="bg-yellow-200">{part}</span> 
    ) : part
  );
};