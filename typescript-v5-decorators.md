# TypeScript 5.0+ Decorators

---

## 1. Foundations: The Decorator Pattern

The **Decorator Pattern** is a structural design pattern that attaches new behaviors to objects by placing them inside special wrapper objects, called decorators. This allows you to add functionality without modifying the original class.

```ts
// Classical Decorator Pattern Example
class Coffee {
  cost() { return 5; }
}
class MilkDecorator {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 1; }
}
const milkCoffee = new MilkDecorator(new Coffee());
console.log(milkCoffee.cost()); // 6
```

TypeScript 5.0+ decorators are inspired by this concept: they let you **add behavior** or **metadata** to classes, methods, and properties in a declarative, compile-time manner.

---

## 2. TypeScript 5.0+ Decorators: Basics & Parameters

To use the new decorator API in TypeScript 5.0+, configure your `tsconfig.json`:

```json
{
  "target": "ESNext",
  "module": "ESNext",
  "experimentalDecorators": true,
  "useDefineForClassFields": true
}
```

### 2.1 Types of Decorators & Their Parameters

| Type      | Target           | Signature Parameters                                            |
|-----------|------------------|-----------------------------------------------------------------|
| Class     | Class constructor| `(constructor: T) => T`                                        |
| Field     | Class field      | `(target: undefined, context: ClassFieldDecoratorContext) => (value: T) => T` |
| Method    | Class method     | `(target: undefined, context: ClassMethodDecoratorContext) => void` |
| Accessor  | Class accessor   | `(target: undefined, context: ClassAccessorDecoratorContext) => void` |

#### Parameter Details
- **Class Decorator**: Receives the class constructor and returns it (or a new constructor).
- **Field Decorator**: Receives a context object and returns a function that processes the field value.
- **Method Decorator**: Receives a context object and can use `addInitializer` to modify the method.
- **Accessor Decorator**: Receives a context object for getter/setter methods.

```ts
// New API Examples
function MyClassDecorator<T extends new (...args: any[]) => any>(constructor: T): T {
  console.log('Class created:', constructor.name);
  return constructor;
}

function MyFieldDecorator<T extends object, K extends keyof T>(
  target: undefined, 
  context: ClassFieldDecoratorContext<T, T[K]>
): (value: T[K]) => T[K] {
  return (value: T[K]) => value;
}

function MyMethodDecorator<T extends object>(
  target: undefined,
  context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
): void {
  context.addInitializer(function (this: T) {
    // Modify the method here
  });
}
```

**Example Recap:**
```ts
class Example {
  @MyFieldDecorator
  someProperty: string = "hello";

  @MyMethodDecorator
  someMethod(msg: string) {}
}
```

> Decorators execute at **compile/design time**. You can modify behavior or attach annotations used by frameworks.

---

## 3. Reflection & Metadata

To read design-time types at runtime, use **reflect-metadata**:

1. Install: `npm install reflect-metadata`
2. Import once: `import 'reflect-metadata';`
3. Enable `emitDecoratorMetadata` in `tsconfig.json`.

```ts
// Retrieve the type of a property
Reflect.getMetadata('design:type', target, propertyKey);
```

Reflection lets decorators inspect types, useful for form builders, DI, or validation.

---

## 4. Angular Built-in Decorators

| Decorator         | Purpose                                    |
|-------------------|--------------------------------------------|
| `@Component()`    | Defines a UI component                     |
| `@Directive()`    | Creates an attribute or structural directive |
| `@Injectable()`   | Marks a class for dependency injection     |
| `@NgModule()`     | Declares an Angular module                 |
| `@Input()`        | Declares an input property                 |
| `@Output()`       | Declares an output event emitter           |
| `@HostListener()` | Binds a method to a DOM event              |
| `@HostBinding()`  | Binds a property to a host element attribute|

---

## 5. Writing Custom Decorators (New API)

### 5.1 Class Decorator
```ts
function LogClass<T extends new (...args: any[]) => any>(constructor: T): T {
  console.log('Class created:', constructor.name);
  return constructor;
}

@LogClass
class MyService {}
```

