// ============================================================================
// TypeScript Decorators Demo - Example Usage
// ============================================================================

// Import our custom decorators
import { LogClass, LogMethod, LogProperty, MeasureTime } from './decorators';

/**
 * ExampleService - Demonstrates different types of decorators
 * 
 * This class shows how to use:
 * - @LogClass - Class-level decoration
 * - @LogProperty - Field/property decoration  
 * - @LogMethod - Method decoration with logging
 * - @MeasureTime - Method decoration with performance timing
 */
@LogClass
class ExampleService {
    // Field decorator - logs when the property is accessed
    @LogProperty
    public message: string = "Hello Decorators!";

    constructor() {}

    /**
     * fetchData method - demonstrates method decorators
     * 
     * This method has two decorators:
     * - @LogMethod: Logs when the method is called and with what arguments
     * - @MeasureTime: Measures and logs how long the method takes to execute
     * 
     * When called, you'll see output like:
     * [LogMethod] fetchData called with ["https://api.example.com"]
     * [MeasureTime] fetchData took 15.234ms
     */
    @LogMethod
    @MeasureTime
    fetchData(url: string) {
        // Simulate some work (CPU-intensive loop)
        for (let i = 0; i < 1e6; i++) {} 
        
        // Return the result
        return `Fetched from ${url}`;
    }
}

// Create an instance of our decorated class
const service = new ExampleService();

// Call the decorated method to see the decorators in action
service.fetchData("https://api.example.com");

// Expected output:
// [LogProperty] Property: message
// [LogClass] Decorating: ExampleService
// [LogMethod] fetchData called with ["https://api.example.com"]
// [MeasureTime] fetchData took [some number]ms