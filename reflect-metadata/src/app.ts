import { ClassDefinition } from "./type";

function first() {
  console.log("first(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): called");
  };
}
 
function second() {
  console.log("second(): factory evaluated");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called");
  };
}





@ClassMaster()
class ExampleClass {

  attr1: string

  constructor(attr1: string) {
    this.attr1 = attr1
  }
  
  
  @first()
  @second()
  method() {}
}

const test = new ExampleClass("test")

test.method()

console.log(test)