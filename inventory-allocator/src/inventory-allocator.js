
// Input:
//  1. The first input will be an order: a map of items that are being ordered and how many of them are ordered
//  2. The second input will be a list of object with warehouse name and inventory amounts (inventory distribution) for these items
// Output: the best way an order can be shipped (called shipments) given inventory across a set of warehouses (called inventory distribution)

// Example:
// Input: { apple: 10 }, [{ name: owd, inventory: { apple: 5 } }, { name: dm, inventory: { apple: 5 }}]
// Output: [{ dm: { apple: 5 }}, { owd: { apple: 5 } }]

module.exports = function inventoryAllocator(order, warehouseInventory) {
  // instantiate array to keep track of items shipped from each warehouse
  let shippedWarehouses = [];

  // iterate through each warehouse
  for (let i = 0; i < warehouseInventory.length; i++) {
    let currWarehouse = warehouseInventory[i];
    let inventory = currWarehouse.inventory;

    // create object to keep track of how many items we remove from current warehouse to ship
    let itemsRemoved = {};

    // iterate through each item in the order
    for (item in order) {
      // check if item in order has alreay been fulfilled or if warehouse stocks item
      if (order[item] !== 0 && inventory[item] !== undefined && inventory[item] !== 0) {
        // if warehouse stocks enough items for order, remove items from inventory and order
        if (inventory[item] >= order[item]) {
          itemsRemoved[item] = order[item];
          order[item] -= order[item];
        } 
        // if warehouse doesn't have enough items, remove as many items as possible from inventory and order
        else {
          itemsRemoved[item] = inventory[item];
          order[item] -= inventory[item];
        }
      }
    }

    // push items removed for each warehouse into shipped array
    let itemsRemovedFromWarehouse = {};
    itemsRemovedFromWarehouse[currWarehouse.name] = itemsRemoved;
    
    // add to shipped array if any items were removed from warehouse
    if (Object.keys(itemsRemoved).length !== 0)
      shippedWarehouses.push(itemsRemovedFromWarehouse);
  }

  // check if order is completely fulfilled -> return [] if not fulfilled
  for (item in order) {
    if (order[item] !== 0) {
      return [];
    }
  }

  return shippedWarehouses;
}