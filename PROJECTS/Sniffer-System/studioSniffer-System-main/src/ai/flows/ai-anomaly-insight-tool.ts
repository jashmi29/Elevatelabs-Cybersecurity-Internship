'use server';
/**
 * @fileOverview An AI agent that provides detailed explanations, threat intelligence,
 * and remediation suggestions for detected network anomalies.
 *
 * - aiAnomalyInsightTool - A function that handles the AI anomaly insight process.
 * - AiAnomalyInsightToolInput - The input type for the aiAnomalyInsightTool function.
 * - AiAnomalyInsightToolOutput - The return type for the aiAnomalyInsightTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiAnomalyInsightToolInputSchema = z.object({
  anomalyType: z.string().describe('The type of network anomaly detected (e.g., "Port Scan", "Traffic Flood").'),
  sourceIp: z.string().ip().describe('The source IP address involved in the anomaly.'),
  destinationIp: z.string().ip().describe('The destination IP address involved in the anomaly.'),
  sourcePort: z.number().optional().describe('The source port involved in the anomaly, if applicable.'),
  destinationPort: z.number().optional().describe('The destination port involved in the anomaly, if applicable.'),
  protocol: z.string().optional().describe('The protocol involved in the anomaly (e.g., "TCP", "UDP", "ICMP").'),
  timestamp: z.string().datetime().describe('The timestamp when the anomaly was detected.'),
  additionalDetails: z.string().optional().describe('Any additional raw details or summary about the anomalous behavior.'),
});
export type AiAnomalyInsightToolInput = z.infer<typeof AiAnomalyInsightToolInputSchema>;

const AiAnomalyInsightToolOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the detected anomaly.'),
  threatIntelligence: z.string().describe('Potential threat intelligence related to this type of anomaly, including common attack vectors or associated malware.'),
  remediationSuggestions: z.string().describe('Actionable suggestions for how to remediate or mitigate the anomaly.'),
});
export type AiAnomalyInsightToolOutput = z.infer<typeof AiAnomalyInsightToolOutputSchema>;

export async function aiAnomalyInsightTool(input: AiAnomalyInsightToolInput): Promise<AiAnomalyInsightToolOutput> {
  return aiAnomalyInsightToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiAnomalyInsightToolPrompt',
  input: {schema: AiAnomalyInsightToolInputSchema},
  output: {schema: AiAnomalyInsightToolOutputSchema},
  prompt: `You are an expert cybersecurity engineer and network administrator. Your task is to provide detailed insights into detected network anomalies.

Given the following anomaly details, generate a comprehensive explanation, relevant threat intelligence, and actionable remediation suggestions.

Anomaly Type: {{{anomalyType}}}
Source IP: {{{sourceIp}}}
Destination IP: {{{destinationIp}}}{{#if sourcePort}}
Source Port: {{{sourcePort}}}{{/if}}{{#if destinationPort}}
Destination Port: {{{destinationPort}}}{{/if}}{{#if protocol}}
Protocol: {{{protocol}}}{{/if}}
Timestamp: {{{timestamp}}}{{#if additionalDetails}}
Additional Details: {{{additionalDetails}}}{{/if}}

Explanation:
- Explain what the anomaly is, why it's a concern, and what typical network behaviors it deviates from.

Threat Intelligence:
- Provide information on common threat actors or attack campaigns associated with this type of anomaly.
- Mention potential impact or goals of such attacks.
- Suggest any known indicators of compromise (IOCs) related to this anomaly.

Remediation Suggestions:
- Offer concrete steps for immediate mitigation and long-term prevention.
- Include advice on network configuration changes, firewall rules, intrusion detection/prevention systems (IDS/IPS), or host-based security measures.
- Suggest monitoring strategies or tools that can help detect similar anomalies in the future.`,
});

const aiAnomalyInsightToolFlow = ai.defineFlow(
  {
    name: 'aiAnomalyInsightToolFlow',
    inputSchema: AiAnomalyInsightToolInputSchema,
    outputSchema: AiAnomalyInsightToolOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
