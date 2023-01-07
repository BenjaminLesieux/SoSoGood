import {openai, Train} from "../main";

export class SomaService {

    static async prompt(content: string) {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                temperature: 0,
                top_p: 1,
                frequency_penalty: 0.5,
                presence_penalty: 0,
                prompt: Train + " " + content,
                max_tokens: 1000
            });

            return [response.data.choices[0].text, undefined];
        } catch (e) {
            console.log(e);
            return [undefined, e];
        }
    }
}