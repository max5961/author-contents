/**
 * Convert:
 * John, Smith  587
 * John, Smith  373
 *
 * To:
 * John, Smith  587, 373
 */
export declare function flattenData(contents: string): {
    result: string;
    errors: string[];
};
/**
 * In case file contains \n instead of \r
 */
export declare function getLines(contents: string): string[];
