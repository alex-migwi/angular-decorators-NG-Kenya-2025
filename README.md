# Angular Decorators - NG Kenya 2025

A TypeScript decorators project demonstrating both legacy and modern TypeScript 5.0+ decorator APIs with separate configurations for each.

## 🎯 Project Overview

This project showcases both the legacy TypeScript decorator API and the new TypeScript 5.0+ decorator API with separate TypeScript configurations to ensure proper compilation for each approach. It includes practical examples, performance monitoring decorators, and educational content about decorator patterns.

**If you find a bug or have something interesting to add, make a PR.**

## 📁 Project Structure

```
angular-decorators-NG-Kenya-2025/
├── README.md                           # This file
├── package.json                        # Project configuration and scripts
├── tsconfig.base.json                  # Base TypeScript configuration
├── tsconfig.json                       # Main configuration (extends base, new API default)
├── tsconfig.legacy.json                # Legacy decorator API configuration
├── tsconfig.new-api.json               # New decorator API configuration
│
├── Legacy API Examples:
├── code-lab-debounce-legacy.decorator.ts # Debounce decorator (legacy API)
│
├── New API Examples:
├── code-lab-debounce.decorator.ts      # Debounce decorator (new API)
├── decorators.ts                       # Reusable utility decorators (new API)
├── main.ts                            # Example usage and demonstrations (new API)
├── override-functionality.ts          # Advanced decorator patterns (new API)
│
├── Documentation:
├── typescript-v5-decorators.md        # Comprehensive decorator documentation
└── before-typescript-v5.0 decorators.md # Legacy decorator information
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- TypeScript 5.0+
- A modern browser or Node.js environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alex-migwi/angular-decorators-NG-Kenya-2025.git
cd angular-decorators-NG-Kenya-2025
```

2. Install dependencies:
```bash
npm install
```

## 🔧 Running Examples

### Legacy Decorator API

The legacy API uses the old TypeScript decorator syntax with `PropertyDescriptor`:

```bash
# Build and run legacy decorator example
npm run dev:legacy

# Or manually:
npx tsc --project tsconfig.legacy.json
node dist/code-lab-debounce-legacy.decorator.js
```


### New Decorator API (TypeScript 5.0+)

The new API uses the modern decorator syntax with context objects:

```bash
# Build and run new API decorator example
npm run dev:new-api

# Or manually:
npx tsc --project tsconfig.new-api.json
node dist/code-lab-debounce.decorator.js
```


### Main Examples (New API)

```bash
# Build and run main examples (new API)
npm run dev

# Or manually:
npx tsc --project tsconfig.new-api.json
node dist/main.js
```

### Build All Configurations

```bash
# Build both legacy and new API configurations
npm run build:all
```

## ⚙️ Configuration Details

### Configuration Files

| File | Purpose | Key Settings |
|------|---------|--------------|
| `tsconfig.base.json` | Base configuration with common settings | Common compiler options |
| `tsconfig.json` | Main configuration (extends base) | New API by default |
| `tsconfig.legacy.json` | Legacy decorator API | `useDefineForClassFields: false` |
| `tsconfig.new-api.json` | New decorator API | `useDefineForClassFields: true` |

### Key Configuration Differences

