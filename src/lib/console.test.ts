import { generateTable } from './console';
import { describe, it, expect } from 'bun:test';


// Worst test ever. I'm sorry.
describe('generateTable', () => {
  it('should generate a table with the correct headers and data', () => {
    const data = {
      fruits: ['apple', 'banana', 'orange'],
      vegetables: ['carrot', 'broccoli', 'spinach'],
    };

    const expectedTable = `
FRUITS (3) | VEGETABLES (3)
-----------+---------------
apple      | carrot        
banana     | broccoli      
orange     | spinach       `.slice(1); // Slice to remove the first \n. Otherwise, the layout look weird.

    expect(generateTable(data)).toEqual(expectedTable);
  });

  it('should generate a table with the correct headers and data when options are provided', () => {
    const data = {
      fruits: ['apple', 'banana', 'orange'],
      vegetables: ['carrot', 'broccoli', 'spinach'],
    };
    const options = {
      pourcentage: true,
    };

    const expectedTable = `
FRUITS (3 - 50.00%) | VEGETABLES (3 - 50.00%)
--------------------+------------------------
apple               | carrot                 
banana              | broccoli               
orange              | spinach                `.slice(1); // Slice to remove the first \n. Otherwise, the layout look weird.

    expect(generateTable(data, options)).toEqual(expectedTable);
  });
});
