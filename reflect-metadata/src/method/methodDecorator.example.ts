// function first() {
//   console.log("first(): factory evaluated");
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log("first(): called");
//   };
// }
 
// function second() {
//   console.log("second(): factory evaluated");
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log("second(): called");
//   };
// }
 
// class ExampleClass {
//   @first()
//   @second()
//   method() {}
// }

// const test = new ExampleClass()
// console.log(test)

type MethodDecoratorEvaluator = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
export type MethodDecoratorFactory = (...args: any[])=>  MethodDecoratorEvaluator;


class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
 
  @enumerable(false)
  greet(key1: string) {
    return "Hello, " + this.greeting;
  }
}

const enumerable: MethodDecoratorFactory = (value: boolean) : MethodDecoratorEvaluator => {

  const evaluator: MethodDecoratorEvaluator =  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>{
    const className = target.constructor.name

    descriptor.enumerable = value;
  };
  return evaluator;
}

const test = new Greeter("test")