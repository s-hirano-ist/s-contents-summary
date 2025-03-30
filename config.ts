import { defineCollection } from "astro:content";
import { blogSchema, newsSchema, summarySchema } from "@content/_schemas";

const summaryCollection = defineCollection({
	type: "content",
	schema: summarySchema,
});

const newsCollection = defineCollection({
	type: "data",
	schema: newsSchema,
});

const blogCollection = defineCollection({
	type: "content",
	schema: blogSchema,
});

export const collections = {
	summary: summaryCollection,
	news: newsCollection,
	blog: blogCollection,
};
