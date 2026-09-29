export const getRecommendations = (preferences = [], items = []) => {
  if (!items.length) return []

  const normalized = preferences.map((item) => item.toLowerCase())

  return [...items]
    .map((item) => {
      const sharedGenres = (item.genres || []).filter((genre) =>
        normalized.includes(genre.toLowerCase()),
      )

      return {
        item,
        score: sharedGenres.length * 10 + (item.rating || 0),
      }
    })
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
    .slice(0, 6)
}
