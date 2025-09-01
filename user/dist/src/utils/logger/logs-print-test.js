"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
function testLogger() {
    let nn = 12355;
    index_1.default.info('String Test:', 'This is a string');
    index_1.default.info('Number Test:', nn);
    index_1.default.info('Boolean Test:', true);
    index_1.default.info('Null Test:', null);
    index_1.default.info('Undefined Test:', undefined); // Should not throw errors but might log as empty
    index_1.default.info('Simple Array Test:', [1, 2, 3, 4, 5]);
    index_1.default.info('Nested Array Test:', [1, [2, [3, [4, 5]]]]);
    index_1.default.info('Mixed Array Test:', [1, 'string', true, null, { key: 'value' }]);
    index_1.default.info('Simple Object Test:', { key1: 'value1', key2: 'value2' });
    index_1.default.info('Nested Object Test:', { level1: { level2: { level3: 'deepValue' } } });
    index_1.default.info('Object with Array Test:', { key: [1, 2, 3], anotherKey: 'value' });
    const circularObj = { name: 'Circular Object' };
    circularObj.self = circularObj; // Create circular reference
    index_1.default.info('Circular Object Test:', circularObj);
    const complexObj = {
        a: 1,
        b: [1, 2, { c: 3 }],
        d: { e: 'nested', f: [4, 5, 6] },
    };
    index_1.default.info('Complex Object Test:', complexObj);
    try {
        throw new Error('This is a test error');
    }
    catch (err) {
        index_1.default.error('Error Object Test:', err);
    }
    index_1.default.error('String Error Test:', 'This is a string error');
    const customError = new Error('Custom Error Message');
    customError.name = 'CustomError';
    index_1.default.error('Custom Error Test:', customError);
    try {
        // Simulate an unhandled error
        JSON.parse('INVALID_JSON');
    }
    catch (err) {
        index_1.default.error('Unhandled Error:', err);
    }
    index_1.default.info('Special Characters Test:', 'String with special characters: !@#$%^&*()_+[]{}|;:",.<>?/~`');
    index_1.default.info('Unicode String Test:', 'Unicode characters: こんにちは世界');
    const promise = Promise.resolve('Resolved Value');
    index_1.default.info('Promise Test:', promise);
    promise.then((result) => {
        index_1.default.info('Promise Resolved Test:', result);
    });
    const rejectedPromise = Promise.reject(new Error('Rejected Promise'));
    rejectedPromise.catch((err) => {
        index_1.default.error(`Promise Rejected Test: ${err}`);
    });
}
//testLogger()
