function DebounceLegacy(ms: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log("Inside the debounce decorator");
        const original = descriptor.value;
      let timeoutId: number;
      
      descriptor.value = function (...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          original.apply(this, args);
        }, ms);
      };
      
      return descriptor;
    };
  }

  class LegacySearchComponent {
    @DebounceLegacy(300)
    onSearch(query: string) {
      // This will only execute after 300ms of no calls
      console.log('I waited for 300 ms to do nothing.... arghhhh!');
    }
  }

  // Test the debounce functionality
  const legacySearchComponent = new LegacySearchComponent();
  
  console.log('Calling onSearch multiple times quickly...');
  legacySearchComponent.onSearch('test1');
  legacySearchComponent.onSearch('test2');
  legacySearchComponent.onSearch('test3');
  
  // The original method will only execute once after 300ms
  // because the debounce decorator delays execution and cancels previous calls