export async function generateProposal(data: any) {
  const deposit = Math.round((parseInt(data.totalPrice || 5000) * parseInt(data.depositPercent || 50)) / 100)

  return {
    greeting: `Dear ${data.clientName || 'Client'},`,
    executiveSummary: `We are excited to present this proposal for ${data.projectTitle || 'your project'}. Our team has extensive experience in ${data.projectType || 'web design'} and is confident we can deliver exceptional results within your timeline.`,
    scopeOfWork: [
      `Phase 1: Discovery & Strategy (${data.duration || '1 week'})`,
      `Phase 2: Design & Development (${data.duration || '2 weeks'})`,
      `Phase 3: Testing & Launch (${data.duration || '1 week'})`
    ],
    timeline: `Total duration: ${data.duration || '4 weeks'}`,
    investment: {
      total: parseInt(data.totalPrice || 5000),
      deposit: deposit,
      balance: parseInt(data.totalPrice || 5000) - deposit
    },
    terms: `Payment schedule: ${data.depositPercent || 50}% deposit ($${deposit}) upon acceptance, remainder due upon completion. Includes 2 rounds of revisions.`,
    callToAction: `We look forward to working with you on this exciting project. Please review this proposal and let us know if you have any questions. Ready to get started? Click "Accept & Pay Deposit" below.`
  }
}
