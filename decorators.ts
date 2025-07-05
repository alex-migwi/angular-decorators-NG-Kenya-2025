// ============================================================================
// TypeScript 5.0+ Decorators - Reusable Utility Decorators
// ============================================================================

/**
 * Class Decorator: Logs when a class is decorated
 * 
 * Usage: @LogClass
 * class MyClass { ... }
 * 
 * Output: [LogClass] Decorating: MyClass
 */
export function LogClass(constructor: any): any {
    console.log('[LogClass] Decorating:', constructor.name);
    return constructor;
}

/**
 * Field Decorator: Logs when a class field is decorated
 * 
 * Usage: @LogProperty
 * public message: string = "Hello";
 * 
 * Output: [LogProperty] Property: message
 */
export function LogProperty(target: any, context: any): any {
    console.log('[LogProperty] Property:', context.name);
    return (value: any) => value;
}

/**
 * Method Decorator: Logs method calls with their arguments
 * 
 * Usage: @LogMethod
 * fetchData(url: string) { ... }
 * 
 * Output: [LogMethod] fetchData called with ["https://api.example.com"]
 * 
 * How it works:
 * 1. Captures the original method
 * 2. Wraps it with logging functionality
 * 3. Logs the method name and arguments when called
 * 4. Returns the original result
 */
export function LogMethod(target: any, context: any): any {
    const methodName = context.name;
    return function (this: any, ...args: any[]) {
        console.log('[LogMethod]', methodName, 'called with', args);
        return context.value.call(this, ...args);
    };
}

/**
 * Method Decorator: Measures and logs the execution time of a method
 * 
 * Usage: @MeasureTime
 * fetchData(url: string) { ... }
 * 
 * Output: [MeasureTime] fetchData took 15.234ms
 * 
 * How it works:
 * 1. Records the start time using performance.now()
 * 2. Calls the original method
 * 3. Records the end time
 * 4. Calculates and logs the duration in milliseconds
 * 5. Returns the original result
 */
export function MeasureTime(target: any, context: any): void {
    const methodName = context.name;
    context.addInitializer(function (this: any) {
        const originalMethod = this[methodName];
        console.log(originalMethod);
        this[methodName] = function (...args: any[]) {
            const start = performance.now();
            const result = originalMethod.call(this, ...args);
            const end = performance.now();
            console.log(`[MeasureTime] ${String(methodName)} took ${end - start}ms`);
            return result;
        };
    });
}

export function LogParameter(target: any, key: string, index: number) {
    console.log(`[LogParameter] Parameter index ${index} in method ${key}`);
}