### 5.2 Method Decorator
```ts
function LogMethod<T extends object>(
  target: undefined,
  context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
): void {
  const methodName = context.name;
  context.addInitializer(function (this: T) {
    const originalMethod = this[methodName as keyof T] as (this: T, ...args: any[]) => any;
    (this as any)[methodName] = function (this: T, ...args: any[]) {
      console.log(`Calling ${String(methodName)} with`, args);
      return originalMethod.call(this, ...args);
    };
  });
}
```

### 5.3 Field Decorator
```ts
function DefaultValue<T extends object, K extends keyof T>(
  defaultValue: T[K]
) {
  return function (
    target: undefined, 
    context: ClassFieldDecoratorContext<T, T[K]>
  ): (value: T[K]) => T[K] {
    return (value: T[K]) => value ?? defaultValue;
  };
}

class Example {
  @DefaultValue("hello")
  message: string;
}
```

### 5.4 Accessor Decorator
```ts
function Validate<T extends object>(
  target: undefined,
  context: ClassAccessorDecoratorContext<T, any>
): void {
  context.addInitializer(function (this: T) {
    const originalGet = this[context.name as keyof T] as any;
    const originalSet = context.access.set;
    
    context.access.set = function (value: any) {
      if (value === undefined || value === null) {
        throw new Error(`${String(context.name)} cannot be null or undefined`);
      }
      originalSet.call(this, value);
    };
  });
}
```

---

## 6. Decorator Factories & Composition

### 6.1 Decorator Factories
A **decorator factory** is a function that returns a decorator, allowing you to pass arguments/configuration.

```ts
function LogWithPrefix(prefix: string) {
  return function <T extends object>(
    target: undefined,
    context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
  ): void {
    const methodName = context.name;
    context.addInitializer(function (this: T) {
      const originalMethod = this[methodName as keyof T] as (this: T, ...args: any[]) => any;
      (this as any)[methodName] = function (this: T, ...args: any[]) {
        console.log(`${prefix}: ${String(methodName)}`, args);
        return originalMethod.call(this, ...args);
      };
    });
  };
}

class Example {
  @LogWithPrefix('DEBUG')
  say(message: string) {
    console.log(message);
  }
}
```

### 6.2 Decorator Composition
**Decorator composition** means stacking multiple decorators on a single target. Decorators are applied **bottom to top** (the last decorator in code is applied first).

```ts
function Log<T extends object>(
  target: undefined,
  context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
): void {
  const methodName = context.name;
  context.addInitializer(function (this: T) {
    const originalMethod = this[methodName as keyof T] as (this: T, ...args: any[]) => any;
    (this as any)[methodName] = function (this: T, ...args: any[]) {
      console.log('Calling', String(methodName));
      return originalMethod.call(this, ...args);
    };
  });
}

function Cache<T extends object>(
  target: undefined,
  context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
): void {
  const methodName = context.name;
  const cache = new Map<string, any>();
  
  context.addInitializer(function (this: T) {
    const originalMethod = this[methodName as keyof T] as (this: T, ...args: any[]) => any;
    (this as any)[methodName] = function (this: T, ...args: any[]) {
      const cacheKey = JSON.stringify(args);
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }
      const result = originalMethod.call(this, ...args);
      cache.set(cacheKey, result);
      return result;
    };
  });
}

class MathService {
  @Log
  @Cache
  expensiveOperation(x: number) {
    return x * x; // pretend this is slow
  }
}
```

---

## 7. Real-World Use Cases

### 7.1 Permission Check
```ts
function RequirePermission(permission: string) {
  return function <T extends object>(
    target: undefined,
    context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
  ): void {
    const methodName = context.name;
    context.addInitializer(function (this: T) {
      const originalMethod = this[methodName as keyof T] as (this: T, ...args: any[]) => any;
      (this as any)[methodName] = function (this: T, ...args: any[]) {
        const svc = inject(PermissionService);
        if (!svc.hasPermission(permission)) {
          throw new Error(`Missing ${permission}`);
        }
        return originalMethod.call(this, ...args);
      };
    });
  };
}
```

### 7.2 Caching
```ts
const cache = new Map<string, any>();
function CacheResult<T extends object>(
  target: undefined,
  context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
): void {
  const methodName = context.name;
  context.addInitializer(function (this: T) {
    const originalMethod = this[methodName as keyof T] as (this: T, ...args: any[]) => any;
    (this as any)[methodName] = function (this: T, ...args: any[]) {
      const ckey = `${String(methodName)}-${JSON.stringify(args)}`;
      if (cache.has(ckey)) return cache.get(ckey);
      const res = originalMethod.call(this, ...args);
      cache.set(ckey, res);
      return res;
    };
  });
}
```

