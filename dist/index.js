"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NakoIngestApi = void 0;
class NakoIngestApi {
    static init(apiKey) {
        NakoIngestApi.apiKey = apiKey;
        return new NakoIngestApi();
    }
    // TODO - add validation
    createActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('https://api.nako.co/v1/activities', {
                method: 'post',
                body: JSON.stringify({
                    happened_at: activity.happenedAt,
                    operation: activity.operation,
                    resource: activity.resource,
                    actor: {
                        id: activity.actor.id,
                        type: activity.actor.type,
                        first_name: activity.actor.firstName,
                        last_name: activity.actor.lastName
                    }
                }),
                headers: {
                    'x-api-key': NakoIngestApi.apiKey
                }
            });
            // TODO - handle errors
            const json = yield response.json();
            return json;
        });
    }
}
exports.NakoIngestApi = NakoIngestApi;
//# sourceMappingURL=index.js.map