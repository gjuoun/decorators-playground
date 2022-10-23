import "reflect-metadata"


const requiredMetadataKey = Symbol("required");
type AnyFunction = (...args: any[]) => any;

class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
 
  @validate
  print(@required verbose: boolean) {
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
     return this.title; 
    }
  }
}



function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
 
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<AnyFunction>) {
  let method = descriptor.value!;
 
  descriptor.value = function (...args) {
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        // arguments is coming from the function that is being decorated
        if (parameterIndex >= args.length || args[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    return method.apply(this, args);
  };
}


const report = new BugReport("Error in console when clicking Add");
console.log(report.print(true));