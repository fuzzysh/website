export default function (eleventyConfig) {
        eleventyConfig.addPassthroughCopy({
                'static': '/'
        });
}
export const config = {
        dir: {
                input: "views",
                output: "dist"
        },
};
