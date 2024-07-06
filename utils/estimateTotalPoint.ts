export const getMaxDailyPoint = (maxPoint: number) => {
  const maxPool = 500
  return maxPoint / maxPool
}