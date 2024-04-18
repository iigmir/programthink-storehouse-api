import { GetBlogByPath, GetBlogPosts, GetApiByPath } from "./api.js";
import { GetBlogByPathInterface, GetBlogPostsInterface } from "./api.interface.js";
import { ExportFileToPath } from "./fs.js";

const ApiStoringFile = {
    src: "",
    get path() { return this.src; },
    set path(input = "") { this.src = input; }
};

const export_result = (id = "", exported_object = [], response = {}, type = "unknown") => {
    let filename = `${ApiStoringFile.path}/${type}.json`;
    let filecontent = JSON.stringify([...exported_object, response]);
    ExportFileToPath(filename, filecontent);
    return;
};

const get_all_posts = (id = "") => {
    /**
     * @see <https://developers.google.com/blogger/docs/3.0/reference/posts/list#parameters>
     * @param {String} pageToken 
     * @returns 
     */
    const get_params = (pageToken) => {
        const params = {
            maxResults: 500,
        };
        if (pageToken) {
            params.pageToken = pageToken;
        }
        return params;
    };
    /**
     * Call the `GetBlogPosts` API function.
     * 
     * If there's a `nextPageToken` in API response,
     * call recursion with a new `pageToken` until no `nextPageToken` in API response,
     * which mean this is the last page.
     * 
     * If no `nextPageToken`, which mean this is the last page,
     * export the content to given file.
     * @param {String} id 
     * @param {String} pageToken 
     * @param {GetBlogPostsInterface[]} exported_object 
     * @returns 
     */
    const get_each_post = (id, pageToken = "", exported_object = []) => {
        return GetBlogPosts(id, get_params(pageToken)).then( (response = GetBlogPostsInterface) => {
            if (response.nextPageToken) {
                // Recursion!
                return get_each_post(id, response.nextPageToken, [...exported_object, response]);
            } else {
                return export_result(id, exported_object, response, "posts");
            }
        });
    };

    // Action
    console.log("Getting posts...");
    return get_each_post(id, "", []);
};

const get_all_pages = (url = "", id = "") => {
    GetApiByPath(url).then( (response) => {
        export_result(id, [], response, "pages");
    });
};

const main = (url = "") => {
    // Action
    console.log("Getting info...");
    GetBlogByPath(url).then( (response = GetBlogByPathInterface) => {
        ApiStoringFile.path = `${response.id}-${Date.now()}`;
        export_result(response.id, [], response, "info");
        get_all_pages(response.pages.selfLink, response.id);
        get_all_posts(response.id);
    });
};

// console.log(process.argv[2]);
main(process.argv[2]);
