'use server';
/**
 * @fileOverview This file contains a Genkit flow for rephrasing secret messages into innocuous contexts.
 *
 * - rephraseSecretMessage - A function that rephrases a secret message.
 * - RephraseSecretMessageInput - The input type for the rephraseSecretMessage function.
 * - RephraseSecretMessageOutput - The return type for the rephraseSecretMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RephraseSecretMessageInputSchema = z.object({
  secretMessage: z
    .string()
    .describe('The secret message to be rephrased.'),
});
export type RephraseSecretMessageInput = z.infer<
  typeof RephraseSecretMessageInputSchema
>;

const RephraseSecretMessageOutputSchema = z.object({
  rephrasedMessage: z
    .string()
    .describe('The secret message rephrased into an innocuous context.'),
});
export type RephraseSecretMessageOutput = z.infer<
  typeof RephraseSecretMessageOutputSchema
>;

export async function rephraseSecretMessage(
  input: RephraseSecretMessageInput
): Promise<RephraseSecretMessageOutput> {
  return rephraseSecretMessageFlow(input);
}

const rephraseSecretMessagePrompt = ai.definePrompt({
  name: 'rephraseSecretMessagePrompt',
  input: {schema: RephraseSecretMessageInputSchema},
  output: {schema: RephraseSecretMessageOutputSchema},
  prompt: `You are an AI assistant tasked with rephrasing secret messages into plausible, innocuous-sounding public contexts. The goal is to make the message blend seamlessly into everyday conversation or public communication, so that if it were ever accidentally exposed, it would not immediately raise suspicion or reveal its true intent.

Rephrase the following secret message:

Secret Message: {{{secretMessage}}}

Provide the rephrased message as a simple, innocent statement.`,
});

const rephraseSecretMessageFlow = ai.defineFlow(
  {
    name: 'rephraseSecretMessageFlow',
    inputSchema: RephraseSecretMessageInputSchema,
    outputSchema: RephraseSecretMessageOutputSchema,
  },
  async (input) => {
    const {output} = await rephraseSecretMessagePrompt(input);
    return output!;
  }
);
