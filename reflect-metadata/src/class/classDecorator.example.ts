import { ClassDefinition } from "../type";


type ClassDecoratorEvaluator = <T extends ClassDefinition>(constructor: T) => T | void;
type ClassDecoratorFactory = (...args: [])=>  ClassDecoratorEvaluator;

const ClassFactory: ClassDecoratorFactory = ()=>{
  console.log("ClassMaster(): factory evaluated");

  const evaluator: ClassDecoratorEvaluator = <C extends ClassDefinition> (constructor: C)=>{
    console.log("ClassMaster(): called");

    return class extends constructor {
      newProperty = "new property";
      hello = "override";
    }
  }

  return evaluator
}

@ClassFactory()
class ExampleClass {

  attr1: string

  constructor(attr1: string) {
    this.attr1 = attr1
  }
  
  method() {}
}


const test = new ExampleClass("test")
test.method()
console.log(test)