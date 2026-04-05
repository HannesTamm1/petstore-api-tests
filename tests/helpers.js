function expectPetShape(pet) {
    expect(pet).toHaveProperty('id');
    expect(pet).toHaveProperty('name');
    expect(pet).toHaveProperty('photoUrls');
    expect(Array.isArray(pet.photoUrls)).toBe(true);
}

module.exports = {
    expectPetShape
};