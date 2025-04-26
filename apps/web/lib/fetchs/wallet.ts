export const getUserWallet = async (userId: string) => {
  const endPoint = `/api/users/${userId}/wallet`
  return await fetch(endPoint, {
    method: "GET"
  })
}

export const createDeposit = async (
  userId: string,
  amount: string
) => {
  const endPoint = `/api/users/${userId}/wallet/deposit`
  return await fetch(endPoint, {
    method: "POST",
    body: JSON.stringify({ amount })
  })
}
