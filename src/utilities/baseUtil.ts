import {BaseResponse} from "@/utils/types/baseTypes";
import {BaseEnum} from "@/utilities/enums/baseEnum";

export class BaseUtil {
    // Accept any number of arguments, type-safe
    static logger(...logInfo: unknown[]): void {
        if (process.env.NODE_ENV === "development") {
            console.log(...logInfo);
        }
    }

    static isApiResponseSuccessful(response: BaseResponse): boolean {
        return response.responseCode === BaseEnum.RESPONSE_CODE_SUCCESS;
        // Optional alternative checks:
        // return response.isSuccessful;
        // return ["200", "201"].includes(String(response.code));
    }
}
