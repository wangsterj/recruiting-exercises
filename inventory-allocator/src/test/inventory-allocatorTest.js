const expect = require("chai").expect;
const inventoryAllocator= require("../inventory-allocator.js");

describe("Inventory Allocator", () => {
  it("Should return array of warehouses for exact match", () => {
    let testInputOrder = { apple: 5 };
    let testInputWarehouses = [{ name: 'owd', inventory: { apple: 5 } }];
    let actualOutput = inventoryAllocator(testInputOrder, testInputWarehouses);
    let expectedOutput = [{owd: {apple: 5 }}];

    expect(actualOutput).to.eql(expectedOutput);
  })

  it("Should return array of warehouses for multiple items in order for multiple warehouses for exact match", () => {
    let testInputOrder = { apple: 5, banana: 5, orange: 5 };
    let testInputWarehouses = [ { name: 'owd', inventory: { apple: 3 } }, 
                                { name: 'dm', inventory: { banana: 2, orange: 5 } }, 
                                { name: 'md', inventory: { banana: 3, apple: 2 } } ];
    let actualOutput = inventoryAllocator(testInputOrder, testInputWarehouses);
    let expectedOutput = [ { owd: { apple: 3 } },
                          { dm: { banana: 2, orange: 5 } },
                          { md: { apple: 2, banana: 3 } } ];

    expect(actualOutput).to.eql(expectedOutput);
  })

  it("Should return empty array for warehouses with not enough inventory to fulfill order", () => {
    let testInputOrder = { apple: 10};
    let testInputWarehouses = [ { name: 'owd', inventory: { apple: 3 } }, 
                                { name: 'dm', inventory: { banana: 3, apple: 6 } } ];
    let actualOutput = inventoryAllocator(testInputOrder, testInputWarehouses);
    let expectedOutput = [];

    expect(actualOutput).to.eql(expectedOutput);
  })  
  
  it("Should take items from first warehouse (least expensive) before second warehouse", () => {
    let testInputOrder = { apple: 5};
    let testInputWarehouses = [ { name: 'owd', inventory: { apple: 5 } }, 
                                { name: 'dm', inventory: { apple: 10 } } ];
    let actualOutput = inventoryAllocator(testInputOrder, testInputWarehouses);
    let expectedOutput = [ { owd: { apple: 5 } } ];

    expect(actualOutput).to.eql(expectedOutput);
  })

  it("Should split an item across warehouses if that is the only way to completely ship an item", () => {
    let testInputOrder = { apple: 9};
    let testInputWarehouses = [ { name: 'owd', inventory: { apple: 4 } }, 
                                { name: 'dm', inventory: { apple: 3 } },
                                { name: 'md', inventory: { apple: 2 } }  ];
    let actualOutput = inventoryAllocator(testInputOrder, testInputWarehouses);
    let expectedOutput = [ { owd: { apple: 4 } }, { dm: { apple: 3 } }, { md: { apple: 2 } } ];

    expect(actualOutput).to.eql(expectedOutput);
  })

  it("Should work for weird inputs", () => {
    let testInputOrder = { apple: 0, orange: 5 };
    let testInputWarehouses = [{ name: 'owd', inventory: { apple: 5, orange: 5 } }];
    let actualOutput = inventoryAllocator(testInputOrder, testInputWarehouses);
    let expectedOutput = [ { owd: { orange: 5 } } ];

    expect(actualOutput).to.eql(expectedOutput);
  })

  it("Should return empty array for empty order", () => {
    let testInputOrder = {};
    let testInputWarehouses = [{ name: 'owd', inventory: { apple: 5, orange: 5 } }];
    let actualOutput = inventoryAllocator(testInputOrder, testInputWarehouses);
    let expectedOutput = [];

    expect(actualOutput).to.eql(expectedOutput);
  })

  it("Should return empty array for empty warehouse", () => {
    let testInputOrder = { orange: 5 };
    let testInputWarehouses = [{ name: 'owd', inventory: {} }];
    let actualOutput = inventoryAllocator(testInputOrder, testInputWarehouses);
    let expectedOutput = [];

    expect(actualOutput).to.eql(expectedOutput);
  })


})



//expect({a: 1}).to.not.have.property('b');