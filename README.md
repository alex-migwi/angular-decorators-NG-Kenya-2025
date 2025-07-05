# Angular Decorators - NG Kenya 2025

A comprehensive TypeScript 5.0+ decorators project demonstrating modern decorator patterns and their practical applications in Angular development.

## 🎯 Project Overview

This project showcases the new TypeScript 5.0+ decorator API and provides reusable utility decorators for Angular applications. It includes practical examples, performance monitoring decorators, and educational content about decorator patterns.

## 📁 Project Structure

```
angular-decorators-NG-Kenya-2025/
├── README.md                           # This file
├── decorators.ts                       # Reusable utility decorators
├── main.ts                            # Example usage and demonstrations
├── override-functionality.ts          # Advanced decorator patterns
├── tsconfig.json                      # TypeScript configuration
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

2. Install dependencies (if any):
```bash
npm install
```

3. Compile and run:
```bash
# Compile TypeScript
npx tsc

# Run the example
node dist/main.js
```

## 🎨 Available Decorators

### Utility Decorators (`decorators.ts`)

| Decorator | Type | Purpose | Usage |
|-----------|------|---------|-------|
| `@LogClass` | Class | Logs when a class is decorated | `@LogClass class MyClass {}` |
| `@LogProperty` | Field | Logs when a property is decorated | `@LogProperty message: string` |
| `@LogMethod` | Method | Logs method calls with arguments | `@LogMethod fetchData() {}` |
| `@MeasureTime` | Method | Measures and logs execution time | `@MeasureTime fetchData() {}` |

### Example Usage

```typescript
import { LogClass, LogMethod, LogProperty, MeasureTime } from './decorators';

@LogClass
class ExampleService {
    @LogProperty
    public message: string = "Hello Decorators!";

    @LogMethod
    @MeasureTime
    fetchData(url: string) {
        // Simulate work
        for (let i = 0; i < 1e6; i++) {} 
        return `Fetched from ${url}`;
    }
}

const service = new ExampleService();
service.fetchData("https://api.example.com");
```

**Expected Output:**
```
[LogProperty] Property: message
[LogClass] Decorating: ExampleService
[LogMethod] fetchData called with ["https://api.example.com"]
[MeasureTime] fetchData took 15.234ms
```

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

## ⚙️ Configuration

The project uses a modern TypeScript configuration optimized for decorators:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "experimentalDecorators": true,
    "useDefineForClassFields": true
  }
}
```

## 🎓 Learning Objectives

This project helps you understand:

1. **Modern Decorator API**: TypeScript 5.0+ decorator syntax and patterns
2. **Practical Applications**: Real-world use cases in Angular development
3. **Performance Monitoring**: How to create decorators for measuring execution time
4. **Debugging Tools**: Logging decorators for development and debugging
5. **Best Practices**: Proper decorator implementation and composition

## 🔧 Development

### Running Examples

```bash
# Compile and run the main example
npx tsc && node dist/main.js

# Watch for changes
npx tsc --watch
```

### Adding New Decorators

1. Add your decorator to `decorators.ts`
2. Follow the established patterns and documentation style
3. Add usage examples to `main.ts`
4. Update this README with new decorator information

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
- [Angular Decorators Guide](https://angular.io/guide/styleguide#decorators)
- [ECMAScript Decorators Proposal](https://github.com/tc39/proposal-decorators)

---

**Happy Decorating! 🎨✨** 