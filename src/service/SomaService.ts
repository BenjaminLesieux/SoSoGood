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

    static drunkify(content: string) {
        let randomizer = Math.random();

        const words = content.split("");
        const charsMap = words.map((word) => word.charCodeAt(0));
        const translatedCharsMap = [];

        const forbiddenChars = ["(", ")", "?", "!"];

        charsMap.forEach((char, index) => {
            if (forbiddenChars.includes(String.fromCharCode(char))) {
                translatedCharsMap.push(char);
            }

            else if (randomizer <= 0.16)
                translatedCharsMap.push(this.shift(char));
            else if (randomizer > 0.16 && randomizer <= 0.32) {
                translatedCharsMap.push(char, char);
            }
            else translatedCharsMap.push(char);

            randomizer = Math.random();
        });

        const translatedWords = translatedCharsMap.map((char) => String.fromCharCode(char));
        return translatedWords.join("");
    }

    private static shift(char: number) {
        return char + Math.floor(Math.random() * 2);
    }
}