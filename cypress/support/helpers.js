const { faker } = require('@faker-js/faker');

export function createRandomUser() {
  return {
    
    first_name: faker.internet.username(),
    last_name: faker.internet.email(),
    
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});