export const getTotalDays = (year, month) => {
  return new Date(year, month + 1, 0,).getDate();
} 

export enum Click {
  Back = -1,
  Next = 1,
}
