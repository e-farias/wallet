export const take = 10
export const skip = (page: number) => page == 1 ? 0 : page*take