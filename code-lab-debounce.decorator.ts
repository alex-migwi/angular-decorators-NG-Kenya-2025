function Debounce(ms: number) {
  return function (target: any, context: any): any {
    console.log("Inside the debounce decorator");
    let timeoutId: number;
    
    return function (this:any,...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('[LogMethod]', context.name, 'called with', args);
        return context.value.call(this, ...args);}, ms);
    };
  };
}

class ModernSearchComponent {
  @Debounce(300)
  onSearch(query: string) {
    // This will only execute after 300ms of no calls
    console.log('I waited for 300 ms to do nothing.... arghhhh!');
  }
}

// Test the debounce functionality
const modernSearchComponent = new ModernSearchComponent();

console.log('Calling onSearch multiple times quickly...');
modernSearchComponent.onSearch('test1');
modernSearchComponent.onSearch('test2');
modernSearchComponent.onSearch('test3');

// The original method will only execute once after 300ms
// because the debounce decorator delays execution and cancels previous calls 