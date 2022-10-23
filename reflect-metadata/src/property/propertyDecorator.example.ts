type PropertyDecoratorEvaluator = (target: any, propertyKey: string) => void
export type PropertyDecoratorFactory = (...args: any[])=>  PropertyDecoratorEvaluator;


import "reflect-metadata";
// this Symbol is an unique key that won't conflict with anything others
const formatMetadataKey = Symbol("format");

const format: PropertyDecoratorFactory = (formatString: string) => {
  // return Reflect.metadata(formatMetadataKey, formatString);
  console.log("format invoked")

  const evaluator: PropertyDecoratorEvaluator = function (target: any, propertyName: string) {
    console.log("format executed")
    console.log(target, propertyName)

    // save metadata info into the Reflect API
    const reflectFunc = Reflect.metadata(formatMetadataKey, formatString)
    return reflectFunc(target, propertyName)
  }

  return evaluator
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}



class Greeter {
  // set metadata from the Reflect API
  @format("Hello, %s")
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    // get metadata from the Reflect API
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}


