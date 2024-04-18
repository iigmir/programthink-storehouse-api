import dotenv from "dotenv";
dotenv.config();

const HOST = "https://www.googleapis.com/blogger/v3";

/**
 * @param {Object} given_params 
 * @returns {Object} parameters
 */
const GetPatams = (given_params = {}) => {
    const params = new URLSearchParams({ 
        ...given_params,
        key: process.env.BLOGGER_API_TOKEN
    });
    return params.toString();
}

/**
 * @see <https://developers.google.com/blogger/docs/3.0/reference/blogs/getByUrl>
 * @param {String} url 
 */
export async function GetBlogByPath(url = "https://blogger-developers.googleblog.com") {
    const api = `${HOST}/blogs/byurl?${GetPatams({ url })}`;
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        return { error };
    }
}

/**
 * @see <https://developers.google.com/blogger/docs/3.0/reference/posts/list>
 * @param {String} id Blog ID
 * @param {Object} other_params - [Parameters](https://developers.google.com/blogger/docs/3.0/reference/posts/list#parameters)
 */
export async function GetBlogPosts(id = "", other_params = {}) {
    const api = `${HOST}/blogs/${id}/posts?${GetPatams({ ...other_params })}`;
    try {
        const response = await fetch(api);
        return await response.json();
    } catch (error) {
        return { error };
    }
}
