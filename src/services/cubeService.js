const fs = require('fs/promises');

const path = require('path');

const { Cube } = require('../models/Cube');
const { Accessory } = require('../models/Accessory');
//const cubes = require('../db.json');

// exports.save = (cube) => {
    
//     cubes.push({id: cubes[cubes.length-1].id + 1, ...cube});

//     return fs.writeFile(path.resolve('src','db.json'), JSON.stringify(cubes, '', 4), {encoding: 'utf-8'})
        
// }

exports.create = (cube) => Cube.create(cube);

exports.getOne = (id) => Cube.findById(id);
        //cubes.find(x => x.id === Number(id));

exports.getAll = (search = '', fromInput, toInput) => {
    
    return Cube.find().lean();
    // const from = Number(fromInput) || 0;
    // const to = Number(toInput) || 6;

    // const result = cubes
    //     .filter(x => x.name.toLowerCase().includes(search?.toLowerCase()))
    //     .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);
};

exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();
}