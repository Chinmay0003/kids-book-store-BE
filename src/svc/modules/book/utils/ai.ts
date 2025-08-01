import OpenAI from "openai";
import { conf } from "~src/config/settings";

export const getFilteredBooksFromAiSystemPrompt = () =>
  `You are an expert in book recommendation. You have to recommend some books based on the query given by the user.`;

export const getFilteredBooksFromAiUserPrompt = (
  query: string,
  bookDescriptionArr: {
    bookIndex: number;
    bookName: string;
    bookAgeGroup: string;
    bookCategory: string;
    bookDescription: string;
  }[],
) => {
  return `You are an expert assistant tasked with filtering a list of books based on a user's query. Each book contains a name and a short summary that may include characters, themes, values, and events.

The user’s query may describe:
- A specific character or event
- A core theme or message (e.g., friendship, justice)
- A setting or plot element
- A moral or emotional experience
- Any other meaningful feature found in the book summaries

You are given a list of books in the following format:
[
    {
        bookIndex: string,           // Unique identifier
        bookName: string,            // Title of the book
        bookAgeGroup: string,        // Age group of the book
        bookCategory: string,        // Content category of the book
        bookDescription: string,     // Short summary of the book
    },
    ...
]

Your task is to carefully read the user's query and select **only those books whose descriptions match the query in a meaningful way**, even if the wording differs. Perform **semantic matching**, not keyword matching.

Return ONLY the array of matching "bookIndex" values (not names or descriptions). The array must only include relevant matches. If there are no matches, return an empty array.

---

User Query:
<query>
${query}
</query>

Books:
<books>
${JSON.stringify(bookDescriptionArr)}
</books>

---

Output format:
[
  "bookIndex1",
  "bookIndex2",
  ...
]
`;
};

export const getFilteredBooksFromAi = async (
  query: string,
  bookDescriptionArr: {
    bookIndex: number;
    bookName: string;
    bookAgeGroup: string;
    bookCategory: string;
    bookDescription: string;
  }[],
) => {
  const openai = new OpenAI({
    apiKey: conf.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: getFilteredBooksFromAiSystemPrompt() },
      {
        role: "user",
        content: getFilteredBooksFromAiUserPrompt(query, bookDescriptionArr),
      },
    ],
  });
  return response.choices[0].message.content?.replace("```json", "").replace("```", "");
};
