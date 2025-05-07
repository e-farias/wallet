export const take = 10
export const getSkip = (page: number) => page < 1 ? 0 : (page-1) * take

export type PaginationDataByPage = {
  next: number,
  back: number,
  firstItemOnPage: number,
  lastItemOnPage: number,
}

export const getPaginationDataByPage = (
  page: number,
  itemsOnPage: number,
  itemsTotal: number
): PaginationDataByPage => {

  if (page < 1) page = 1

  const skiped = getSkip(page)
  const firstItemOnPage = skiped + 1
  const lastItemOnPage = skiped + itemsOnPage

  let next = page+1
  if (lastItemOnPage == itemsTotal) {
    next = page
  }

  let back = page-1
  if (page == 1) {
    back = page
  }

  return {
    next,
    back,
    firstItemOnPage,
    lastItemOnPage,
  }
  
}