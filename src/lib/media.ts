export function getImageUrl(image: unknown, size?: string): string | null {
  if (!image || typeof image !== "object") return null;
  const img = image as Record<string, unknown>;
  if (size && size !== "original") {
    const sizes = img.sizes as Record<string, { url?: string }> | undefined;
    if (sizes?.[size]?.url) return sizes[size].url!;
  }
  return typeof img.url === "string" ? img.url : null;
}