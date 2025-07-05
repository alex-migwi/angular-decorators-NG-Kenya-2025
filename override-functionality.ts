// ============================================================================
// TypeScript Decorators - Override Functionality Examples
// ============================================================================
// 
// This file demonstrates how decorators can be used to:
// 1. Add new methods to classes
// 2. Override existing functionality
// 3. Implement mixin patterns
// 4. Add type-safe interfaces to decorated classes

/**
 * Type alias for a constructor function
 * This allows us to work with any class constructor
 */
type Constructor<T = {}> = new (...args: any[]) => T;

// ============================================================================
// Example 1: Adding toJSON Method
// ============================================================================

/**
 * Decorator that adds a toJSON method to any class
 * 
 * This demonstrates:
 * - Class inheritance with decorators
 * - Adding new functionality to existing classes
 * - Automatic serialization with timestamp
 * 
 * Usage: @addToJSON
 * class MyClass { ... }
 */
function addToJSON<TBase extends Constructor>(Base: TBase) {
  // Return a new class that extends the original
  return class extends Base {
    /**
     * Override or add toJSON method
     * Includes all properties from the original class plus a timestamp
     */
    toJSON() {
      return {
        ...this,  // Spread all existing properties
        serializedAt: new Date().toISOString(),  // Add timestamp
      };
    }
  };
}

// Apply the decorator to add JSON serialization capability
@addToJSON
class C {
  public foo = 'foo';
  public num = 24;
}

// Test the enhanced class - now has toJSON() method
console.log(JSON.stringify(new C()));

// ============================================================================
// Example 2: Adding Debug Method with Type Safety
// ============================================================================

/**
 * Interface defining the debug method signature
 * This ensures type safety when using the decorated class
 */
interface Debuggable {
  debug(): string;
}

/**
 * Decorator that adds a debug method with type safety
 * 
 * This demonstrates:
 * - Type-safe decorators with interfaces
 * - Method overriding with proper typing
 * - Class name extraction for debugging
 * 
 * Usage: @withDebug
 * class MyClass { ... }
 * 
 * Then cast: const instance = new MyClass() as MyClass & Debuggable;
 */
function withDebug<TBase extends Constructor>(Base: TBase): TBase & Constructor<Debuggable> {
  return class extends Base implements Debuggable {
    /**
     * Debug method that returns class name and JSON representation
     * Useful for debugging and logging
     */
    debug(): string {
      // Extract class name from constructor
      const className = (this.constructor as unknown as { name: string }).name;
      return `[${className}] ${JSON.stringify(this)}`;
    }    
  };
}

// Apply the debug decorator
@withDebug
class D {
  public foo = 'bar';
  public num = 25;
}

// Type cast to access the debug method with full type safety
const instance = new D() as D & Debuggable;
console.log(instance.debug());

// ============================================================================
// Example 3: Adding Generic Info Method
// ============================================================================

/**
 * Generic interface for info method
 * Allows flexible return types based on implementation
 */
interface Loggable<T>{
  getInfo(): T;
}

/**
 * Decorator that adds a getInfo method
 * 
 * This demonstrates:
 * - Generic decorators
 * - Class introspection (getting class name and properties)
 * - Flexible return types
 * 
 * Usage: @withInfo
 * class MyClass { ... }
 */
function withInfo<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    /**
     * Returns information about the class including:
     * - Class name
     * - All property names
     * 
     * Useful for reflection and debugging
     */
    getInfo() {
      // Get the class name from constructor
      const className = (this.constructor as unknown as { name: string }).name;
      return {
        class: className,
        props: Object.keys(this),  // Get all property names
      };
    }
  };
}

// Apply the info decorator
@withInfo
class E {
  public foo = 'foo';
  public num = 42;
}

// Type cast to access the getInfo method
console.log((new E() as E & Loggable<{}>).getInfo());

// ============================================================================
// Key Concepts Demonstrated:
// ============================================================================
// 
// 1. Class Inheritance: Each decorator returns a new class that extends the original
// 2. Method Addition: New methods are added to the class without modifying the original
// 3. Type Safety: Interfaces ensure the added methods are properly typed
// 4. Composition: Multiple decorators can be combined for powerful functionality
// 5. Reflection: Access to class metadata for debugging and introspection
// 
// These patterns are useful for:
// - Adding cross-cutting concerns (logging, debugging)
// - Implementing mixins and traits
// - Creating reusable class enhancements
// - Building framework functionality

