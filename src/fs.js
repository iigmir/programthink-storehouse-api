import { writeFileSync, mkdirSync, existsSync } from "fs";
const ROOT_DIR = "api";

/**
 * Create the `{ROOT_DIR}/{dir_path}` if the dir is NOT exist to prevent errors.
 * @param {String} dir_path 
 */
export function CreateDirIfNotExist(dir_path = "") {
    if( !existsSync(ROOT_DIR + dir_path) ) {
        mkdirSync(ROOT_DIR + dir_path);
    }
}

/**
 * Export `content` to `{ROOT_DIR}/{filename}`.
 * @param {String} filename 
 * @param {String} content 
 */
export function ExportFileToPath(filename = "result.json", content = "") {
    CreateDirIfNotExist("");
    writeFileSync( `${ROOT_DIR}/${filename}`, content );
};
