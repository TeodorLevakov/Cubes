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

exports.edit = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId,cubeData, {runValidators: true});

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);

exports.getOne = (id) => Cube.findById(id);

exports.getOneDetails = (id) => Cube.findById(id).populate('accessories');
        //cubes.find(x => x.id === Number(id));


exports.getAll = async (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;
    
    let cubes = await Cube.find({name: {$regex: new RegExp(search, 'i')}})
        .where('difficultyLevel').lte(to).gte(from)
        .lean();
    // let cubes = await Cube.find(
    //     {
    //         name: {$regex: new RegExp(search, 'i')},
    //         difficultyLevel: { $and: [{$gte: from}, {$lte: to}]}
    //     }
    //     ).lean();

    // const result = cubes
    //     .filter(x => x.name.toLowerCase().includes(search?.toLowerCase()))
    //     .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);

    return cubes;
};

exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();
}