### 7.3 Analytics on Component Init
```ts
function WithAnalytics(eventName?: string) {
  return function <T extends new (...args: any[]) => any>(constructor: T): T {
    const originalInit = constructor.prototype.ngOnInit;
    constructor.prototype.ngOnInit = function () {
      const analytics = inject(AnalyticsService);
      analytics.trackEvent('Init', { name: eventName || constructor.name });
      originalInit?.apply(this);
    };
    return constructor;
  };
}
```

### 7.4 Auto-Unsubscribe
```ts
function AutoUnsubscribe<T extends new (...args: any[]) => any>(constructor: T): T {
  const originalDestroy = constructor.prototype.ngOnDestroy;
  constructor.prototype.ngOnDestroy = function () {
    for (const k in this) {
      this[k]?.unsubscribe?.();
    }
    originalDestroy?.apply(this);
  };
  return constructor;
}
```

---

## 8. Signals & Observables

### 8.1 SimpleSignal
```ts
function SimpleSignal<T>(initial: T) {
  let value = initial;
  const listeners: (() => void)[] = [];
  const signal = (() => value) as (() => T) & {
    set: (v: T) => void;
    effect: (fn: () => void) => void;
  };
  signal.set = v => { value = v; listeners.forEach(fn => fn()); };
  signal.effect = fn => { listeners.push(fn); fn(); };
  return signal;
}
```

### 8.2 fromObservable
```ts
import { Observable } from 'rxjs';
function fromObservable<T>(obs$: Observable<T>, initial: T) {
  const sig = SimpleSignal(initial);
  const sub = obs$.subscribe(val => sig.set(val));
  (sig as any).unsubscribe = () => sub.unsubscribe();
  return sig;
}
```

---

## 9. Code Lab: Debounce Decorator

**Objective**: Create a `@Debounce` method decorator that delays method execution.

```ts
function Debounce(ms: number) {
  return function <T extends object>(
    target: undefined,
    context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
  ): void {
    const methodName = context.name;
    let timeoutId: NodeJS.Timeout;
    
    context.addInitializer(function (this: T) {
      const originalMethod = this[methodName as keyof T] as (this: T, ...args: any[]) => any;
      (this as any)[methodName] = function (this: T, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          originalMethod.call(this, ...args);
        }, ms);
      };
    });
  };
}
```

**Usage:**
```ts
class SearchComponent {
  @Debounce(300)
  onSearch(query: string) {
    // This will only execute after 300ms of no calls
  }
}
```

---

## 10. Migration from Legacy API

### Key Differences:

| Legacy API | New API |
|------------|---------|
| `(target, propertyKey, descriptor)` | `(target, context)` |
| `descriptor.value` | `context.addInitializer()` |
| `return descriptor` | `return void` |
| Field decorators not supported | Full field decorator support |

### Migration Example:

**Legacy:**
```ts
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey}`, args);
    return original.apply(this, args);
  };
  return descriptor;
}
```

**New API:**
```ts
function LogMethod<T extends object>(
  target: undefined,
  context: ClassMethodDecoratorContext<T, (this: T, ...args: any[]) => any>
): void {
  const methodName = context.name;
  context.addInitializer(function (this: T) {
    const originalMethod = this[methodName as keyof T] as (this: T, ...args: any[]) => any;
    (this as any)[methodName] = function (this: T, ...args: any[]) {
      console.log(`Calling ${String(methodName)}`, args);
      return originalMethod.call(this, ...args);
    };
  });
}
```

---

## 11. Best Practices & Summary

- **Keep decorators small and single-purpose**
- **Prefer decorator factories** for configurability
- **Document execution order** if it matters
- **Understand evaluation and application order**: decorators are applied bottom-to-top
- **Use reflection** for advanced scenarios (type inspection, DI, validation)
- **Leverage composition** to separate concerns and reuse logic
- **Use the new API** for TypeScript 5.0+ projects
- **Consider migration** from legacy API for better performance and features

---

🎉 You now have a complete advanced reference for TypeScript 5.0+ decorators, including real-world use cases, composition, and migration guidance. 