'use server';
/**
 * @fileOverview Provides an AI-generated concise summary, potential impact, and suggested next steps
 * for high-risk threat indicators (IPs, domains, files) based on raw threat intelligence data.
 *
 * - summarizeThreatContext - A function that leverages AI to summarize threat context.
 * - AISummarizedThreatContextInput - The input type for the summarizeThreatContext function.
 * - AISummarizedThreatContextOutput - The return type for the summarizeThreatContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISummarizedThreatContextInputSchema = z.object({
  indicatorValue:
    z.string().describe('The threat indicator value (e.g., IP address, domain name, file hash).'),
  indicatorType: z
    .enum(['IP_ADDRESS', 'DOMAIN', 'FILE_HASH'])
    .describe('The type of threat indicator.'),
  threatData:
    z.string().describe('Raw threat intelligence data (e.g., JSON from VirusTotal or AbuseIPDB) to provide context for the AI summary.'),
});
export type AISummarizedThreatContextInput = z.infer<
  typeof AISummarizedThreatContextInputSchema
>;

const AISummarizedThreatContextOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the threat indicator and its nature.'),
  potentialImpact: z
    .string()
    .describe('An explanation of the potential impact or consequences of this threat.'),
  suggestedNextSteps: z
    .string()
    .describe('Actionable next steps for a CTI analyst to take regarding this threat.'),
});
export type AISummarizedThreatContextOutput = z.infer<
  typeof AISummarizedThreatContextOutputSchema
>;

export async function summarizeThreatContext(
  input: AISummarizedThreatContextInput
): Promise<AISummarizedThreatContextOutput> {
  return aiSummarizedThreatContextFlow(input);
}

const aiSummarizedThreatContextPrompt = ai.definePrompt({
  name: 'aiSummarizedThreatContextPrompt',
  input: {schema: AISummarizedThreatContextInputSchema},
  output: {schema: AISummarizedThreatContextOutputSchema},
  prompt: `You are a highly skilled Cyber Threat Intelligence (CTI) analyst. Your task is to provide a concise summary, potential impact, and suggested next steps for a given high-risk threat indicator.

Analyze the following threat indicator and the associated raw threat intelligence data:

Threat Indicator Value: {{{indicatorValue}}}
Threat Indicator Type: {{{indicatorType}}}

Raw Threat Data:
${'```'}
{{{threatData}}}
${'```'}

Based on this information, generate a JSON object containing:
1.  A "summary" (string) describing the threat indicator and its nature.
2.  A "potentialImpact" (string) explaining the potential consequences of this threat.
3.  "suggestedNextSteps" (string) outlining actionable steps for a CTI analyst to take.`,
});

const aiSummarizedThreatContextFlow = ai.defineFlow(
  {
    name: 'aiSummarizedThreatContextFlow',
    inputSchema: AISummarizedThreatContextInputSchema,
    outputSchema: AISummarizedThreatContextOutputSchema,
  },
  async input => {
    const {output} = await aiSummarizedThreatContextPrompt(input);
    return output!;
  }
);