**Legacy API Configuration**:
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "emitDecoratorMetadata": true
  },
  "include": ["code-lab-debounce-legacy.decorator.ts"]
}
```

**New API Configuration**:
```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    "useDefineForClassFields": true,
    "emitDecoratorMetadata": true
  },
  "include": [
    "code-lab-debounce.decorator.ts",
    "decorators.ts",
    "main.ts",
    "override-functionality.ts"
  ]
}
```

### NPM Scripts

| Script | Description | Configuration Used |
|--------|-------------|-------------------|
| `npm run build` | Build using main config | `tsconfig.json` (new API) |
| `npm run build:legacy` | Build legacy decorator files | `tsconfig.legacy.json` |
| `npm run build:new-api` | Build new API decorator files | `tsconfig.new-api.json` |
| `npm run build:all` | Build both legacy and new API | Both configs |
| `npm run dev` | Build and run main example | `tsconfig.new-api.json` |
| `npm run dev:legacy` | Build and run legacy example | `tsconfig.legacy.json` |
| `npm run dev:new-api` | Build and run new API example | `tsconfig.new-api.json` |
| `npm run start` | Run main example (assumes built) | - |
| `npm run start:legacy` | Run legacy example (assumes built) | - |
| `npm run start:new-api` | Run new API example (assumes built) | - |

## 🎨 Available Decorators

### New API Decorators (`decorators.ts`)

| Decorator | Type | Purpose | Usage |
|-----------|------|---------|-------|
| `@LogClass` | Class | Logs when a class is decorated | `@LogClass class MyClass {}` |
| `@LogProperty` | Field | Logs when a property is decorated | `@LogProperty message: string` |
| `@LogMethod` | Method | Logs method calls with arguments | `@LogMethod fetchData() {}` |
| `@MeasureTime` | Method | Measures and logs execution time | `@MeasureTime fetchData() {}` |


## 🔄 API Comparison

### Legacy vs New API

| Aspect | Legacy API | New API |
|--------|------------|---------|
| **Syntax** | `(target, propertyKey, descriptor)` | `(target, context)` |
| **Return** | `PropertyDescriptor` | `any` or function |
| **Method Access** | `descriptor.value` | `context.value` |
| **Field Access** | `descriptor.value` | `context.value` |
| **Class Access** | `target` | `target` |
| **Configuration** | `useDefineForClassFields: false` | `useDefineForClassFields: true` |

### Migration Example

**Legacy API**:
```typescript
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`[LogMethod] ${propertyKey} called with`, args);
        return original.apply(this, args);
    };
    return descriptor;
}
```

**New API**:
```typescript
function LogMethod(target: any, context: any) {
    return function (this: any, ...args: any[]) {
        console.log(`[LogMethod] ${context.name} called with`, args);
        return context.value.call(this, ...args);
    };
}
```

## 🎓 Learning Objectives

This project helps you understand:

1. **Legacy Decorator API**: Old TypeScript decorator syntax and patterns
2. **Modern Decorator API**: TypeScript 5.0+ decorator syntax and patterns
3. **Configuration Management**: How to manage different TypeScript configurations
4. **Practical Applications**: Real-world use cases in Angular development
5. **Performance Monitoring**: How to create decorators for measuring execution time
6. **Debugging Tools**: Logging decorators for development and debugging
7. **Migration Paths**: How to migrate from legacy to new API

## 🔧 Development

### Watch Mode

```bash
# Watch for changes (new API)
npx tsc --watch --project tsconfig.new-api.json

# Watch for changes (legacy)
npx tsc --watch --project tsconfig.legacy.json
```

### Adding New Decorators

1. **For New API**: Add your decorator to `decorators.ts` or create a new file and add it to `tsconfig.new-api.json`
2. **For Legacy API**: Create a new file and add it to `tsconfig.legacy.json`
3. Follow the established patterns and documentation style
4. Add usage examples
5. Update this README with new decorator information

### Troubleshooting

**Common Issues**:

1. **"Cannot read properties of undefined (reading 'call')"**: Usually indicates a decorator API mismatch
2. **"Experimental decorators" error**: Ensure `experimentalDecorators: true` is set
3. **Module resolution errors**: Check that files are included in the correct `tsconfig.json`

**Solutions**:
- Use the correct configuration file for your decorator API
- Ensure `useDefineForClassFields` matches your API choice
- Check that all required files are included in the configuration

## 📚 Documentation

### TypeScript 5.0+ Decorators (`typescript-v5-decorators.md`)

Comprehensive guide covering:
- Decorator pattern foundations
- TypeScript 5.0+ decorator API
- Reflection and metadata
- Angular built-in decorators
- Custom decorator implementation
- Decorator factories and composition
- Real-world use cases

### Legacy Decorators (`before-typescript-v5.0 decorators.md`)

Information about the old decorator syntax for reference and migration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the NG Kenya 2025 workshop materials.

## 🔗 Related Resources

- [TypeScript Decorators Documentation](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [TypeScript 5.0 Decorators Documentation](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)
- [ECMAScript Decorators Proposal](https://github.com/tc39/proposal-decorators)
- [Decorator Pattern](https://refactoring.guru/design-patterns/decorator)

---

**Happy Decorating! 🎨✨** 