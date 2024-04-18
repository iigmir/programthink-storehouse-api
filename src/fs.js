import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname } from "path";

const ROOT_DIR = "api";

/**
 * Create the `{ROOT_DIR}/{dir_path}` if the dir is NOT exist to prevent errors.
 * @param {String} dir_path 
 */
export function CreateDirIfNotExist(dir_path = "") {
    const fullPath = ROOT_DIR + "/" + dir_path;
    console.log(fullPath);
    if( !existsSync(fullPath) ) {
        mkdirSync(fullPath, { recursive: true });
    }
}

/**
 * Export `content` to `{ROOT_DIR}/{filename}`.
 * @param {String} filename 
 * @param {String} content 
 */
export function ExportFileToPath(filename = "result.json", content = "") {
    CreateDirIfNotExist(dirname(filename));
    writeFileSync( `${ROOT_DIR}/${filename}`, content );
};
