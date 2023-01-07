import {openai, Train} from "../main";

export class SomaService {

    static async prompt(content: string, maxTokens?: number, defaultPrompt?: boolean) {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                temperature: 0.7,
                frequency_penalty: 0.6,
                presence_penalty: 0,
                prompt: `${defaultPrompt ? Train : ""} ${content}`,
                max_tokens: maxTokens ?? 700,
            });

            return [response.data.choices[0].text, undefined];
        } catch (e) {
            console.log(e);
            return [undefined, e];
        }
    }
}