export async function createPaymentLink(proposalId: string, amount: number, description: string) {
  // Mock payment link - no real Stripe needed for testing
  return { url: `https://mock-payment-link.com/${proposalId}?amount=${amount}` }
}
