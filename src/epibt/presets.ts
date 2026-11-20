import { WAREHOUSE_SCHEMA, type Tile, type WarehouseConfig } from './config';

function floor(width: number, height: number): Tile[][] {
  return Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) =>
    x === 0 || y === 0 || x === width - 1 || y === height - 1 ? '#' : '.'
  ));
}

function block(map: Tile[][], left: number, top: number, right: number, bottom: number): void {
  for (let y = top; y <= bottom; y++) map[y].fill('#', left, right + 1);
}

function warehouse(map: Tile[][], agentCount: number): WarehouseConfig {
  return { schema: WAREHOUSE_SCHEMA, map: map.map(row => row.join('')), agentCount };
}

function rackRows(): WarehouseConfig {
  const map = floor(44, 27);
  // Two blocks of back-to-back racks open onto a cross aisle and the east docks.
  for (const left of [6, 12, 18, 24, 30, 36]) {
    for (const top of [3, 15]) {
      block(map, left, top, left + 1, top + 8);
      for (const y of [top + 1, top + 4, top + 7]) {
        map[y][left - 1] = 'S';
        map[y][left + 2] = 'S';
      }
    }
  }
  for (const y of [3, 6, 9, 12, 15, 18, 21, 24]) map[y][42] = 'D';
  return warehouse(map, 48);
}

function narrowAisles(): WarehouseConfig {
  const map = floor(32, 26);
  // Racks are separated by one-cell aisles, with a wider approach to the docks.
  for (const left of [2, 5, 8, 11, 14, 17, 20, 23, 26]) {
    for (const top of [4, 11, 18]) {
      block(map, left, top, left + 1, top + 4);
      map[top + 1][left - 1] = 'S';
      map[top + 3][left - 1] = 'S';
    }
  }
  for (const x of [4, 8, 12, 16, 20, 24, 28]) map[24][x] = 'D';
  return warehouse(map, 28);
}

function crossDock(): WarehouseConfig {
  const map = floor(36, 22);
  // Staging islands separate lanes between receiving and shipping docks.
  for (const left of [8, 21]) {
    for (const top of [4, 9, 14]) block(map, left, top, left + 6, top + 1);
  }
  for (const y of [3, 6, 9, 12, 15, 18]) map[y][2] = 'S';
  for (const y of [2, 5, 8, 11, 14, 17, 19]) map[y][33] = 'D';
  return warehouse(map, 36);
}

function packingWarehouse(): WarehouseConfig {
  const map = floor(40, 26);
  // Storage racks feed short banks of packing stations on the east side.
  for (const top of [4, 9, 14, 19]) {
    block(map, 3, top, 11, top + 1);
    block(map, 14, top, 22, top + 1);
    for (const x of [4, 8, 15, 19]) map[top + 2][x] = 'S';
  }
  for (const left of [28, 34]) {
    for (const top of [6, 12, 18]) {
      block(map, left, top, left + 1, top + 2);
      map[top][left + 2] = 'D';
      map[top + 2][left + 2] = 'D';
    }
  }
  return warehouse(map, 64);
}

function twoStorageBlocks(): WarehouseConfig {
  const map = floor(46, 28);
  // A central aisle serves two large storage blocks and docks at both ends.
  for (const left of [4, 26]) {
    for (const top of [5, 10, 15, 20]) {
      block(map, left, top, left + 15, top + 1);
      for (const offset of [2, 6, 10, 14]) map[top + 2][left + offset] = 'S';
    }
  }
  for (const x of [5, 9, 13, 17, 28, 32, 36, 40]) {
    map[1][x] = 'D';
    map[26][x] = 'D';
  }
  return warehouse(map, 80);
}

function kivaWarehouse(): WarehouseConfig {
  // GGO warehouse-33-36 geometry, with a one-cell border around the original floor.
  const map = floor(38, 35);
  for (const row of [3, 7, 11, 15, 19, 23, 27, 31]) {
    for (const left of [3, 14, 25]) {
      block(map, left, row, left + 9, row);
      map[row - 1].fill('S', left, left + 10);
      map[row + 1].fill('S', left, left + 10);
    }
  }
  for (const row of [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32]) {
    map[row][1] = 'D';
    map[row][36] = 'D';
  }
  return warehouse(map, 56);
}

export const WAREHOUSE_PRESETS = [
  { id: 'rack-rows', name: 'Rack warehouse', config: rackRows() },
  { id: 'narrow-aisles', name: 'Warehouse with narrow aisles', config: narrowAisles() },
  { id: 'cross-dock', name: 'Receiving and shipping docks', config: crossDock() },
  { id: 'packing-warehouse', name: 'Warehouse with packing stations', config: packingWarehouse() },
  { id: 'two-storage-blocks', name: 'Two storage blocks', config: twoStorageBlocks() },
  { id: 'kiva-warehouse', name: 'Kiva warehouse', config: kivaWarehouse() },
];
