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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var fs_1 = require("fs");
var path_1 = require("path");
var prisma = new client_1.PrismaClient();
function deleteAllData(orderedFileNames) {
    return __awaiter(this, void 0, void 0, function () {
        var modelNames, _i, modelNames_1, modelName, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modelNames = orderedFileNames.map(function (fileName) {
                        var modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
                        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
                    });
                    _i = 0, modelNames_1 = modelNames;
                    _a.label = 1;
                case 1:
                    if (!(_i < modelNames_1.length)) return [3 /*break*/, 5];
                    modelName = modelNames_1[_i];
                    model = prisma[modelName];
                    if (!model) return [3 /*break*/, 3];
                    return [4 /*yield*/, model.deleteMany({})];
                case 2:
                    _a.sent();
                    console.log("Cleared Data from ".concat(modelName));
                    return [3 /*break*/, 4];
                case 3:
                    console.error("Model ".concat(modelName, " not NotFoundError. Please ensure that the model is coorect"));
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var dataDirectory, orderedFilenames, _i, orderedFilenames_1, fileName, filePath, jsonData, modelName, model, _a, jsonData_1, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dataDirectory = path_1.default.join(__dirname, "seedData");
                    orderedFilenames = [
                        "products.json",
                        "expenseSummary.json",
                        "sales.json",
                        "salesSummary.json",
                        "purchases.json",
                        "purchaseSummary.json",
                        "users.json",
                        "expenses.json",
                        "expenseByCategory.json",
                    ];
                    return [4 /*yield*/, deleteAllData(orderedFilenames)];
                case 1:
                    _b.sent();
                    _i = 0, orderedFilenames_1 = orderedFilenames;
                    _b.label = 2;
                case 2:
                    if (!(_i < orderedFilenames_1.length)) return [3 /*break*/, 8];
                    fileName = orderedFilenames_1[_i];
                    filePath = path_1.default.join(dataDirectory, fileName);
                    jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf8"));
                    modelName = path_1.default.basename(fileName, path_1.default.extname(fileName));
                    model = prisma[modelName];
                    if (!model) {
                        console.error("No Prisma model matches the filename: ".concat(fileName));
                        return [3 /*break*/, 7];
                    }
                    _a = 0, jsonData_1 = jsonData;
                    _b.label = 3;
                case 3:
                    if (!(_a < jsonData_1.length)) return [3 /*break*/, 6];
                    data = jsonData_1[_a];
                    return [4 /*yield*/, model.create({
                            data: data
                        })];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    _a++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("Seeded ".concat(modelName, " with data from ").concat(fileName));
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) { return console.error(e); }).finally(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, prisma.$disconnect()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); });
